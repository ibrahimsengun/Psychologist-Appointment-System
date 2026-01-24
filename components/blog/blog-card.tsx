import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostCategories } from '@/actions/category-actions';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: BlogPost;
  categories?: { id: string; name: string; slug: string }[];
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="relative bg-background rounded-2xl border border-border/50 overflow-hidden 
                         transition-all duration-500 ease-out
                         hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-2">
        {/* Görsel */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.cover_image && (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* İçerik */}
        <div className="p-6">
          {/* Tarih */}
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time className="text-sm text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>

          {/* Başlık */}
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Kategoriler */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 3).map((category: any) => (
                <Badge key={category.id} variant="secondary" className="text-xs">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Özet */}
          <p className="text-muted-foreground line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          {/* Devamını Oku */}
          <div className="flex items-center gap-2 text-primary font-medium">
            <span className="text-sm">Devamını Oku</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Dekoratif Köşe */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg
                      group-hover:border-primary/50 group-hover:w-12 group-hover:h-12 transition-all duration-500"></div>
      </article>
    </Link>
  );
}