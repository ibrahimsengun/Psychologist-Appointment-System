import { getAllGalleryImages } from '@/actions/gallery-actions';
import { GalleryTable } from '@/components/gallery-table';
import { UploadGalleryDialog } from '@/components/gallery/upload-gallery-dialog';
import { GalleryImage } from '@/types/gallery';

export default async function GalleryAdminPage() {
    const images = await getAllGalleryImages() as GalleryImage[];

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Galeri</h1>
                    <p className="text-muted-foreground mt-1">
                        {images.length} görsel
                    </p>
                </div>
                <UploadGalleryDialog />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <GalleryTable images={images} />
            </div>
        </div>
    );
}
