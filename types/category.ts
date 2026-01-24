import { z } from 'zod';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface BlogPostCategory {
    blog_post_id: string;
    category_id: string;
    created_at: string;
}

export const categoryFormSchema = z.object({
    name: z.string().min(1, 'Kategori adı zorunludur').max(100, 'Kategori adı en fazla 100 karakter olabilir'),
    slug: z.string().min(1, 'Slug zorunludur').max(100, 'Slug en fazla 100 karakter olabilir')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
    description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').optional()
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
