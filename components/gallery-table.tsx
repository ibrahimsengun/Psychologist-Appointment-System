'use client';

import { useState } from 'react';
import { GalleryImage } from '@/types/gallery';
import { deleteGalleryImage, toggleGalleryImageActive } from '@/actions/gallery-actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';

interface GalleryTableProps {
    images: GalleryImage[];
}

export function GalleryTable({ images }: GalleryTableProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setLoadingId(id);
        try {
            await deleteGalleryImage(id);
            toast.success('Görsel silindi');
            router.refresh();
        } catch {
            toast.error('Görsel silinirken bir hata oluştu');
        } finally {
            setLoadingId(null);
        }
    }

    async function handleToggle(id: string, isActive: boolean) {
        try {
            await toggleGalleryImageActive(id, isActive);
            toast.success(isActive ? 'Görsel aktifleştirildi' : 'Görsel pasifleştirildi');
            router.refresh();
        } catch {
            toast.error('Görsel durumu güncellenirken bir hata oluştu');
        }
    }

    if (images.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Henüz görsel eklenmemiş. &quot;Görsel Ekle&quot; butonuna tıklayarak ilk görselinizi ekleyin.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image) => (
                <div
                    key={image.id}
                    className="group relative bg-background border border-border rounded-xl overflow-hidden"
                >
                    {/* Görsel */}
                    <div className="relative aspect-square">
                        <Image
                            src={image.image_url}
                            alt={image.title || 'Galeri görseli'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {!image.is_active && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
                                    Pasif
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Bilgiler */}
                    <div className="p-3">
                        {image.title && (
                            <p className="font-medium text-sm truncate">{image.title}</p>
                        )}
                        {image.description && (
                            <p className="text-xs text-muted-foreground truncate mt-0.5">{image.description}</p>
                        )}

                        {/* Kontroller */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                            <Switch
                                checked={image.is_active}
                                onCheckedChange={(checked) => handleToggle(image.id, checked)}
                            />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive h-8 w-8"
                                        disabled={loadingId === image.id}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Görseli silmek istediğinize emin misiniz?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {image.title ? `"${image.title}"` : 'Bu görsel'} kalıcı olarak silinecektir.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>İptal</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(image.id)}>
                                            Sil
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
