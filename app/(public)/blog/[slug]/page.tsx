import { getPostBySlug } from '@/actions/blog-actions';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-8 max-w-4xl">
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
