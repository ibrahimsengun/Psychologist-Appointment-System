import Footer from '@/components/footer';
import Header from '@/components/header';
import WhatsAppButton from '@/components/whatsapp-button';
import { createClient } from '@/utils/supabase/server';
import { getWhatsAppSettings } from '@/actions/settings-actions';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let adminEmail: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    adminEmail = user?.email ?? null;
  } catch { }

  const whatsappSettings = await getWhatsAppSettings();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header adminEmail={adminEmail} />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton
        phoneNumber={whatsappSettings.number}
        message={whatsappSettings.message}
      />
    </div>
  );
}
