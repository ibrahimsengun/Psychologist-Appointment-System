'use server';

import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { ReviewFormValues } from '@/types/review';
import { revalidatePath } from 'next/cache';
import { unstable_cache } from 'next/cache';

// Public: Aktif yorumları cache'li getir
export async function getReviews() {
    const cachedFn = unstable_cache(
        async () => {
            const supabase = createPublicClient();

            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Yorumlar yüklenirken hata:', error.message);
                return [];
            }

            return data;
        },
        ['reviews'],
        { revalidate: 300, tags: ['reviews'] }
    );

    return cachedFn();
}

// Admin: Tüm yorumları getir
export async function getAllReviews() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error('Yorumlar yüklenirken bir hata oluştu');
    }

    return data;
}

export async function createReview(data: ReviewFormValues) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('reviews')
        .insert([{
            author_name: data.author_name,
            rating: data.rating,
            text: data.text,
            relative_time: data.relative_time || null,
            profile_photo_url: data.profile_photo_url || null,
        }]);

    if (error) {
        throw new Error('Yorum eklenirken bir hata oluştu');
    }

    revalidatePath('/admin/reviews');
    revalidatePath('/');
}

export async function updateReview(id: string, data: Partial<ReviewFormValues & { sort_order: number; is_active: boolean }>) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('reviews')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error('Yorum güncellenirken bir hata oluştu');
    }

    revalidatePath('/admin/reviews');
    revalidatePath('/');
}

export async function deleteReview(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Yorum silinirken bir hata oluştu');
    }

    revalidatePath('/admin/reviews');
    revalidatePath('/');
}

export async function toggleReviewActive(id: string, isActive: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('reviews')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error('Yorum durumu güncellenirken bir hata oluştu');
    }

    revalidatePath('/admin/reviews');
    revalidatePath('/');
}
