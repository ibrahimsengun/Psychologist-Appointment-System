'use server';

import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { Service, ServiceFormValues } from '@/types/service';
import { revalidatePath } from 'next/cache';
import { unstable_cache } from 'next/cache';
import slugify from 'slugify';

function generateExcerpt(content: string, maxLength: number = 300): string {
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plainText.length <= maxLength) return plainText;

  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return truncated.slice(0, lastSpace) + '...';
}

// Public: Tüm yayında olan hizmetleri cache'li getir
export async function getPublishedServices(): Promise<Service[]> {
  const cachedFn = unstable_cache(
    async () => {
      const supabase = createPublicClient();

      // Try with status filter first; fall back to all services if column doesn't exist yet
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        // Fallback: fetch all services without status filter
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (fallbackError) {
          throw new Error('Hizmetler yüklenirken bir hata oluştu');
        }

        return (fallbackData || []) as Service[];
      }

      return data as Service[];
    },
    ['published-services'],
    { revalidate: 300, tags: ['services'] }
  );

  return cachedFn();
}

// Admin: Tüm hizmetleri getir (status fark etmez)
export async function getServices(): Promise<Service[]> {
  const cachedFn = unstable_cache(
    async () => {
      const supabase = createPublicClient();

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Hizmetler yüklenirken bir hata oluştu');
      }

      return data as Service[];
    },
    ['services'],
    { revalidate: 300, tags: ['services'] }
  );

  return cachedFn();
}

export async function getServiceById(id: string): Promise<Service> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Hizmet bulunamadı');
  }

  return data as Service;
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    throw new Error('Hizmet bulunamadı');
  }

  return data as Service;
}

export async function createService(formData: ServiceFormValues): Promise<Service> {
  const supabase = await createClient();

  const slug = slugify(formData.name, {
    lower: true,
    strict: true,
    locale: 'tr'
  });

  const now = new Date().toISOString();
  const excerpt = generateExcerpt(formData.content);

  const { data, error } = await supabase
    .from('services')
    .insert({
      name: formData.name,
      slug,
      content: formData.content,
      excerpt,
      description: formData.description || null,
      cover_image: formData.cover_image || null,
      meta_description: formData.meta_description || null,
      status: formData.status,
      created_at: now,
      updated_at: now
    })
    .select()
    .single();

  if (error) {
    console.error('Hizmet oluşturma hatası:', error);
    if (error.code === '23505') {
      throw new Error('Bu isimle bir hizmet zaten mevcut. Lütfen farklı bir isim kullanın.');
    }
    throw new Error('Hizmet oluşturulurken bir hata oluştu');
  }

  revalidatePath('/admin/services');
  revalidatePath('/hizmetler');
  revalidatePath('/');

  return data as Service;
}

export async function updateService(id: string, formData: ServiceFormValues): Promise<Service> {
  const supabase = await createClient();

  const now = new Date().toISOString();
  const excerpt = generateExcerpt(formData.content);

  const { error: updateError } = await supabase
    .from('services')
    .update({
      name: formData.name,
      content: formData.content,
      excerpt,
      description: formData.description || null,
      cover_image: formData.cover_image || null,
      meta_description: formData.meta_description || null,
      status: formData.status,
      updated_at: now
    })
    .eq('id', id);

  if (updateError) {
    console.error('Hizmet güncelleme hatası:', updateError);
    throw new Error('Hizmet güncellenirken bir hata oluştu');
  }

  // Güncellenmiş veriyi getir
  const { data: updatedService, error: refetchError } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (refetchError || !updatedService) {
    throw new Error('Hizmet güncellendi ancak veri getirilemedi');
  }

  revalidatePath('/admin/services');
  revalidatePath('/hizmetler');
  revalidatePath('/');

  return updatedService as Service;
}

export async function deleteService(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('Hizmet silinirken bir hata oluştu');
  }

  revalidatePath('/admin/services');
  revalidatePath('/hizmetler');
  revalidatePath('/');
}