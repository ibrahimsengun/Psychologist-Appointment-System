import { getBlogPostById, updateBlogPost } from '@/actions/blog-actions';
import { BlogPostForm } from '@/components/forms/blog-post-form';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const blogPost = await getBlogPostById(params.id);
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Yeni Blog Yazısı</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <BlogPostForm onSubmit={updateBlogPost} initialData={blogPost} />
        </div>
      </div>
    </div>
  );
}
