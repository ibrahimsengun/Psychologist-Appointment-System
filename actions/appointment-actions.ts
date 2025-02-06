'use server';

import {
  Appointment,
  AppointmentFormValues,
  AppointmentStatus,
  AvailableTimeSlot,
  AvailableTimeSlotFormValues
} from '@/types/appointments';
import { createClient } from '@/utils/supabase/server';

// Randevu oluşturma
export async function createAppointment(formData: AppointmentFormValues): Promise<Appointment> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      date: formData.date,
      time: formData.time,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      birth_date: formData.birthDate,
      note: formData.note,
      status: 'pending' as AppointmentStatus,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // İlgili zaman aralığını dolu olarak işaretle
  const { error: updateError } = await supabase
    .from('available_time_slots')
    .update({ is_booked: true })
    .eq('date', formData.date)
    .eq('start_time', formData.time);

  if (updateError) {
    throw new Error(updateError.message);
  }

  // Veritabanından gelen snake_case formatındaki verileri camelCase'e çeviriyoruz
  return {
    id: data.id,
    date: data.date,
    time: data.time,
    name: data.name,
    email: data.email,
    phone: data.phone,
    birthDate: data.birth_date,
    note: data.note,
    status: data.status,
    createdAt: data.created_at
  };
}

// Randevu durumunu güncelleme
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  const supabase = await createClient();

  // Önce randevuyu bul
  const { data: appointment } = await supabase
    .from('appointments')
    .select('*')
    .eq('id', id)
    .single();

  // Durumu güncelle
  const { error } = await supabase.from('appointments').update({ status }).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  // Eğer randevu iptal edildiyse, ilgili zaman aralığını tekrar müsait yap
  if (status === 'canceled' && appointment) {
    const { error: updateError } = await supabase
      .from('available_time_slots')
      .update({ is_booked: false })
      .eq('date', appointment.date)
      .eq('start_time', appointment.time);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }
}

// Randevuları listeleme
export async function getAppointments(): Promise<Appointment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  // Veritabanından gelen snake_case formatındaki verileri camelCase'e çeviriyoruz
  return (data || []).map((appointment) => ({
    id: appointment.id,
    date: appointment.date,
    time: appointment.time,
    name: appointment.name,
    email: appointment.email,
    phone: appointment.phone,
    birthDate: appointment.birth_date,
    note: appointment.note,
    status: appointment.status,
    createdAt: appointment.created_at
  }));
}

// Müsait zaman aralığı oluşturma
export async function createAvailableTimeSlot(
  formData: AvailableTimeSlotFormValues
): Promise<void> {
  const supabase = await createClient();

  // Başlangıç ve bitiş saatlerini parse et
  const startHour = parseInt(formData.startTime.split(':')[0]);
  const endHour = parseInt(formData.endTime.split(':')[0]);

  // Her saat için bir kayıt oluştur
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      date: formData.date,
      start_time: `${hour.toString().padStart(2, '0')}:00`,
      end_time: `${(hour + 1).toString().padStart(2, '0')}:00`,
      is_booked: false,
      created_at: new Date().toISOString()
    });
  }

  const { error } = await supabase.from('available_time_slots').insert(slots);

  if (error) {
    console.log({ error });
    throw new Error(error.message);
  }
}

// Müsait zaman aralıklarını listeleme
export async function getAvailableTimeSlots(): Promise<AvailableTimeSlot[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('available_time_slots')
    .select('*')
    .eq('is_booked', false)
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .order('start_time', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  // Veritabanından gelen snake_case formatındaki verileri camelCase'e çeviriyoruz
  return (data || []).map((slot) => ({
    id: slot.id,
    date: slot.date,
    startTime: slot.start_time,
    endTime: slot.end_time,
    isBooked: slot.is_booked,
    createdAt: slot.created_at
  }));
}

// Müsait zaman aralığını silme
export async function deleteAvailableTimeSlot(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from('available_time_slots').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}

// Belirli bir tarihe ait müsait saatleri listeleme
export async function getAvailableTimesForDate(date: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('available_time_slots')
    .select('start_time')
    .eq('date', date)
    .eq('is_booked', false)
    .order('start_time', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((slot) => slot.start_time) || [];
}
