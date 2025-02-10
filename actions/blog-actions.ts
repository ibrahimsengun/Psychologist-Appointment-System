'use server';

import { BlogPost, BlogPostFormValues } from '@/types/blog';
import { createClient } from '@/utils/supabase/server';
import slugify from 'slugify';

export async function getPublishedPosts() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as BlogPost[];
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();


  if (error) {
    throw new Error(error.message);
  }


  return data as BlogPost;
}


export async function getBlogPostById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return null;
  }

  return data;
} 

function generateExcerpt(content: string, maxLength: number = 300): string {
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plainText.length <= maxLength) return plainText;
  
  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.slice(0, lastSpace) + '...';
}

// Blog yazısı oluşturma
export async function createBlogPost(formData: BlogPostFormValues): Promise<BlogPost> {
  const supabase = await createClient();

  const slug = slugify(formData.title, {
    lower: true,
    strict: true,
    locale: 'tr'
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Yetkilendirme hatası');
  }

  const now = new Date().toISOString();
  const excerpt = generateExcerpt(formData.content);

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: formData.title,
      slug,
      content: formData.content,
      excerpt,
      cover_image: formData.cover_image,
      status: formData.status,
      published_at: formData.status === 'published' ? now : null,
      author_id: user.id,
      created_at: now,
      updated_at: now
    })
    .select()
    .single();

  if (error) {
    console.error('Blog yazısı oluşturma hatası:', error);
    throw new Error('Blog yazısı oluşturulamadı');
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt,
    cover_image: data.cover_image,
    status: data.status,
    published_at: data.published_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    author_id: data.author_id
  };
}

export async function updateBlogPost(id: string, formData: BlogPostFormValues): Promise<BlogPost> {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Yetkilendirme hatası');
  }

  const now = new Date().toISOString();
  const excerpt = generateExcerpt(formData.content);

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      title: formData.title,
      content: formData.content,
      excerpt,
      cover_image: formData.cover_image,
      status: formData.status,
      published_at: formData.status === 'published' ? now : null,
      updated_at: now
    })
    .eq('id', id)
    .eq('author_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Blog yazısı güncelleme hatası:', error);
    throw new Error('Blog yazısı güncellenemedi');
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt,
    cover_image: data.cover_image,
    status: data.status,
    published_at: data.published_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    author_id: data.author_id
  };
}

// Blog yazısını silme
export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = await createClient();

  // Kullanıcı bilgilerini al
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Yetkilendirme hatası');
  }

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
    .eq('author_id', user.id);

  if (error) {
    console.error('Blog yazısı silme hatası:', error);
    throw new Error('Blog yazısı silinemedi');
  }
}

// Blog yazılarını listeleme
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Blog yazıları listeleme hatası:', error);
    throw new Error('Blog yazıları listelenemedi');
  }

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    cover_image: post.cover_image,
    status: post.status,
    published_at: post.published_at,
    created_at: post.created_at,
    updated_at: post.updated_at,
    author_id: post.author_id,

  }));
}


// Blog yazısı detayını getirme
export async function getBlogPost(slug: string): Promise<BlogPost> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();

  if (error) {
    console.error('Blog yazısı getirme hatası:', error);
    throw new Error('Blog yazısı bulunamadı');
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt,
    cover_image: data.cover_image,
    status: data.status,
    published_at: data.published_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    author_id: data.author_id
  };
}
