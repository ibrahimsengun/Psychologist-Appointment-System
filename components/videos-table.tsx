'use client';

import { useState } from 'react';
import { Video, extractYouTubeId } from '@/types/video';
import { deleteVideo, toggleVideoActive } from '@/actions/video-actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2, ExternalLink } from 'lucide-react';
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

interface VideosTableProps {
    videos: Video[];
}

export function VideosTable({ videos }: VideosTableProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setLoadingId(id);
        try {
            await deleteVideo(id);
            toast.success('Video silindi');
            router.refresh();
        } catch {
            toast.error('Video silinirken bir hata oluştu');
        } finally {
            setLoadingId(null);
        }
    }

    async function handleToggle(id: string, isActive: boolean) {
        try {
            await toggleVideoActive(id, isActive);
            toast.success(isActive ? 'Video aktifleştirildi' : 'Video pasifleştirildi');
            router.refresh();
        } catch {
            toast.error('Video durumu güncellenirken bir hata oluştu');
        }
    }

    if (videos.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Henüz video eklenmemiş. &quot;Video Ekle&quot; butonuna tıklayarak ilk videonuzu ekleyin.
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {videos.map((video) => {
                    const videoId = extractYouTubeId(video.youtube_url);
                    return (
                        <TableRow key={video.id}>
                            <TableCell>
                                {videoId ? (
                                    <img
                                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                        alt={video.title}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-32 h-20 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                                        Önizleme yok
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium">{video.title}</p>
                                    <a
                                        href={video.youtube_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-1"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        YouTube&apos;da aç
                                    </a>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={video.is_active}
                                    onCheckedChange={(checked) => handleToggle(video.id, checked)}
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            disabled={loadingId === video.id}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Videoyu silmek istediğinize emin misiniz?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                &quot;{video.title}&quot; videosu kalıcı olarak silinecektir.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>İptal</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(video.id)}>
                                                Sil
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
