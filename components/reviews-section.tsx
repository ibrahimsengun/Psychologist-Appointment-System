import { Review } from '@/types/review';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface ReviewsSectionProps {
    reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-zinc-600'}`}
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

function GoogleIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    );
}

function ProfileAvatar({ name, photoUrl }: { name: string; photoUrl?: string | null }) {
    const colors = [
        'bg-blue-500',
        'bg-emerald-500',
        'bg-purple-500',
        'bg-orange-500',
        'bg-pink-500',
        'bg-cyan-500',
        'bg-amber-500',
        'bg-rose-500',
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative">
            {photoUrl ? (
                <img
                    src={photoUrl}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div
                    className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-sm`}
                >
                    {initials}
                </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <GoogleIcon />
            </div>
        </div>
    );
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
    if (reviews.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-zinc-900 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-100 mb-4">
                        Danışan Yorumları
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Danışanlarımızın danışmanlık sürecindeki olumlu dönüşleri, bize en
                        büyük motivasyonu sağlıyor. Her yorum, güvene dayalı ilişkimizin
                        bir yansımasıdır.
                    </p>
                </div>

                {/* Reviews Carousel */}
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full max-w-6xl mx-auto overflow-hidden"
                >
                    <CarouselContent>
                        {reviews.map((review) => (
                            <CarouselItem
                                key={review.id}
                                className="basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                                <div className="h-full rounded-2xl bg-zinc-800/80 border border-zinc-700/50 p-5 flex flex-col hover:border-zinc-600/70 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
                                    {/* Author Info */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <ProfileAvatar
                                            name={review.author_name}
                                            photoUrl={review.profile_photo_url}
                                        />
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-white text-sm truncate">
                                                {review.author_name}
                                            </h3>
                                            {review.relative_time && (
                                                <p className="text-zinc-500 text-xs">
                                                    {review.relative_time}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="mb-3">
                                        <StarRating rating={review.rating} />
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-zinc-300 text-sm leading-relaxed flex-1 line-clamp-5">
                                        {review.text}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white" />
                    <CarouselNext className="hidden md:flex -right-12 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white" />
                </Carousel>
            </div>
        </section>
    );
}
