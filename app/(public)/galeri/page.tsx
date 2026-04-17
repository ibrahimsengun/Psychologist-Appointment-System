import { getGalleryImages } from '@/actions/gallery-actions';
import { GalleryImage } from '@/types/gallery';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SITE_URL } from '@/lib/schema';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/gallery-grid';

export const metadata: Metadata = {
    title: 'Galeri | Uzman Psk. Lokman Yılmaz - Samsun Psikolog',
    description:
        'Uzman Psk. Lokman Yılmaz\'ın Samsun Atakum\'daki Psikodemy ofisi ve psikolojik danışmanlık hizmetlerinden kareler.',
    alternates: {
        canonical: `${SITE_URL}/galeri`
    },
    openGraph: {
        title: 'Galeri | Uzman Psk. Lokman Yılmaz',
        description: 'Psikodemy ofisi ve psikolojik danışmanlık hizmetlerinden kareler.',
        url: `${SITE_URL}/galeri`,
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};

export const revalidate = 300;

export default async function GaleriPage() {
    const images = await getGalleryImages() as GalleryImage[];

    return (
        <div className="container py-8">
            <Breadcrumb items={[{ label: 'Galeri' }]} />

            <div className="text-center mb-12">
                <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                    Fotoğraf Galerisi
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Psikodemy ofisimiz ve psikolojik danışmanlık hizmetlerimizden kareler
                </p>
            </div>

            {images.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                    <p>Henüz galeri görseli eklenmemiş.</p>
                </div>
            ) : (
                <GalleryGrid images={images} />
            )}
        </div>
    );
}
