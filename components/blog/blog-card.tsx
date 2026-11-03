import { BlogPostListItem } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPostListItem;
}

export function BlogCard({ post }: BlogCardProps) {
  const category = post.categories?.[0];

  return (
    <Link href={`/blog/${post.slug}`} title={post.title} className="group block">
      <article>
        {/* Görsel */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
          {post.cover_image && (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
        </div>

        {/* İçerik */}
        <p className="eyebrow mt-5">
          {category && <span className="text-clay">{category.name}</span>}
          {category && <span className="mx-2">·</span>}
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
        </p>

        <h3 className="mt-3 text-2xl leading-snug line-clamp-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {post.excerpt && <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>}

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
          Devamını oku
          <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </article>
    </Link>
  );
}
