'use server';

import {
  Appointment,
  AppointmentFormValues,
  AppointmentStatus,
  AvailableTimeSlot,
  AvailableTimeSlotFormValues
} from '@/types/appointments';
import { sendAppointmentConfirmationEmail } from '@/utils/email';
import { createClient } from '@/utils/supabase/server';
import { generateToken } from '@/utils/token';

// Randevu oluşturma
export async function createAppointment(formData: AppointmentFormValues): Promise<Appointment> {
  const supabase = await createClient();

  try {
    // İptal token ve kodu oluştur
    const cancelToken = generateToken();
    const cancelCode = Math.random().toString().slice(2, 8); // 6 haneli kod

    // Önce zaman aralığının müsait olup olmadığını kontrol et
    const { data: timeSlot, error: timeSlotError } = await supabase
      .from('available_time_slots')
      .select('*')
      .eq('date', formData.date)
      .eq('start_time', formData.time)
      .eq('is_booked', false)
      .single();

    if (timeSlotError || !timeSlot) {
      throw new Error('Seçilen randevu saati artık müsait değil');
    }

    // Aynı tarih ve saatte aktif (iptal edilmemiş) randevu var mı kontrol et
    const { data: existingAppointment, error: existingError } = await supabase
      .from('appointments')
      .select('*')
      .eq('date', formData.date)
      .eq('time', formData.time)
      .neq('status', 'canceled')
      .single();

    if (existingAppointment) {
      throw new Error('Seçilen randevu saati dolu');
    }

    // Randevuyu oluştur
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        date: formData.date,
        time: formData.time,
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\s/g, ''), // Boşlukları kaldır
        birth_date: formData.birthDate,
        note: formData.note,
        status: 'pending' as AppointmentStatus,
        cancel_token: cancelToken,
        cancel_code: cancelCode,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Randevu oluşturma hatası:', error);
      throw new Error('Randevu kaydı oluşturulamadı');
    }

    // Zaman aralığını dolu olarak işaretle
    const { error: updateError } = await supabase
      .from('available_time_slots')
      .update({ is_booked: true })
      .eq('id', timeSlot.id);

    if (updateError) {
      console.error('Zaman aralığı güncelleme hatası:', updateError);
      // Randevuyu geri al
      await supabase.from('appointments').delete().eq('id', data.id);
      throw new Error('Randevu kaydedildi ancak zaman aralığı güncellenemedi');
    }

    // Onay e-postası gönder
    try {
      const emailResult = await sendAppointmentConfirmationEmail({
        to: formData.email,
        name: formData.name,
        date: formData.date,
        time: formData.time,
        cancelToken,
        cancelCode
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

// Token ile randevu iptal etme
export async function cancelAppointmentByToken(token: string): Promise<void> {
  const supabase = await createClient();

  // Önce randevuyu bul
  const { data: appointment, error: findError } = await supabase
    .from('appointments')
    .select('*')
    .eq('cancel_token', token)
    .single();

  if (findError || !appointment) {
    throw new Error("Geçersiz iptal token'ı veya randevu bulunamadı");
  }

  if (appointment.status === 'canceled') {
    throw new Error('Bu randevu zaten iptal edilmiş');
  }

  // Randevuyu iptal et
  const { error: updateError } = await supabase
    .from('appointments')
    .update({ status: 'canceled' })
    .eq('id', appointment.id);

  if (updateError) {
    throw new Error('Randevu iptal edilirken bir hata oluştu');
  }

  // Zaman aralığını tekrar müsait yap
  const { error: timeSlotError } = await supabase
    .from('available_time_slots')
    .update({ is_booked: false })
    .eq('date', appointment.date)
    .eq('start_time', appointment.time);

  if (timeSlotError) {
    console.error('Zaman aralığı güncellenirken hata:', timeSlotError);
  }
}

// Kod ve telefon numarası ile randevu iptal etme
export async function cancelAppointmentByCode(phone: string, cancelCode: string): Promise<void> {
  const supabase = await createClient();

  // Randevuyu bul
  const { data: appointment, error: findError } = await supabase
    .from('appointments')
    .select('*')
    .eq('phone', phone)
    .eq('cancel_code', cancelCode)
    .single();

  if (findError || !appointment) {
    throw new Error('Geçersiz telefon numarası veya iptal kodu');
  }

  if (appointment.status === 'canceled') {
    throw new Error('Bu randevu zaten iptal edilmiş');
  }

  // Randevuyu iptal et
  const { error: updateError } = await supabase
    .from('appointments')
    .update({ status: 'canceled' })
    .eq('id', appointment.id);

  if (updateError) {
    throw new Error('Randevu iptal edilirken bir hata oluştu');
  }

  // Zaman aralığını tekrar müsait yap
  const { error: timeSlotError } = await supabase
    .from('available_time_slots')
    .update({ is_booked: false })
    .eq('date', appointment.date)
    .eq('start_time', appointment.time);

  if (timeSlotError) {
    console.error('Zaman aralığı güncellenirken hata:', timeSlotError);
  }
}
