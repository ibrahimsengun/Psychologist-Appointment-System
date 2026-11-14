import { z } from 'zod';

export type BlogStatus = 'draft' | 'published';

export interface BlogFaq {
  question: string;
  answer: string;
}

// Yazı başına en fazla bu kadar sık sorulan soru girilir
export const BLOG_FAQ_COUNT = 3;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  meta_description?: string;
  faqs?: BlogFaq[];
  status: BlogStatus;
  published_at: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
  categories?: { id: string; name: string; slug: string; description?: string }[];
}

// Listelerde kullanılan hafif yazı tipi (içerik alanı olmadan)
export type BlogPostListItem = Omit<BlogPost, 'content'>;

export const blogPostFormSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  content: z.string().min(1, 'İçerik zorunludur'),
  cover_image: z.string().optional(),
  meta_description: z.string().max(160, 'Meta açıklama en fazla 160 karakter olmalıdır').optional(),
  faqs: z
    .array(
      z
        .object({
          question: z.string().max(200, 'Soru en fazla 200 karakter olmalıdır'),
          answer: z.string().max(1000, 'Cevap en fazla 1000 karakter olmalıdır')
        })
        .refine((faq) => Boolean(faq.question.trim()) === Boolean(faq.answer.trim()), {
          message: 'Soru ve cevabın ikisi de doldurulmalı veya ikisi de boş kalmalı',
          path: ['answer']
        })
    )
    .max(BLOG_FAQ_COUNT)
    .optional(),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional(),
  category_ids: z.array(z.string()).optional()
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

// SSS listesini temizler: boş satırları atar, boşlukları kırpar, en fazla 3 soru bırakır
export function normalizeBlogFaqs(faqs: unknown): BlogFaq[] {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .map((faq) => ({
      question: String(faq?.question ?? '').trim(),
      answer: String(faq?.answer ?? '').trim()
    }))
    .filter((faq) => faq.question && faq.answer)
    .slice(0, BLOG_FAQ_COUNT);
}
