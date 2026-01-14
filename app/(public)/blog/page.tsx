import { getPublishedPosts } from '@/actions/blog-actions';
import { BlogCard } from '@/components/blog/blog-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: 'Blog' }]} />
      <h1 className="text-4xl font-bold mb-8">Blog Yazıları</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Henüz blog yazısı bulunmuyor
          </div>
        )}
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
