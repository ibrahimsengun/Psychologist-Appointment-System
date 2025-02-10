'use client';

import { Button } from '@/components/ui/button';
import { uploadImage } from '@/utils/upload';
import { ImagePlus, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true);
        const file = acceptedFiles[0];
        const url = await uploadImage(file);
        onChange(url);
      } catch (error) {
        console.error('Yükleme hatası:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div>
      {value ? (
        <div className="relative w-full h-[600px] mb-4">
          <Image
            src={value}
            alt="Kapak görseli"
            className="object-contain rounded-lg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
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
              <ImagePlus className="h-8 w-8 text-gray-400" />
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
    </div>
  );
}
