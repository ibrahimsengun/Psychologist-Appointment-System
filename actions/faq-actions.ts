'use server';

import { FAQ, FAQFormValues } from '@/types/faq';
import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { unstable_cache } from 'next/cache';

// Public: Aktif FAQ'ları sıralı getir
export async function getActiveFAQs(): Promise<FAQ[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('FAQ getirme hatası:', error);
        throw new Error('FAQ verileri yüklenemedi');
    }

    return data as FAQ[];
}

// Public: Anasayfada gösterilecek FAQ'ları getir
export async function getHomepageFAQs(): Promise<FAQ[]> {
    const cachedFn = unstable_cache(
        async () => {
            const supabase = createPublicClient();

            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .eq('is_active', true)
                .eq('show_on_homepage', true)
                .order('display_order', { ascending: true });

            if (error) {
                console.error('Anasayfa FAQ getirme hatası:', error);
                throw new Error('Anasayfa FAQ verileri yüklenemedi');
            }

            return data as FAQ[];
        },
        ['homepage-faqs'],
        { revalidate: 300, tags: ['faqs'] }
    );

    return cachedFn();
}

// Admin: Tüm FAQ'ları getir
export async function getAllFAQs(): Promise<FAQ[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('FAQ listeleme hatası:', error);
        throw new Error('FAQ listesi yüklenemedi');
    }

    return data as FAQ[];
}

// Admin: Yeni FAQ oluştur
export async function createFAQ(formData: FAQFormValues): Promise<FAQ> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('faqs')
        .insert({
            question: formData.question,
            answer: formData.answer,
            display_order: formData.display_order,
            is_active: formData.is_active,
            show_on_homepage: formData.show_on_homepage,
            created_at: now,
            updated_at: now
        })
        .select()
        .single();

    if (error) {
        console.error('FAQ oluşturma hatası:', error);
        throw new Error('FAQ oluşturulamadı');
    }

    return data as FAQ;
}

// Admin: FAQ güncelle
export async function updateFAQ(id: string, formData: FAQFormValues): Promise<FAQ> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('faqs')
        .update({
            question: formData.question,
            answer: formData.answer,
            display_order: formData.display_order,
            is_active: formData.is_active,
            show_on_homepage: formData.show_on_homepage,
            updated_at: now
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('FAQ güncelleme hatası:', error);
        throw new Error('FAQ güncellenemedi');
    }

    return data as FAQ;
}

// Admin: FAQ sil
export async function deleteFAQ(id: string): Promise<void> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('FAQ silme hatası:', error);
        throw new Error('FAQ silinemedi');
    }
}

// Admin: FAQ aktif/pasif toggle
export async function toggleFAQActive(id: string, isActive: boolean): Promise<FAQ> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('faqs')
        .update({
            is_active: isActive,
            updated_at: now
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('FAQ durum güncelleme hatası:', error);
        throw new Error('FAQ durumu güncellenemedi');
    }

    return data as FAQ;
}

// Admin: FAQ anasayfa gösterimi toggle
export async function toggleHomepageFAQ(id: string, showOnHomepage: boolean): Promise<FAQ> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('faqs')
        .update({
            show_on_homepage: showOnHomepage,
            updated_at: now
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('FAQ anasayfa durumu güncelleme hatası:', error);
        throw new Error('FAQ anasayfa durumu güncellenemedi');
    }

    return data as FAQ;
}
