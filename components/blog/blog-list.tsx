import { BlogCard } from '@/components/blog/blog-card';
import { BlogPagination, POSTS_PER_PAGE, blogPageHref } from '@/components/blog/blog-pagination';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { BlogPostListItem } from '@/types/blog';
import { notFound } from 'next/navigation';

export function getBlogTotalPages(postCount: number) {
  return Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE));
}

// /blog ve /blog/sayfa/[page] tarafından ortak kullanılan liste
export function BlogList({ posts, page }: { posts: BlogPostListItem[]; page: number }) {
  const totalPages = getBlogTotalPages(posts.length);

  if (page < 1 || page > totalPages) {
    notFound();
  }

  const pagePosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="container py-8">
      <Breadcrumb
        items={
          page === 1
            ? [{ label: 'Blog' }]
            : [{ label: 'Blog', href: blogPageHref(1) }, { label: `Sayfa ${page}` }]
        }
      />
      <h1 className="text-4xl font-bold mb-8">
        Blog Yazıları
        {page > 1 && <span className="text-muted-foreground font-normal text-2xl"> — Sayfa {page}</span>}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagePosts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Henüz blog yazısı bulunmuyor
          </div>
        )}
        {pagePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <BlogPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
