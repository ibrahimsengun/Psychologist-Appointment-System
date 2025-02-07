import { z } from 'zod';

export type BlogStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  status: BlogStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export const blogPostFormSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  content: z.string().min(1, 'İçerik zorunludur'),
  excerpt: z.string().min(1, 'Özet zorunludur').max(300, 'Özet en fazla 300 karakter olabilir'),
  coverImage: z.string().optional(),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional()
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;
