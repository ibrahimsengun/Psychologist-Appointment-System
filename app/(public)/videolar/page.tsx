import { getVideos } from '@/actions/video-actions';
import { extractYouTubeId } from '@/types/video';
import { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Videolar | Lokman Yılmaz',
    description: 'Psikoloji ve kişisel gelişim hakkında bilgilendirici videolarımızı izleyin.',
    alternates: {
        canonical: `${SITE_URL}/videolar`
    }
};

export default async function VideosPage() {
    const videos = await getVideos();

    return (
        <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Tüm Videolar
                    </h1>
                    <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto">
                        Psikoloji, terapi süreçleri ve kişisel gelişim üzerine hazırladığımız tüm videolarımızı buradan izleyebilirsiniz.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {videos.map((video) => {
                        const videoId = extractYouTubeId(video.youtube_url);
                        if (!videoId) return null;

                        return (
                            <div
                                key={video.id}
                                className="rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full"
                            >
                                <div className="relative w-full aspect-[9/16] overflow-hidden bg-muted">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                                <div className="p-5 flex-grow flex items-start">
                                    <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {videos.length === 0 && (
                    <div className="text-center text-muted-foreground py-16 bg-card rounded-xl border max-w-3xl mx-auto shadow-sm">
                        <p className="text-lg">Henüz video bulunmamaktadır.</p>
                        <p className="text-sm mt-2 opacity-80">Yakında yeni videolarımızla karşınızda olacağız.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
