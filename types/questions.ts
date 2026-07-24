import { z } from 'zod';

export const questionSchema = z.object({
  name: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .optional()
    .or(z.literal('')),
  question_text: z
    .string()
    .min(20, 'Soru en az 20 karakter olmalıdır')
    .max(1000, 'Soru en fazla 1000 karakter olabilir'),
  honeypot: z
    .string()
    .max(0, 'Bot algılandı')
    .optional(),
  allow_publish: z.boolean().default(false)
});

export type QuestionFormData = z.infer<typeof questionSchema>;

export interface Question {
  id: string;
  tracking_code: string;
  name: string | null;
  email: string | null;
  question_text: string;
  answer_text: string | null;
  status: 'pending' | 'answered' | 'rejected';
  is_public: boolean;
  allow_publish: boolean;
  answered_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublicQuestion {
  id: string;
  question_text: string;
  answer_text: string | null;
  name: string | null;
  is_public: boolean;
  answered_at: string | null;
  created_at: string;
}
