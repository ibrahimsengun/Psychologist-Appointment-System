'use client';

import { useState } from 'react';
import { Review } from '@/types/review';
import { deleteReview, toggleReviewActive } from '@/actions/review-actions';
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
import { Trash2, Star } from 'lucide-react';
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
import { EditReviewDialog } from '@/components/reviews/edit-review-dialog';

interface ReviewsTableProps {
    reviews: Review[];
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setLoadingId(id);
        try {
            await deleteReview(id);
            toast.success('Yorum silindi');
            router.refresh();
        } catch {
            toast.error('Yorum silinirken bir hata oluştu');
        } finally {
            setLoadingId(null);
        }
    }

    async function handleToggle(id: string, isActive: boolean) {
        try {
            await toggleReviewActive(id, isActive);
            toast.success(isActive ? 'Yorum aktifleştirildi' : 'Yorum pasifleştirildi');
            router.refresh();
        } catch {
            toast.error('Yorum durumu güncellenirken bir hata oluştu');
        }
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Henüz yorum eklenmemiş. &quot;Yorum Ekle&quot; butonuna tıklayarak ilk yorumu ekleyin.
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Yazar</TableHead>
                    <TableHead>Puan</TableHead>
                    <TableHead className="max-w-xs">Yorum</TableHead>
                    <TableHead>Zaman</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reviews.map((review) => (
                    <TableRow key={review.id}>
                        <TableCell>
                            <p className="font-medium">{review.author_name}</p>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{review.rating}</span>
                            </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {review.text}
                            </p>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-muted-foreground">
                                {review.relative_time || '-'}
                            </span>
                        </TableCell>
                        <TableCell>
                            <Switch
                                checked={review.is_active}
                                onCheckedChange={(checked) => handleToggle(review.id, checked)}
                            />
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                <EditReviewDialog review={review} />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            disabled={loadingId === review.id}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Yorumu silmek istediğinize emin misiniz?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                {review.author_name} tarafından yazılan yorum kalıcı olarak silinecektir.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>İptal</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(review.id)}>
                                                Sil
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
