import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Adınız en az 2 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır.')
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
