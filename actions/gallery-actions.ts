'use server';

import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { revalidatePath } from 'next/cache';
import { unstable_cache } from 'next/cache';

// Public: Aktif galeri görsellerini cache'li getir
export async function getGalleryImages() {
    const cachedFn = unstable_cache(
        async () => {
            const supabase = createPublicClient();

            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error('Galeri görselleri yüklenirken bir hata oluştu');
            }

            return data;
        },
        ['gallery'],
        { revalidate: 300, tags: ['gallery'] }
    );

    return cachedFn();
}

// Admin: Tüm galeri görsellerini getir
export async function getAllGalleryImages() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error('Galeri görselleri yüklenirken bir hata oluştu');
    }

    return data;
}

// Admin: Galeri görseli ekle
export async function createGalleryImage(data: {
    image_url: string;
    title?: string;
    description?: string;
}) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('gallery')
        .insert([{
            image_url: data.image_url,
            title: data.title || null,
            description: data.description || null,
        }]);

    if (error) {
        throw new Error('Görsel eklenirken bir hata oluştu');
    }

    revalidatePath('/admin/gallery');
    revalidatePath('/galeri');
}

// Admin: Galeri görseli sil
export async function deleteGalleryImage(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Görsel silinirken bir hata oluştu');
    }

    revalidatePath('/admin/gallery');
    revalidatePath('/galeri');
}

// Admin: Galeri görseli aktif/pasif toggle
export async function toggleGalleryImageActive(id: string, isActive: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('gallery')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error('Görsel durumu güncellenirken bir hata oluştu');
    }

    revalidatePath('/admin/gallery');
    revalidatePath('/galeri');
}

// Admin: Galeri görseli güncelle
export async function updateGalleryImage(id: string, data: {
    title?: string;
    description?: string;
    sort_order?: number;
}) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('gallery')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error('Görsel güncellenirken bir hata oluştu');
    }

    revalidatePath('/admin/gallery');
    revalidatePath('/galeri');
}
