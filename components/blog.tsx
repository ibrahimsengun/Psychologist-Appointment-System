import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { BlogCard } from './blog/blog-card';

export default function Blog({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <section id="blog" className="py-6 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/blog" className="text-blue-500 hover:text-blue-600">
            Tümünü Gör
          </Link>
        </div>
      </div>
    </section>
  );
}
