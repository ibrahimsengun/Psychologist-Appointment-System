import { getAllVideos } from '@/actions/video-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { VideosTable } from '@/components/videos-table';
import { CreateVideoDialog } from '@/components/videos/create-video-dialog';
import { Video } from '@/types/video';

export default async function VideosPage() {
    const videos = await getAllVideos() as Video[];

    return (
        <div className="container mx-auto py-8">
            <AdminPageHeader
                title="Videolar"
                description="Eklediğiniz videolar anasayfada ve Videolar sayfasında görünür."
                action={<CreateVideoDialog />}
            />

            <div className="rounded-lg border bg-card p-6">
                <VideosTable videos={videos} />
            </div>
        </div>
    );
}
