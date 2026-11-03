import { Review } from '@/types/review';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { SectionHeading } from '@/components/section-heading';

interface ReviewsSectionProps {
    reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5" aria-label={`5 üzerinden ${rating} puan`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-300' : 'text-primary-foreground/25'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
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

    const [featured, ...rest] = reviews;

    return (
        <section id="yorumlar" className="bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden scroll-mt-20">
            <div className="container">
                <SectionHeading invert index="03" label="Danışan Yorumları" title="Danışanlarımız ne diyor?" />

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
