import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="rounded-lg border bg-card overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-video">
          {post.cover_image && (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(post.created_at).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long', 
              year: 'numeric'
            })}
          </p>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
            {post.title}


          </h2>
          <p className="text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
} 