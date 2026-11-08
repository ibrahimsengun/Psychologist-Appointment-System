'use server';

import {
  Appointment,
  AppointmentFormValues,
  AppointmentStatus,
  AvailableTimeSlot,
  AvailableTimeSlotFormValues,
  TimeBlock,
  TimeBlockFormValues,
  WeeklyScheduleDay
} from '@/types/appointments';
import { revalidatePath } from 'next/cache';
import {
  sendAppointmentConfirmedEmail,
  sendAppointmentRejectedEmail,
  sendAppointmentRequestEmail
} from '@/utils/email';
import { randomInt } from 'crypto';
import { requireAdmin } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import { generateToken } from '@/utils/token';

// Randevu oluşturma
export async function createAppointment(formData: AppointmentFormValues): Promise<Appointment> {
  const supabase = await createClient();

  try {
    // İptal token ve kodu oluştur
    const cancelToken = generateToken();
    const cancelCode = randomInt(0, 1_000_000).toString().padStart(6, '0');
    const phone = formData.phone.replace(/\s/g, ''); // Boşlukları kaldır

    // Müsaitlik kontrolü ve kayıt veritabanında tek işlemde yapılır
    const { data: appointmentId, error } = await supabase.rpc('book_appointment', {
      p_date: formData.date,
      p_time: formData.time,
      p_name: formData.name,
      p_email: formData.email,
      p_phone: phone,
      p_birth_date: formData.birthDate,
      p_note: formData.note ?? null,
      p_cancel_token: cancelToken,
      p_cancel_code: cancelCode
    });

    if (error) {
      console.error('Randevu oluşturma hatası:', error);
      if (error.message === 'slot_unavailable') {
        throw new Error('Seçilen randevu saati artık müsait değil');
      }
      if (error.message === 'invalid_input') {
        throw new Error('Randevu bilgileri geçersiz');
      }
      throw new Error('Randevu kaydı oluşturulamadı');
    }

    // Onay e-postası gönder
    try {
      const emailResult = await sendAppointmentRequestEmail({
        to: formData.email,
        name: formData.name,
        date: formData.date,
        time: formData.time,
        cancelToken
      });

      if (!emailResult.success) {
        console.error('E-posta gönderimi başarısız:', emailResult.error);
      } else {
        console.log('E-posta başarıyla gönderildi:', emailResult.data);
      }
    } catch (emailError) {
      console.error('E-posta gönderme hatası:', emailError);
    }

    return {
      id: appointmentId,
      date: formData.date,
      time: formData.time,
      name: formData.name,
      email: formData.email,
      phone,
      birthDate: formData.birthDate,
      note: formData.note,
      status: 'pending' as AppointmentStatus,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Genel hata:', error);
    throw error instanceof Error ? error : new Error('Beklenmeyen bir hata oluştu');
  }
}

// Randevu durumunu güncelleme
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  const supabase = await requireAdmin();

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

    const { error: blockError } = await supabase
      .from('time_blocks')
      .delete()
      .eq('appointment_id', id);

    if (blockError) {
      throw new Error(blockError.message);
    }

    await sendAppointmentRejectedEmail({
      to: appointment.email,
      name: appointment.name,
      date: appointment.date,
      time: appointment.time
    });
  }
  if (status === 'confirmed' && appointment) {
    await sendAppointmentConfirmedEmail({
      to: appointment.email,
      name: appointment.name,
      date: appointment.date,
      time: appointment.time
    });
  }

  revalidatePath('/admin', 'layout');
}


// Randevuları listeleme
export async function getAppointments(): Promise<Appointment[]> {
  const supabase = await requireAdmin();

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
  const supabase = await requireAdmin();

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
  const supabase = await requireAdmin();

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

// Token ile randevu iptal etme
export async function cancelAppointmentByToken(token: string): Promise<void> {
  const supabase = await createClient();

  const { data: result, error } = await supabase.rpc('cancel_appointment_public', {
    p_token: token
  });

  if (error) {
    throw new Error('Randevu iptal edilirken bir hata oluştu');
  }

  if (result === 'not_found') {
    throw new Error("Geçersiz iptal token'ı veya randevu bulunamadı");
  }

  if (result === 'already_canceled') {
    throw new Error('Bu randevu zaten iptal edilmiş');
  }
}

// Kod ve telefon numarası ile randevu iptal etme
export async function cancelAppointmentByCode(phone: string, cancelCode: string): Promise<void> {
  const supabase = await createClient();

  const { data: result, error } = await supabase.rpc('cancel_appointment_public', {
    p_phone: phone.replace(/\s/g, ''),
    p_code: cancelCode
  });

  if (error) {
    throw new Error('Randevu iptal edilirken bir hata oluştu');
  }

  if (result === 'not_found') {
    throw new Error('Geçersiz telefon numarası veya iptal kodu');
  }

  if (result === 'already_canceled') {
    throw new Error('Bu randevu zaten iptal edilmiş');
  }
}

// ============================================
// YENİ SİSTEM: Haftalık Şablon + Zaman Blokları
// ============================================

// Haftalık şablonu getir
export async function getWeeklySchedule(): Promise<WeeklyScheduleDay[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('weekly_schedule')
    .select('*')
    .order('day_of_week', { ascending: true });

  if (error) {
    console.error('Haftalık şablon getirme hatası:', error);
    throw new Error(error.message);
  }

  return (data || []).map((day) => ({
    id: day.id,
    dayOfWeek: day.day_of_week,
    isEnabled: day.is_enabled,
    // Supabase TIME returns "HH:MM:SS", we need "HH:MM"
    startTime: day.start_time?.substring(0, 5) || '09:00',
    endTime: day.end_time?.substring(0, 5) || '18:00'
  }));
}

// Haftalık şablonu güncelle
export async function updateWeeklySchedule(
  schedule: Omit<WeeklyScheduleDay, 'id'>[]
): Promise<void> {
  const supabase = await requireAdmin();

  // Her gün için güncelleme yap
  for (const day of schedule) {
    const { error } = await supabase
      .from('weekly_schedule')
      .update({
        is_enabled: day.isEnabled,
        start_time: day.startTime,
        end_time: day.endTime,
        updated_at: new Date().toISOString()
      })
      .eq('day_of_week', day.dayOfWeek);

    if (error) {
      console.error(`Gün ${day.dayOfWeek} güncellenirken hata:`, error);
      throw new Error(error.message);
    }
  }
}

// Zaman bloklarını getir
export async function getTimeBlocks(): Promise<TimeBlock[]> {
  const supabase = await requireAdmin();

  const { data, error } = await supabase
    .from('time_blocks')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Zaman blokları getirme hatası:', error);
    throw new Error(error.message);
  }

  return (data || []).map((block) => ({
    id: block.id,
    date: block.date,
    startTime: block.start_time,
    endTime: block.end_time,
    reason: block.reason,
    blockType: block.block_type,
    appointmentId: block.appointment_id,
    createdAt: block.created_at
  }));
}

// Yeni zaman bloğu oluştur
export async function createTimeBlock(formData: TimeBlockFormValues): Promise<void> {
  const supabase = await requireAdmin();

  const { error } = await supabase.from('time_blocks').insert({
    date: formData.date,
    start_time: formData.isFullDay ? null : formData.startTime,
    end_time: formData.isFullDay ? null : formData.endTime,
    reason: formData.reason || null,
    block_type: 'manual',
    created_at: new Date().toISOString()
  });

  if (error) {
    console.error('Zaman bloğu oluşturma hatası:', error);
    throw new Error(error.message);
  }
}

// Zaman bloğu sil
export async function deleteTimeBlock(id: string): Promise<void> {
  const supabase = await requireAdmin();

  const { error } = await supabase.from('time_blocks').delete().eq('id', id);

  if (error) {
    console.error('Zaman bloğu silme hatası:', error);
    throw new Error(error.message);
  }
}

// Yeni sistemle müsait zamanları hesapla
export async function getAvailableTimeSlotsNew(): Promise<AvailableTimeSlot[]> {
  const supabase = await createClient();

  // 1. Haftalık şablonu al
  const { data: weeklySchedule, error: scheduleError } = await supabase
    .from('weekly_schedule')
    .select('*');

  if (scheduleError) {
    console.error('Haftalık şablon hatası:', scheduleError);
    throw new Error(scheduleError.message);
  }

  // 2. Zaman bloklarını al (gelecek 60 gün için)
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 60);

  const { data: timeBlocks, error: blocksError } = await supabase
    .from('time_blocks')
    .select('*')
    .gte('date', today.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0]);

  if (blocksError) {
    console.error('Zaman blokları hatası:', blocksError);
    throw new Error(blocksError.message);
  }

  // 3. Gelecek 60 gün için müsait slotları hesapla
  const availableSlots: AvailableTimeSlot[] = [];

  for (let i = 0; i < 60; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay(); // 0: Pazar, 6: Cumartesi

    // Bu gün için şablonu bul
    const daySchedule = weeklySchedule?.find((s) => s.day_of_week === dayOfWeek);
    if (!daySchedule || !daySchedule.is_enabled) continue;

    // Başlangıç ve bitiş saatlerini parse et
    const startHour = parseInt(daySchedule.start_time.split(':')[0]);
    const endHour = parseInt(daySchedule.end_time.split(':')[0]);

    // Her saat için kontrol et
    for (let hour = startHour; hour < endHour; hour++) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      const endTimeStr = `${(hour + 1).toString().padStart(2, '0')}:00`;

      // Bu saat bloklu mu kontrol et
      const isBlocked = timeBlocks?.some((block) => {
        if (block.date !== dateStr) return false;

        // Tüm gün bloklu
        if (!block.start_time || !block.end_time) return true;

        // Saat aralığı kontrolü
        const blockStart = parseInt(block.start_time.split(':')[0]);
        const blockEnd = parseInt(block.end_time.split(':')[0]);
        return hour >= blockStart && hour < blockEnd;
      });

      if (!isBlocked) {
        availableSlots.push({
          id: `${dateStr}-${timeStr}`, // Geçici ID
          date: dateStr,
          startTime: timeStr,
          endTime: endTimeStr,
          isBooked: false,
          createdAt: new Date().toISOString()
        });
      }
    }
  }

  return availableSlots;
}

