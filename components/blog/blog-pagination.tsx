import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const POSTS_PER_PAGE = 12;

// 1. sayfa /blog, diğerleri /blog/sayfa/N
export function blogPageHref(page: number) {
  return page <= 1 ? '/blog' : `/blog/sayfa/${page}`;
}

// Gösterilecek sayfa numaraları: ilk, son, mevcut sayfanın komşuları; aralar "…"
function getPageItems(current: number, total: number): (number | 'ellipsis')[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const items: (number | 'ellipsis')[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) items.push('ellipsis');
    items.push(page);
  });
  return items;
}

export function BlogPagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Blog sayfaları" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Button asChild variant="outline" size="sm">
          <Link href={blogPageHref(currentPage - 1)} rel="prev">
            <ChevronLeft />
            Önceki
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft />
          Önceki
        </Button>
      )}

      {getPageItems(currentPage, totalPages).map((item, i) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={item}
            asChild
            variant={item === currentPage ? 'default' : 'outline'}
            size="sm"
            className="min-w-9"
          >
            <Link href={blogPageHref(item)} aria-current={item === currentPage ? 'page' : undefined}>
              {item}
            </Link>
          </Button>
        )
      )}

      {currentPage < totalPages ? (
        <Button asChild variant="outline" size="sm">
          <Link href={blogPageHref(currentPage + 1)} rel="next">
            Sonraki
            <ChevronRight />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Sonraki
          <ChevronRight />
        </Button>
      )}
    </nav>
  );
}
