'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FAQ, FAQFormValues, faqFormSchema } from '@/types/faq';
import { createFAQ, updateFAQ } from '@/actions/faq-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface FAQFormProps {
    faq?: FAQ | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function FAQForm({ faq, onSuccess, onCancel }: FAQFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditing = !!faq;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<FAQFormValues>({
        resolver: zodResolver(faqFormSchema),
        defaultValues: faq
            ? {
                question: faq.question,
                answer: faq.answer,
                display_order: faq.display_order,
                is_active: faq.is_active,
                show_on_homepage: faq.show_on_homepage
            }
            : {
                question: '',
                answer: '',
                display_order: 0,
                is_active: true,
                show_on_homepage: false
            }
    });

    const isActive = watch('is_active');
    const showOnHomepage = watch('show_on_homepage');

    const onSubmit = async (data: FAQFormValues) => {
        setIsSubmitting(true);
        try {
            if (isEditing && faq) {
                await updateFAQ(faq.id, data);
                toast.success('Soru güncellendi');
            } else {
                await createFAQ(data);
                toast.success('Soru oluşturuldu');
            }
            onSuccess();
        } catch (error: any) {
            toast.error(error.message || 'Bir hata oluştu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="question">Soru *</Label>
                <Input
                    id="question"
                    {...register('question')}
                    placeholder="Örn: Bir seans ne kadar sürüyor?"
                    disabled={isSubmitting}
                />
                {errors.question && (
                    <p className="text-sm text-destructive">{errors.question.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="answer">Cevap *</Label>
                <Textarea
                    id="answer"
                    {...register('answer')}
                    placeholder="Sorunun cevabını yazın..."
                    rows={4}
                    disabled={isSubmitting}
                />
                {errors.answer && (
                    <p className="text-sm text-destructive">{errors.answer.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="display_order">Sıralama</Label>
                <Input
                    id="display_order"
                    type="number"
                    {...register('display_order', { valueAsNumber: true })}
                    placeholder="0"
                    disabled={isSubmitting}
                    className="w-24"
                />
                <p className="text-xs text-muted-foreground">
                    Küçük sayılar önce gösterilir
                </p>
                {errors.display_order && (
                    <p className="text-sm text-destructive">{errors.display_order.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Durum</Label>
                    <div className="flex items-center gap-2 pt-2">
                        <Switch
                            checked={isActive}
                            onCheckedChange={(checked) => setValue('is_active', checked)}
                            disabled={isSubmitting}
                        />
                        <span className="text-sm">
                            {isActive ? 'Aktif (görünür)' : 'Pasif (gizli)'}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Anasayfada Göster</Label>
                    <div className="flex items-center gap-2 pt-2">
                        <Switch
                            checked={showOnHomepage}
                            onCheckedChange={(checked) => setValue('show_on_homepage', checked)}
                            disabled={isSubmitting}
                        />
                        <span className="text-sm">
                            {showOnHomepage ? 'Gösteriliyor' : 'Gösterilmiyor'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Kaydediliyor...'
                        : isEditing
                            ? 'Soruyu Güncelle'
                            : 'Soru Ekle'}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    İptal
                </Button>
            </div>
        </form>
    );
}
