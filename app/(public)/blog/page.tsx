import { getPublishedPosts } from '@/actions/blog-actions';
import { BlogList } from '@/components/blog/blog-list';
import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog | Psikoloji Yazıları - Uzman Psk. Lokman Yılmaz',
  description:
    'Psikoloji, aile danışmanlığı ve ruh sağlığı hakkında faydalı blog yazıları. Samsun psikolog Lokman Yılmaz tarafından hazırlanan içerikler.',
  keywords:
    'psikoloji blog, ruh sağlığı, aile danışmanlığı, samsun psikolog blog, psikolojik destek',
  alternates: {
    canonical: 'https://www.lokmanyilmaz.com.tr/blog'
  },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Blog | Psikoloji Yazıları - Uzman Psk. Lokman Yılmaz',
    description:
      'Psikoloji ve ruh sağlığı hakkında faydalı blog yazıları.',
    url: 'https://www.lokmanyilmaz.com.tr/blog',
    siteName: 'Uzman Psk. Lokman Yılmaz',
    locale: 'tr_TR',
    type: 'website'
  }
};

export const revalidate = 86400;

export default async function BlogPage() {
  // Yazılar kategorileriyle birlikte tek sorguda (önbellekli) gelir
  const posts = await getPublishedPosts();
  return <BlogList posts={posts} page={1} />;
}
