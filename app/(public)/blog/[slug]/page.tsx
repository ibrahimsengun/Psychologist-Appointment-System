import { getPostBySlug } from '@/actions/blog-actions';
import { getBlogPostCategories } from '@/actions/category-actions';
import { getRelatedPosts } from '@/actions/related-posts-actions';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { RelatedPosts } from '@/components/blog/related-posts';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 3600;

// Okuma süresi hesaplama fonksiyonu
function calculateReadingTime(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText.split(/\s+/).length;
  const wordsPerMinute = 200; // Ortalama okuma hızı
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Kelime sayısı hesaplama
function getWordCount(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plainText.split(/\s+/).length;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const post = await getPostBySlug(slug);

  // Meta description: öncelikle meta_description, yoksa excerpt kullan
  const description = post.meta_description || post.excerpt;

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ['Lokman Yılmaz'],
      images: post.cover_image ? [{ url: post.cover_image }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.cover_image ? [post.cover_image] : undefined
    },
    alternates: {
      canonical: `https://lokmanyilmaz.com.tr/blog/${slug}`,
      languages: {
        'tr-TR': `/tr-TR/blog/${slug}`
      }
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const wordCount = getWordCount(post.content);
  const description = post.meta_description || post.excerpt;

  // Load categories
  const categories = await getBlogPostCategories(post.id);

  // Load related posts
  const relatedPosts = await getRelatedPosts(post.id, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: description,
    image: post.cover_image ? [post.cover_image] : [],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    wordCount: wordCount,
    author: {
      '@type': 'Person',
      name: 'Lokman Yılmaz',
      url: 'https://lokmanyilmaz.com.tr'
    },
    publisher: {
      '@type': 'Person',
      name: 'Lokman Yılmaz',
      url: 'https://lokmanyilmaz.com.tr'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lokmanyilmaz.com.tr/blog/${slug}`
    },
    keywords: categories.map(cat => cat.name).join(', '),
    articleSection: categories.length > 0 ? categories[0].name : 'Genel'
  };

  return (
    <article className="container py-8 max-w-6xl">
      <Breadcrumb
        items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 text-muted-foreground mb-8">
        <span>
          {new Date(post.created_at).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </span>
        <span>•</span>
        <span>{readingTime} dk okuma</span>
      </div>

      {/* Kategoriler */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/blog/kategori/${category.slug}`}>
              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {post.cover_image && (
        <div className="relative aspect-video mb-8">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
