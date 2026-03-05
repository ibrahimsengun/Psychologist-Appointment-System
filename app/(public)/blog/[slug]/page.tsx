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
import { buildBlogPostSchema, JsonLd, SITE_URL, PERSON_NAME } from '@/lib/schema';
import { CallToAction } from '@/components/call-to-action';

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
    title: `${post.title} | Samsun Psikolog ${PERSON_NAME}`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [PERSON_NAME],
      images: post.cover_image ? [{ url: post.cover_image }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.cover_image ? [post.cover_image] : undefined
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
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

  const jsonLd = buildBlogPostSchema({
    title: post.title,
    description: description,
    slug: slug,
    coverImage: post.cover_image,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    wordCount: wordCount,
    keywords: categories.map(cat => cat.name).join(', '),
    section: categories.length > 0 ? categories[0].name : 'Genel',
  });

  return (
    <article className="container py-8 max-w-6xl">
      <Breadcrumb
        items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {post.status !== 'published' && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border-2 border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/30 px-5 py-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-bold">!</span>
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Bu yazı henüz <strong>taslak</strong> aşamasındadır ve ziyaretçiler tarafından görüntülenemez.
          </p>
        </div>
      )}

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

      {/* CTA Banner Section (Before Related Posts) */}
      <div className="mt-12 mb-16">
        <CallToAction
          title="Profesyonel Psikolojik Destek Alın"
          description="Okuduğunuz konu hakkında kendinizde veya sevdiklerinizde benzer durumlar gözlemliyorsanız, uzman desteği için bizimle iletişime geçebilirsiniz."
        />
      </div>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
