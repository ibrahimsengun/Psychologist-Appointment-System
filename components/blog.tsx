import { BlogPostListItem } from '@/types/blog';
import Link from 'next/link';
import { BlogCard } from './blog/blog-card';
import { SectionHeading } from '@/components/section-heading';

export default function Blog({ blogPosts }: { blogPosts: BlogPostListItem[] }) {
  return (
    <section id="blog" className="container py-16 md:py-24 scroll-mt-20">
      <SectionHeading
        index="05"
        label="Yazılar"
        title="Blogdan son yazılar"
        action={
          <Link href="/blog" title="Tüm Psikoloji Blog Yazılarını Gör" className="link-underline">
            Tüm yazılar <span aria-hidden="true">→</span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
