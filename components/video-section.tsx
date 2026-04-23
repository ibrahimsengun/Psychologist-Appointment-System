import { Video, extractYouTubeId } from '@/types/video';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

interface VideoSectionProps {
    videos: Video[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
    if (videos.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Videolar
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Psikoloji ve kişisel gelişim hakkında bilgilendirici videolar
                    </p>
                </div>

                {/* Video Carousel */}
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {videos.map((video) => {
                            const videoId = extractYouTubeId(video.youtube_url);
                            if (!videoId) return null;

                            return (
                                <CarouselItem
                                    key={video.id}
                                    className="basis-[55%] sm:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                                        <div className="relative w-full aspect-[9/16] overflow-hidden">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                loading="lazy"
                                                className="absolute inset-0 w-full h-full"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                                {video.title}
                                            </h3>
                                        </div>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12" />
                    <CarouselNext className="hidden md:flex -right-12" />
                </Carousel>

                {/* Tüm Videoları Gör Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/videolar"
                        className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-base font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                    >
                        Tüm Videoları Gör
                        <svg
                            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
