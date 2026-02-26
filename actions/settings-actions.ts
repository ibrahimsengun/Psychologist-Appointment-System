'use server';

import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { revalidatePath } from 'next/cache';
import { unstable_cache } from 'next/cache';

export interface WhatsAppSettings {
    number: string;
    message: string;
}

// Public: WhatsApp ayarlarını cached olarak getir
export async function getWhatsAppSettings(): Promise<WhatsAppSettings> {
    const cachedFn = unstable_cache(
        async () => {
            const supabase = createPublicClient();

            const { data, error } = await supabase
                .from('site_settings')
                .select('key, value')
                .in('key', ['whatsapp_number', 'whatsapp_message']);

            if (error) {
                console.error('WhatsApp ayarları getirme hatası:', error);
                return {
                    number: '905448322091',
                    message: 'Merhaba, randevu almak istiyorum.',
                };
            }

            const settings: WhatsAppSettings = {
                number: '905448322091',
                message: 'Merhaba, randevu almak istiyorum.',
            };

            for (const row of data) {
                if (row.key === 'whatsapp_number') settings.number = row.value;
                if (row.key === 'whatsapp_message') settings.message = row.value;
            }

            return settings;
        },
        ['whatsapp-settings'],
        { revalidate: 300, tags: ['site-settings'] }
    );

    return cachedFn();
}

// Admin: WhatsApp ayarlarını güncelle
export async function updateWhatsAppSettings(
    number: string,
    message: string
): Promise<void> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    const now = new Date().toISOString();

    const { error: numberError } = await supabase
        .from('site_settings')
        .update({ value: number, updated_at: now })
        .eq('key', 'whatsapp_number');

    if (numberError) {
        console.error('WhatsApp numara güncelleme hatası:', numberError);
        throw new Error('WhatsApp numarası güncellenemedi');
    }

    const { error: messageError } = await supabase
        .from('site_settings')
        .update({ value: message, updated_at: now })
        .eq('key', 'whatsapp_message');

    if (messageError) {
        console.error('WhatsApp mesaj güncelleme hatası:', messageError);
        throw new Error('WhatsApp mesajı güncellenemedi');
    }

    revalidatePath('/');
    revalidatePath('/admin/settings');
}
