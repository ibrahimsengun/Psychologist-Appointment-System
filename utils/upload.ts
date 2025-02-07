'use server';

import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(file: File) {
  const supabase = await createClient();

  try {
    // Dosya uzantısını al
    const fileExt = file.name.split('.').pop();
    // Benzersiz bir dosya adı oluştur
    const fileName = `${uuidv4()}.${fileExt}`;
    // Dosyayı yükle
    const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) {
      throw error;
    }

    // Yüklenen dosyanın public URL'ini al
    const { data: publicUrl } = supabase.storage.from('blog-images').getPublicUrl(data.path);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Görsel yükleme hatası:', error);
    throw new Error('Görsel yüklenirken bir hata oluştu');
  }
}
