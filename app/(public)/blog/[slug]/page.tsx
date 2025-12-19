import { getPostBySlug } from '@/actions/blog-actions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 3600;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      authors: ['Lokman Yılmaz'],
      images: post.cover_image ? [{ url: post.cover_image }] : undefined
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.cover_image ? [post.cover_image] : [],
    datePublished: post.created_at,
    author: {
      '@type': 'Person',
      name: 'Lokman Yılmaz'
    },
    description: post.excerpt
  };

  return (
    <article className="container py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="text-muted-foreground mb-8">
        Yayınlanma Tarihi:{' '}
        {new Date(post.created_at).toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </div>

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
    </article>
  );
}
