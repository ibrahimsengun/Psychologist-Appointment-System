import { getAllVideos } from '@/actions/video-actions';
import { VideosTable } from '@/components/videos-table';
import { CreateVideoDialog } from '@/components/videos/create-video-dialog';
import { Video } from '@/types/video';

export default async function VideosPage() {
    const videos = await getAllVideos() as Video[];

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Videolar</h1>
                <CreateVideoDialog />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <VideosTable videos={videos} />
            </div>
        </div>
    );
}
