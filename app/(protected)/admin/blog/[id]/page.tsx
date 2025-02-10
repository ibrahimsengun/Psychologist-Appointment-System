import { getBlogPostById, updateBlogPost } from '@/actions/blog-actions';
import { DeleteBlogPost } from '@/components/blog/delete-blog-post';
import { BlogPostForm } from '@/components/forms/blog-post-form';
import { Button } from '@/components/ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const blogPost = await getBlogPostById(params.id);

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{blogPost.title}</h1>
            <Button size="icon" variant="outline" asChild>
              <Link href={`/blog/${blogPost.slug}`} target="_blank">
                <SquareArrowOutUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <DeleteBlogPost id={blogPost.id} />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <BlogPostForm onSubmit={updateBlogPost} initialData={blogPost} />
        </div>
      </div>
    </div>
  );
}
