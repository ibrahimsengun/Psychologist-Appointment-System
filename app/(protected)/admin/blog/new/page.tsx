import { createBlogPost } from '@/actions/blog-actions';
import { BlogPostForm } from '@/components/forms/blog-post-form';

export default function NewBlogPostPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Yeni Blog Yazısı</h1>
      <BlogPostForm onSubmit={createBlogPost} />
    </div>
  );
}

