-- Blog yazılarına yazıya özel sık sorulan sorular (en fazla 3).
-- Eklemeli migration: yeni kod yayına girmeden ÖNCE uygulanmalı; yeni kod kayıt sırasında bu kolona yazar.
-- Biçim: [{"question": "...", "answer": "..."}]

alter table public.blog_posts
  add column if not exists faqs jsonb not null default '[]'::jsonb;

alter table public.blog_posts
  add constraint blog_posts_faqs_is_array
  check (jsonb_typeof(faqs) = 'array' and jsonb_array_length(faqs) <= 3);
