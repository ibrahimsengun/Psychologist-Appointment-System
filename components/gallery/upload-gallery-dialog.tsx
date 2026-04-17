'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { uploadImage } from '@/utils/upload';
import { createGalleryImage } from '@/actions/gallery-actions';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, Loader2, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function UploadGalleryDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            try {
                setIsUploading(true);
                const file = acceptedFiles[0];
                const url = await uploadImage(file);
                setImageUrl(url);
            } catch (error) {
                console.error('Yükleme hatası:', error);
                toast.error('Görsel yüklenirken bir hata oluştu');
            } finally {
                setIsUploading(false);
            }
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    async function handleSubmit() {
        if (!imageUrl) {
            toast.error('Lütfen bir görsel yükleyin');
            return;
        }

        setLoading(true);
        try {
            await createGalleryImage({
                image_url: imageUrl,
                title: title || undefined,
                description: description || undefined,
            });
            toast.success('Görsel galeriye eklendi');
            setImageUrl('');
            setTitle('');
            setDescription('');
            setOpen(false);
            router.refresh();
        } catch {
            toast.error('Görsel eklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }

    function handleOpenChange(newOpen: boolean) {
        setOpen(newOpen);
        if (!newOpen) {
            setImageUrl('');
            setTitle('');
            setDescription('');
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Görsel Ekle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Galeriye Görsel Ekle</DialogTitle>
                    <DialogDescription>
                        Görsel yükleyin ve isteğe bağlı olarak başlık ve açıklama ekleyin.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Görsel Yükleme */}
                    {imageUrl ? (
                        <div className="relative w-full h-[300px]">
                            <Image
                                src={imageUrl}
                                alt="Yüklenen görsel"
                                className="object-contain rounded-lg"
                                fill
                                sizes="(max-width: 600px) 100vw, 600px"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => setImageUrl('')}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                                isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
                            }`}
                        >
                            <input {...getInputProps()} />
                            {isUploading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Yükleniyor...</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <ImagePlus className="h-10 w-10 text-gray-400" />
                                    <div className="text-sm text-gray-600">
                                        {isDragActive ? (
                                            'Görseli buraya bırakın'
                                        ) : (
                                            <>
                                                Görseli buraya sürükleyin veya seçmek için tıklayın
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG veya WEBP</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Başlık */}
                    <div className="space-y-2">
                        <Label htmlFor="gallery-title">Başlık (Opsiyonel)</Label>
                        <Input
                            id="gallery-title"
                            placeholder="Görsel başlığı"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Açıklama */}
                    <div className="space-y-2">
                        <Label htmlFor="gallery-description">Açıklama (Opsiyonel)</Label>
                        <Textarea
                            id="gallery-description"
                            placeholder="Görsel açıklaması"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={loading || !imageUrl}>
                        {loading ? 'Ekleniyor...' : 'Galeriye Ekle'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
