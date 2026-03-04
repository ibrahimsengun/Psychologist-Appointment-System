'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewFormSchema, ReviewFormValues, Review } from '@/types/review';
import { updateReview } from '@/actions/review-actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface EditReviewDialogProps {
    review: Review;
}

export function EditReviewDialog({ review }: EditReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            relative_time: review.relative_time || '',
            profile_photo_url: review.profile_photo_url || '',
        },
    });

    async function onSubmit(data: ReviewFormValues) {
        setLoading(true);
        try {
            await updateReview(review.id, data);
            toast.success('Yorum başarıyla güncellendi');
            setOpen(false);
            router.refresh();
        } catch {
            toast.error('Yorum güncellenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Yorumu Düzenle</DialogTitle>
                    <DialogDescription>
                        {review.author_name} tarafından yazılan yorumu düzenleyin.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="author_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yazar Adı</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Örn: Mehmet Yılmaz" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Puan</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={String(field.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Puan seçin" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                <SelectItem key={rating} value={String(rating)}>
                                                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} ({rating})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yorum Metni</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Danışanın yorumunu girin..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="relative_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zaman Bilgisi (opsiyonel)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Örn: 2 ay önce" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Güncelleniyor...' : 'Güncelle'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
