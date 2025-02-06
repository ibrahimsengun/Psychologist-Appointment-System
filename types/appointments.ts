import { z } from 'zod';

export type AppointmentStatus = 'pending' | 'confirmed' | 'canceled';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  note?: string;
  status: AppointmentStatus;
  createdAt: string;
}

// Admin tarafında kullanılacak müsait zaman aralığı tipi
export interface AvailableTimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
}

// Form validasyon şeması
export const appointmentFormSchema = z.object({
  date: z.string().min(1, 'Lütfen bir tarih seçin'),
  time: z.string().min(1, 'Lütfen bir saat seçin'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z
    .string()
    .regex(
      /^0[5][0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/,
      'Telefon numarası 05XX XXX XX XX formatında olmalıdır'
    )
    .transform((val) => val.replace(/\s/g, '')),
  birthDate: z.string().min(1, 'Lütfen doğum tarihinizi seçin'),
  note: z.string().optional()
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

// Admin tarafında kullanılacak müsait zaman ekleme formu şeması
export const availableTimeSlotFormSchema = z.object({
  date: z.string().min(1, 'Lütfen bir tarih seçin'),
  startTime: z.string().min(1, 'Lütfen başlangıç saati seçin'),
  endTime: z.string().min(1, 'Lütfen bitiş saati seçin')
});

export type AvailableTimeSlotFormValues = z.infer<typeof availableTimeSlotFormSchema>;

// Randevu iptal formu şeması
export const appointmentCancelFormSchema = z.object({
  phone: z
    .string()
    .regex(
      /^0[5][0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/,
      'Telefon numarası 05XX XXX XX XX formatında olmalıdır'
    )
    .transform((val) => val.replace(/\s/g, '')),
  cancelCode: z
    .string()
    .length(6, 'İptal kodu 6 haneli olmalıdır')
    .regex(/^[0-9]+$/, 'İptal kodu sadece rakamlardan oluşmalıdır')
});

export type AppointmentCancelFormValues = z.infer<typeof appointmentCancelFormSchema>;
