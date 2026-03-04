import { z } from 'zod';

export const reviewFormSchema = z.object({
    author_name: z.string().min(1, 'Yazar adı zorunludur'),
    rating: z.coerce.number().min(1, 'Puan en az 1 olmalı').max(5, 'Puan en fazla 5 olmalı'),
    text: z.string().min(1, 'Yorum metni zorunludur'),
    relative_time: z.string().optional(),
    profile_photo_url: z.string().optional(),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export interface Review {
    id: string;
    author_name: string;
    rating: number;
    text: string;
    relative_time: string | null;
    profile_photo_url: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}
