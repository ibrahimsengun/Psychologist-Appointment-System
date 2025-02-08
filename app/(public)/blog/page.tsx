import { getPublishedPosts } from '@/actions/blog';
import { BlogCard } from '@/components/blog/blog-card';

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Yazıları</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 