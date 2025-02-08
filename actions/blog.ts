import { createClient } from '@/utils/supabase/server';
import { BlogPost } from '@/types/blog';

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