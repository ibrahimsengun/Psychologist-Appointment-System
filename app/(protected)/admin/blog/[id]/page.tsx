import { getBlogPostById, updateBlogPost } from '@/actions/blog-actions';
import { BlogPostForm } from '@/components/forms/blog-post-form';
import { Button } from '@/components/ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const blogPost = await getBlogPostById(params.id);
  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-8">{blogPost.title}</h1>
          <Button size="icon" variant="outline">
            <Link href={`/blog/${blogPost.slug}`}>
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <BlogPostForm onSubmit={updateBlogPost} initialData={blogPost} />
        </div>
      </div>
    </div>
  );
}
