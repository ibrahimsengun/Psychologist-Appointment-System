import { z } from "zod";

export type ServiceStatus = 'draft' | 'published';

export const serviceFormSchema = z.object({
  name: z.string().min(1, "Hizmet adı zorunludur"),
  content: z.string().min(1, "İçerik zorunludur"),
  cover_image: z.string().optional(),
  meta_description: z.string().max(160, "Meta açıklama en fazla 160 karakter olmalıdır").optional(),
  status: z.enum(['draft', 'published']),
  description: z.string().optional()
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export interface Service {
  id: string;
  name: string;
  slug: string;
  content: string;
  excerpt: string;
  description: string | null;
  cover_image: string | null;
  meta_description: string | null;
  status: ServiceStatus;
  created_at: string;
  updated_at: string;
}