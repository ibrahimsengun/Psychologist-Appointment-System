'use client';

import { useState, useCallback, useEffect } from 'react';
import { GalleryImage } from '@/types/gallery';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryGridProps {
    images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const goNext = useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    }, [selectedIndex, images.length]);

    const goPrev = useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    }, [selectedIndex, images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (selectedIndex === null) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        }

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, goNext, goPrev]);

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

    return (
        <>
            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className="break-inside-avoid group cursor-pointer"
                        onClick={() => openLightbox(index)}
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-muted/30
                                    transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1">
                            <Image
                                src={image.image_url}
                                alt={image.title || 'Galeri görseli'}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                {image.title && (
                                    <p className="text-white font-medium text-sm">{image.title}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2 rounded-full
                               bg-white/10 hover:bg-white/20 transition-all"
                        aria-label="Kapat"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Prev Button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-4 z-50 text-white/80 hover:text-white p-3 rounded-full
                                   bg-white/10 hover:bg-white/20 transition-all"
                            aria-label="Önceki"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Next Button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-4 z-50 text-white/80 hover:text-white p-3 rounded-full
                                   bg-white/10 hover:bg-white/20 transition-all"
                            aria-label="Sonraki"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.image_url}
                            alt={selectedImage.title || 'Galeri görseli'}
                            width={1200}
                            height={800}
                            className="max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                            sizes="90vw"
                            priority
                        />
                        {(selectedImage.title || selectedImage.description) && (
                            <div className="mt-4 text-center max-w-xl">
                                {selectedImage.title && (
                                    <p className="text-white font-semibold text-lg">{selectedImage.title}</p>
                                )}
                                {selectedImage.description && (
                                    <p className="text-white/70 text-sm mt-1">{selectedImage.description}</p>
                                )}
                            </div>
                        )}
                        {/* Counter */}
                        <p className="text-white/50 text-xs mt-3">
                            {selectedIndex! + 1} / {images.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
