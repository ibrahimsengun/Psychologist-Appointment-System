import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { BlogCard } from './blog/blog-card';

export default function Blog({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <section id="blog" className="relative py-16 md:py-24 overflow-hidden">
      {/* Arka Plan */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Başlık */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            Makaleler & Yazılar
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Psikoloji, terapi ve kişisel gelişim üzerine güncel yazılar
          </p>
        </div>

        {/* Blog Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Tümünü Gör Butonu */}
        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold
                     hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            <span>Tüm Yazıları Gör</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
