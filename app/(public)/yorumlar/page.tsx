import { getReviews } from '@/actions/review-actions';
import { StarRating } from '@/components/star-rating';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { formatRating, summarizeReviews } from '@/lib/reviews';
import { SITE_URL } from '@/lib/schema';
import { Review } from '@/types/review';
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Danışan Yorumları | Samsun Atakum Psikolog Lokman Yılmaz',
  description: 'Psikolog Lokman Yılmaz ile çalışan danışanların Google yorumları ve genel değerlendirme puanı.',
  alternates: {
    canonical: `${SITE_URL}/yorumlar`
  }
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="break-inside-avoid mb-6 rounded-sm border bg-card p-6">
      <StarRating rating={review.rating} />
      <blockquote className="mt-4 leading-relaxed text-foreground/85 whitespace-pre-line">{review.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {review.profile_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.profile_photo_url}
            alt={review.author_name}
            className="w-9 h-9 rounded-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-heading">
            {review.author_name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{review.author_name}</p>
          <p className="text-xs text-muted-foreground">
            Google yorumu{review.relative_time ? ` · ${review.relative_time}` : ''}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default async function ReviewsPage() {
  const reviews = (await getReviews()) as Review[];
  const summary = summarizeReviews(reviews);

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: 'Danışan Yorumları' }]} />
      <h1 className="text-4xl md:text-5xl font-bold mb-10">Danışan Yorumları</h1>

      {summary ? (
        <>
          {/* Genel puan özeti */}
          <section
            aria-label="Genel değerlendirme"
            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-foreground/15 pt-8 mb-12"
          >
            <div className="md:col-span-4 flex items-center gap-5">
              <p className="font-heading text-7xl leading-none">{formatRating(summary.average)}</p>
              <div>
                <StarRating rating={summary.average} className="w-5 h-5" />
                <p className="mt-2 text-sm text-muted-foreground">{summary.count} Google yorumu</p>
              </div>
            </div>
            <ul className="md:col-span-6 md:col-start-6 space-y-2">
              {summary.distribution.map(({ stars, count }) => (
                <li key={stars} className="flex items-center gap-3 text-sm">
                  <span className="w-12 shrink-0 text-muted-foreground">{stars} yıldız</span>
                  <span className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <span
                      className="block h-full rounded-full bg-amber-400"
                      style={{ width: `${(count / summary.count) * 100}%` }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right tabular-nums">{count}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-muted-foreground">Henüz yorum bulunmuyor.</p>
      )}

      <div className="mt-12 border-t border-foreground/15 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-lg">Siz de görüşmeye başlamak ister misiniz?</p>
        <Link href="/appointment" className="link-underline">
          Randevu al <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
