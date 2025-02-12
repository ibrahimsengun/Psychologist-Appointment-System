'use server';

import { createClient } from '@/utils/supabase/server';
import { ServiceFormValues } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function getServices() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Hizmetler yüklenirken bir hata oluştu');
  }

  return data;
}

export async function getServiceById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Hizmet bulunamadı');
  }

  return data;
}

export async function createService(data: ServiceFormValues) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('services')
    .insert([data]);

  if (error) {
    throw new Error('Hizmet oluşturulurken bir hata oluştu');
  }

  revalidatePath('/admin/services');
}

export async function updateService(id: string, data: ServiceFormValues) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('services')
    .update(data)
    .eq('id', id);

  if (error) {
    throw new Error('Hizmet güncellenirken bir hata oluştu');
  }

  revalidatePath('/admin/services');
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
} 