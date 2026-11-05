import { Review } from '@/types/review';

export interface ReviewSummary {
  average: number;
  count: number;
  /** 5'ten 1'e her yıldız için yorum sayısı */
  distribution: { stars: number; count: number }[];
}

export function summarizeReviews(reviews: Pick<Review, 'rating'>[]): ReviewSummary | undefined {
  if (reviews.length === 0) return undefined;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.round(r.rating) === stars).length
  }));

  return { average, count: reviews.length, distribution };
}

/** 4.98 -> "5,0" */
export function formatRating(average: number) {
  return average.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
