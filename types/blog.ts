import { z } from 'zod';

export type BlogStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  meta_description?: string;
  status: BlogStatus;
  published_at: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
  categories?: { id: string; name: string; slug: string; description?: string }[];
}

export const blogPostFormSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  content: z.string().min(1, 'İçerik zorunludur'),
  cover_image: z.string().optional(),
  meta_description: z.string().max(160, 'Meta açıklama en fazla 160 karakter olmalıdır').optional(),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional(),
  category_ids: z.array(z.string()).optional()
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;
