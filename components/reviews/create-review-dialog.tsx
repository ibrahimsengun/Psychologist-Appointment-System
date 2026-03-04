'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewFormSchema, ReviewFormValues } from '@/types/review';
import { createReview } from '@/actions/review-actions';
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
import { Plus } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function CreateReviewDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            author_name: '',
            rating: 5,
            text: '',
            relative_time: '',
            profile_photo_url: '',
        },
    });

    async function onSubmit(data: ReviewFormValues) {
        setLoading(true);
        try {
            await createReview(data);
            toast.success('Yorum başarıyla eklendi');
            form.reset();
            setOpen(false);
            router.refresh();
        } catch {
            toast.error('Yorum eklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Yorum Ekle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Yeni Yorum Ekle</DialogTitle>
                    <DialogDescription>
                        Google Maps&apos;ten veya başka bir kaynaktan yorum bilgilerini girin.
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
                                {loading ? 'Ekleniyor...' : 'Ekle'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
