import { Video, extractYouTubeId } from '@/types/video';
import Link from 'next/link';
import { LiteYouTube } from '@/components/lite-youtube';
import { SectionHeading } from '@/components/section-heading';

interface VideoSectionProps {
    videos: Video[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
    const playable = videos
        .map((video) => ({ video, videoId: extractYouTubeId(video.youtube_url) }))
        .filter((item): item is { video: Video; videoId: string } => !!item.videoId);

    if (playable.length === 0) return null;

    return (
        <section className="container py-16 md:py-24">
            <SectionHeading
                index="06"
                label="Videolar"
                title="Kısa psikoloji videoları"
                action={
                    <Link href="/videolar" className="link-underline">
                        Tüm videolar <span aria-hidden="true">→</span>
                    </Link>
                }
            />

            {/* Mobilde yatay kaydırma, masaüstünde 3 sütun */}
            <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 pb-2">
                {playable.map(({ video, videoId }) => (
                    <figure key={video.id} className="snap-start shrink-0 w-[70%] sm:w-[45%] lg:w-auto">
                        <div className="relative w-full aspect-[9/16] overflow-hidden rounded-sm bg-muted">
                            <LiteYouTube videoId={videoId} title={video.title} />
                        </div>
                        <figcaption className="mt-4 font-heading text-xl leading-snug line-clamp-2">{video.title}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
