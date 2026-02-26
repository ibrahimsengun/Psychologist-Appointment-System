'use server';

import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { VideoFormValues } from '@/types/video';
import { revalidatePath } from 'next/cache';
import { unstable_cache } from 'next/cache';

// Public: Aktif videoları cache'li getir
export async function getVideos() {
    const cachedFn = unstable_cache(
        async () => {
            const supabase = createPublicClient();

            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error('Videolar yüklenirken bir hata oluştu');
            }

            return data;
        },
        ['videos'],
        { revalidate: 300, tags: ['videos'] }
    );

    return cachedFn();
}

// Admin: Tüm videoları getir
export async function getAllVideos() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error('Videolar yüklenirken bir hata oluştu');
    }

    return data;
}

export async function getVideoById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error('Video bulunamadı');
    }

    return data;
}

export async function createVideo(data: VideoFormValues) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('videos')
        .insert([{
            youtube_url: data.youtube_url,
            title: data.title,
        }]);

    if (error) {
        throw new Error('Video eklenirken bir hata oluştu');
    }

    revalidatePath('/admin/videos');
    revalidatePath('/');
}

export async function updateVideo(id: string, data: Partial<VideoFormValues & { sort_order: number; is_active: boolean }>) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('videos')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error('Video güncellenirken bir hata oluştu');
    }

    revalidatePath('/admin/videos');
    revalidatePath('/');
}

export async function deleteVideo(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error('Video silinirken bir hata oluştu');
    }

    revalidatePath('/admin/videos');
    revalidatePath('/');
}

export async function toggleVideoActive(id: string, isActive: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('videos')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error('Video durumu güncellenirken bir hata oluştu');
    }

    revalidatePath('/admin/videos');
    revalidatePath('/');
}
