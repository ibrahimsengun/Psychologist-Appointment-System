import Footer from '@/components/footer';
import Header from '@/components/header';
import WhatsAppButton from '@/components/whatsapp-button';
import MobileCtaBar from '@/components/mobile-cta-bar';
import { getWhatsAppSettings } from '@/actions/settings-actions';

// Not: Burada cookies()/auth.getUser() çağrılmamalı. Aksi halde tüm public
// sayfalar her istekte sunucuda yeniden render edilir ve link tıklamalarında
// gecikme hissedilir. Admin şeridi Header içinde istemci tarafında yüklenir.
// Güvenlik ağı: önbelleğe alınmış sayfalar en geç 1 saatte bir arka planda yenilenir.
export const revalidate = 3600;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const whatsappSettings = await getWhatsAppSettings();

  return (
    <div className="public-site grid min-h-screen grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] pb-16 lg:pb-0">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton
        phoneNumber={whatsappSettings.number}
        message={whatsappSettings.message}
      />
      <MobileCtaBar
        phoneNumber={whatsappSettings.number}
        whatsappMessage={whatsappSettings.message}
      />
    </div>
  );
}
