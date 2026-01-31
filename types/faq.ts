import { z } from 'zod';

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    display_order: number;
    is_active: boolean;
    show_on_homepage: boolean;
    created_at: string;
    updated_at: string;
}

export const faqFormSchema = z.object({
    question: z.string().min(1, 'Soru zorunludur'),
    answer: z.string().min(1, 'Cevap zorunludur'),
    display_order: z.number().int().min(0, 'Sıra 0 veya üzeri olmalıdır').default(0),
    is_active: z.boolean().default(true),
    show_on_homepage: z.boolean().default(false)
});

export type FAQFormValues = z.infer<typeof faqFormSchema>;
