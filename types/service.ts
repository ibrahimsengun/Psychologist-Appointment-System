import { z } from "zod";

export const serviceFormSchema = z.object({
  name: z.string().min(1, "Hizmet adı zorunludur"),
  description: z.string().optional()
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export interface Service {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
} 