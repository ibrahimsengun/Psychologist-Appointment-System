-- Ziyaretçi akışları (randevu alma, iptal, soru takibi) tablolara doğrudan
-- erişmek yerine bu fonksiyonları kullanır. Böylece 008 ile tablolar kapatılabilir.

create or replace function public.book_appointment(
  p_date date,
  p_time time,
  p_name text,
  p_email text,
  p_phone text,
  p_birth_date date,
  p_note text,
  p_cancel_token text,
  p_cancel_code text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_today date := (now() at time zone 'Europe/Istanbul')::date;
  v_now time := (now() at time zone 'Europe/Istanbul')::time;
  v_schedule public.weekly_schedule%rowtype;
  v_id uuid;
begin
  if length(trim(coalesce(p_name, ''))) not between 2 and 200
    or length(coalesce(p_email, '')) > 254
    or length(coalesce(p_note, '')) > 5000
    or p_birth_date is null
    or p_birth_date > v_today
    or p_birth_date < date '1900-01-01'
    or length(coalesce(p_cancel_token, '')) < 32
    or coalesce(p_cancel_code, '') !~ '^[0-9]{6}$'
  then
    raise exception 'invalid_input';
  end if;

  if p_date is null
    or p_time is null
    or p_date < v_today
    or p_date > v_today + 61
    or (p_date = v_today and p_time <= v_now)
    or date_trunc('hour', p_time::interval) <> p_time::interval
  then
    raise exception 'slot_unavailable';
  end if;

  select * into v_schedule
  from public.weekly_schedule
  where day_of_week = extract(dow from p_date)::int
    and is_enabled;

  if not found or p_time < v_schedule.start_time or p_time >= v_schedule.end_time then
    raise exception 'slot_unavailable';
  end if;

  if exists (
    select 1
    from public.time_blocks b
    where b.date = p_date
      and (
        b.start_time is null
        or b.end_time is null
        or (p_time >= b.start_time and p_time < b.end_time)
      )
  ) then
    raise exception 'slot_unavailable';
  end if;

  begin
    insert into public.appointments (
      date, time, name, email, phone, birth_date, note, status, cancel_token, cancel_code
    )
    values (
      p_date, p_time, trim(p_name), p_email, p_phone, p_birth_date, p_note, 'pending',
      p_cancel_token, p_cancel_code
    )
    returning id into v_id;
  exception
    when unique_violation then
      raise exception 'slot_unavailable';
    when check_violation then
      raise exception 'invalid_input';
  end;

  insert into public.time_blocks (date, start_time, end_time, reason, block_type, appointment_id)
  values (p_date, p_time, p_time + interval '1 hour', 'Site üzerinden randevu', 'booked', v_id);

  return v_id;
end;
$$;

-- Token ya da telefon + kod ile iptal. Dönen değer: canceled | already_canceled | not_found
create or replace function public.cancel_appointment_public(
  p_token text default null,
  p_phone text default null,
  p_code text default null
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_appointment public.appointments%rowtype;
begin
  select a.* into v_appointment
  from public.appointments a
  where (p_token is not null and a.cancel_token = p_token)
     or (p_token is null and p_phone is not null and p_code is not null
         and a.phone = p_phone and a.cancel_code = p_code)
  order by a.created_at desc
  limit 1;

  if not found then
    return 'not_found';
  end if;

  if v_appointment.status = 'canceled' then
    return 'already_canceled';
  end if;

  update public.appointments set status = 'canceled' where id = v_appointment.id;

  update public.available_time_slots
  set is_booked = false
  where date = v_appointment.date and start_time = v_appointment.time;

  delete from public.time_blocks where appointment_id = v_appointment.id;

  return 'canceled';
end;
$$;

-- Takip kodu ile soru durumu; e-posta ve isim dönmez.
create or replace function public.get_question_by_tracking_code(p_code text)
returns table (
  question_text text,
  answer_text text,
  status text,
  created_at timestamptz,
  answered_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select q.question_text, q.answer_text, q.status, q.created_at, q.answered_at
  from public.questions q
  where q.tracking_code = upper(trim(p_code))
  limit 1;
$$;

revoke execute on function public.book_appointment(date, time, text, text, text, date, text, text, text) from public;
revoke execute on function public.cancel_appointment_public(text, text, text) from public;
revoke execute on function public.get_question_by_tracking_code(text) from public;

grant execute on function public.book_appointment(date, time, text, text, text, date, text, text, text) to anon, authenticated;
grant execute on function public.cancel_appointment_public(text, text, text) to anon, authenticated;
grant execute on function public.get_question_by_tracking_code(text) to anon, authenticated;
