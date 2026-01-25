import { getPublishedPosts } from '@/actions/blog-actions';
import { getBlogPostCategories } from '@/actions/category-actions';
import { BlogCard } from '@/components/blog/blog-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Psikoloji Yazıları - Uzman Psk. Lokman Yılmaz',
  description:
    'Psikoloji, aile danışmanlığı ve ruh sağlığı hakkında faydalı blog yazıları. Samsun psikolog Lokman Yılmaz tarafından hazırlanan içerikler.',
  keywords:
    'psikoloji blog, ruh sağlığı, aile danışmanlığı, samsun psikolog blog, psikolojik destek',
  alternates: {
    canonical: 'https://lokmanyilmaz.com.tr/blog'
  },
  openGraph: {
    title: 'Blog | Psikoloji Yazıları - Uzman Psk. Lokman Yılmaz',
    description:
      'Psikoloji ve ruh sağlığı hakkında faydalı blog yazıları.',
    url: 'https://lokmanyilmaz.com.tr/blog',
    siteName: 'Uzman Psk. Lokman Yılmaz',
    locale: 'tr_TR',
    type: 'website'
  }
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  // Load categories for all posts
  const postsWithCategories = await Promise.all(
    posts.map(async (post) => {
      const categories = await getBlogPostCategories(post.id);
      return { ...post, categories };
    })
  );

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: 'Blog' }]} />
      <h1 className="text-4xl font-bold mb-8">Blog Yazıları</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsWithCategories.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Henüz blog yazısı bulunmuyor
          </div>
        )}
        {postsWithCategories.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
