'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, CategoryFormValues, categoryFormSchema } from '@/types/category';
import { createCategory, updateCategory } from '@/actions/category-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import slugify from 'slugify';

interface CategoryFormProps {
    category?: Category | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function CategoryForm({ category, onSuccess, onCancel }: CategoryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditing = !!category;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: category
            ? {
                name: category.name,
                slug: category.slug,
                description: category.description || ''
            }
            : {
                name: '',
                slug: '',
                description: ''
            }
    });

    const name = watch('name');

    // Slug otomatik oluşturma
    useEffect(() => {
        if (!isEditing && name) {
            const autoSlug = slugify(name, {
                lower: true,
                strict: true,
                locale: 'tr'
            });
            setValue('slug', autoSlug);
        }
    }, [name, isEditing, setValue]);

    const onSubmit = async (data: CategoryFormValues) => {
        setIsSubmitting(true);
        try {
            if (isEditing && category) {
                await updateCategory(category.id, data);
                toast.success('Kategori güncellendi');
            } else {
                await createCategory(data);
                toast.success('Kategori oluşturuldu');
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
                <Label htmlFor="name">Kategori Adı *</Label>
                <Input
                    id="name"
                    {...register('name')}
                    placeholder="Örn: Kaygı ve Stres"
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                    id="slug"
                    {...register('slug')}
                    placeholder="kaygi-ve-stres"
                    disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                    URL'de kullanılacak benzersiz tanımlayıcı (otomatik oluşturulur)
                </p>
                {errors.slug && (
                    <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Kategori açıklaması (opsiyonel)"
                    rows={3}
                    disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                    SEO için kategori açıklaması ekleyin (maksimum 500 karakter)
                </p>
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Kaydediliyor...'
                        : isEditing
                            ? 'Kategoriyi Güncelle'
                            : 'Kategori Oluştur'}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    İptal
                </Button>
            </div>
        </form>
    );
}
