import { getPublishedPosts } from '@/actions/blog-actions';
import { BlogList, getBlogTotalPages } from '@/components/blog/blog-list';
import { blogPageHref } from '@/components/blog/blog-pagination';
import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ page: string }>;
};

export const revalidate = 3600;

// 2. sayfadan itibaren tüm sayfalar build sırasında hazırlanır; yeni sayfalar ilk ziyarette önbelleğe alınır
export async function generateStaticParams() {
  const totalPages = getBlogTotalPages((await getPublishedPosts()).length);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
}

function parsePage(value: string) {
  return /^\d+$/.test(value) ? Number(value) : NaN;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  const url = `https://lokmanyilmaz.com.tr${blogPageHref(page)}`;

  return {
    title: `Blog - Sayfa ${page} | Psikoloji Yazıları - Uzman Psk. Lokman Yılmaz`,
    description: `Psikoloji, aile danışmanlığı ve ruh sağlığı hakkında blog yazıları - sayfa ${page}. Samsun psikolog Lokman Yılmaz tarafından hazırlanan içerikler.`,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `Blog - Sayfa ${page} | Uzman Psk. Lokman Yılmaz`,
      url,
      siteName: 'Uzman Psk. Lokman Yılmaz',
      locale: 'tr_TR',
      type: 'website'
    }
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const page = parsePage((await params).page);

  if (!Number.isInteger(page)) {
    notFound();
  }

  // /blog/sayfa/1 → /blog (aynı içeriğin iki adreste olmaması için)
  if (page === 1) {
    permanentRedirect(blogPageHref(1));
  }

  const posts = await getPublishedPosts();
  return <BlogList posts={posts} page={page} />;
}
