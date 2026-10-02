import Footer from '@/components/footer';
import Header from '@/components/header';
import WhatsAppButton from '@/components/whatsapp-button';
import { getWhatsAppSettings } from '@/actions/settings-actions';

// Not: Burada cookies()/auth.getUser() çağrılmamalı. Aksi halde tüm public
// sayfalar her istekte sunucuda yeniden render edilir ve link tıklamalarında
// gecikme hissedilir. Admin şeridi Header içinde istemci tarafında yüklenir.
// Güvenlik ağı: önbelleğe alınmış sayfalar en geç 1 saatte bir arka planda yenilenir.
export const revalidate = 3600;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const whatsappSettings = await getWhatsAppSettings();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton
        phoneNumber={whatsappSettings.number}
        message={whatsappSettings.message}
      />
    </div>
  );
}
