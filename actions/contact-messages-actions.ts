'use server';
import { ContactFormData, ContactMessage } from '@/types/contact-messages';
import { createClient } from '@/utils/supabase/server';

const CONTACT_MESSAGES = 'contact_messages';

export async function postContactForm(body: ContactFormData) {
  const supabase = await createClient();
  const { error } = await supabase.from(CONTACT_MESSAGES).insert([body]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from(CONTACT_MESSAGES).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data as ContactMessage[];
}
