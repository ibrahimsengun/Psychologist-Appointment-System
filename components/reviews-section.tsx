import { Review } from '@/types/review';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { SectionHeading } from '@/components/section-heading';
import { StarRating as BaseStarRating } from '@/components/star-rating';
import { formatRating, summarizeReviews } from '@/lib/reviews';
import Link from 'next/link';

function StarRating({ rating }: { rating: number }) {
    return <BaseStarRating rating={rating} emptyClassName="text-primary-foreground/25" />;
}

interface ReviewsSectionProps {
    reviews: Review[];
}

function Author({ review }: { review: Review }) {
    return (
        <div className="flex items-center gap-3">
            {review.profile_photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div className="w-9 h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center font-heading">
                    {review.author_name.charAt(0).toUpperCase()}
                </div>
            )}
            <div>
                <p className="text-sm font-medium">{review.author_name}</p>
                <p className="text-xs text-primary-foreground/60">
                    Google yorumu{review.relative_time ? ` · ${review.relative_time}` : ''}
                </p>
            </div>
        </div>
    );
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
    if (reviews.length === 0) return null;

    const [featured, ...others] = reviews;
    // Anasayfada birkaç yorum yeterli; tamamı /yorumlar sayfasında
    const rest = others.slice(0, 8);
    const summary = summarizeReviews(reviews)!;

    return (
        <section id="yorumlar" className="bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden scroll-mt-20">
            <div className="container">
                <SectionHeading
                    invert
                    index="03"
                    label="Danışan Yorumları"
                    title="Danışanlarımız ne diyor?"
                    action={
                        <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-center gap-3">
                                <span className="font-heading text-4xl leading-none">{formatRating(summary.average)}</span>
                                <div>
                                    <StarRating rating={summary.average} />
                                    <p className="mt-1 text-xs text-primary-foreground/70">{summary.count} Google yorumu</p>
                                </div>
                            </div>
                            <Link href="/yorumlar" className="link-underline">
                                Tüm yorumları oku <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    }
                />

                {/* Öne çıkan yorum */}
                <figure className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 md:mb-20">
                    <div className="lg:col-start-4 lg:col-span-9">
                        <span className="font-heading text-7xl leading-none text-clay block -mb-4" aria-hidden="true">
                            &ldquo;
                        </span>
                        <blockquote className="font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug line-clamp-[7] md:line-clamp-none">
                            {featured.text}
                        </blockquote>
                        <figcaption className="mt-8 flex items-center gap-6">
                            <Author review={featured} />
                            <StarRating rating={featured.rating} />
                        </figcaption>
                    </div>
                </figure>

                {rest.length > 0 && (
                    <Carousel opts={{ align: 'start', loop: true }} className="w-full">
                        <CarouselContent className="-ml-8">
                            {rest.map((review) => (
                                <CarouselItem key={review.id} className="pl-8 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                                    <div className="h-full border-t border-primary-foreground/25 pt-6 flex flex-col">
                                        <StarRating rating={review.rating} />
                                        <p className="mt-4 text-primary-foreground/85 leading-relaxed flex-1 line-clamp-6">
                                            {review.text}
                                        </p>
                                        <div className="mt-6">
                                            <Author review={review} />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:flex justify-end gap-2 mt-10">
                            <CarouselPrevious className="static translate-y-0 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary" />
                            <CarouselNext className="static translate-y-0 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary" />
                        </div>
                    </Carousel>
                )}
            </div>
        </section>
    );
}
