import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z
    .string()
    .min(14, 'Geçerli bir telefon numarası giriniz')
    .max(14, 'Geçerli bir telefon numarası giriniz'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır')
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}