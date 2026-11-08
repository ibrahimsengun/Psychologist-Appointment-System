import { createBlogPost } from '@/actions/blog-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { BlogPostForm } from '@/components/forms/blog-post-form';

export default function NewBlogPostPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <AdminPageHeader title="Yeni Blog Yazısı" />
      <BlogPostForm onSubmit={createBlogPost} />
    </div>
  );
}

