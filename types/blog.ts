import { z } from 'zod';

export type BlogStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  status: BlogStatus;
  published_at: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export const blogPostFormSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  content: z.string().min(1, 'İçerik zorunludur'),
  excerpt: z.string().min(1, 'Özet zorunludur').max(300, 'Özet en fazla 300 karakter olabilir'),
  cover_image: z.string().optional(),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional()
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;
