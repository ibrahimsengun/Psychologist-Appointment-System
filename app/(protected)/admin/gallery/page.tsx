import { getAllGalleryImages } from '@/actions/gallery-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { GalleryTable } from '@/components/gallery-table';
import { UploadGalleryDialog } from '@/components/gallery/upload-gallery-dialog';
import { GalleryImage } from '@/types/gallery';

export default async function GalleryAdminPage() {
    const images = await getAllGalleryImages() as GalleryImage[];

    return (
        <div className="container mx-auto py-8">
            <AdminPageHeader
                title="Galeri"
                description={`Galeri sayfasında görünen fotoğraflar. Şu an ${images.length} görsel var.`}
                action={<UploadGalleryDialog />}
            />

            <div className="rounded-lg border bg-card p-6">
                <GalleryTable images={images} />
            </div>
        </div>
    );
}
