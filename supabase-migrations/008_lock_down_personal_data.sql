-- ÖNEMLİ: 007'yi kullanan kod canlıya alındıktan SONRA uygulanmalı.
-- Eski kod ziyaretçi randevularını doğrudan tablolara yazar ve bu migration onu durdurur.

-- Randevular: sadece giriş yapmış admin
alter table public.appointments enable row level security;
revoke all on public.appointments from anon;
create policy "Admin manages appointments"
  on public.appointments for all to authenticated
  using (true) with check (true);

-- Eski slot tablosu: kişisel veri yok, herkes okur, sadece admin yazar
alter table public.available_time_slots enable row level security;
create policy "Everyone reads time slots"
  on public.available_time_slots for select to anon, authenticated
  using (true);
create policy "Admin manages time slots"
  on public.available_time_slots for all to authenticated
  using (true) with check (true);

-- İletişim mesajları: mevcut okuma/ekleme kuralları RLS ile devreye girer
alter table public.contact_messages enable row level security;
create policy "Admin deletes messages"
  on public.contact_messages for delete to authenticated
  using (true);

-- Sorular: ziyaretçi sadece yayınlanmış soruları, kişisel olmayan kolonlarla görür
drop policy "anon users read all questions" on public.questions;
create policy "Admin reads questions"
  on public.questions for select to authenticated
  using (true);
create policy "Public reads published questions"
  on public.questions for select to anon
  using (is_public = true and status = 'answered');
revoke select on public.questions from anon;
grant select (id, question_text, answer_text, name, is_public, status, answered_at, created_at)
  on public.questions to anon;

-- Test istatistikleri görünümü RLS'yi atlamasın
alter view public.test_statistics set (security_invoker = true);
revoke all on public.test_statistics from anon;
