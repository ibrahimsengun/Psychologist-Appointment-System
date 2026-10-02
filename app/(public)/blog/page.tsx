import { getPublishedPosts } from '@/actions/blog-actions';
import { BlogList } from '@/components/blog/blog-list';
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
  // Yazılar kategorileriyle birlikte tek sorguda (önbellekli) gelir
  const posts = await getPublishedPosts();
  return <BlogList posts={posts} page={1} />;
}
