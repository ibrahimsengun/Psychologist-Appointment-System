import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/inter/wght-italic.css';
import { Toaster } from 'sonner';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GoogleAnalytics } from '@/components/google-analytics';
import type { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { buildPersonSchema, JsonLd, SITE_URL, PERSON_NAME } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Samsun Psikolog | Uzman Psk. Lokman Yılmaz | Atakum Aile Danışmanı',
  description:
    'Samsun Psikolog tavsiyesi arayanlar için uzman psikolojik destek. Uzman Psk. Lokman Yılmaz ile Atakum, İlkadım ve Canik bölgelerinde yüz yüze ve online danışmanlık hizmetleri.',
  keywords:
    'samsun psikolog, atakum psikolog, samsun aile danışmanı, psikolog lokman yılmaz, atakum aile danışmanı, online danışmanlık, ilkadım psikolog, canik psikolog, samsun çocuk psikoloğu, atakum çocuk psikoloğu, çocuk psikolojik danışmanlık, samsun evlilik danışmanı',
  authors: [{ name: PERSON_NAME }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  openGraph: {
    title: `Uzman Psk. ${PERSON_NAME} - Aile Danışmanı`,
    description: 'Psikolojik sağlığınız için profesyonel destek',
    url: SITE_URL,
    siteName: `Uzman Psk. ${PERSON_NAME} - Aile Danışmanı`,
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Uzman Psikolog ${PERSON_NAME} - Samsun Aile Danışmanı`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `Uzman Psk. ${PERSON_NAME} - Aile Danışmanı`,
    description: 'Psikolojik sağlığınız için profesyonel destek',
    images: [`${SITE_URL}/og-image.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = buildPersonSchema({
    description: `Uzman Psk. ${PERSON_NAME} - Aile Danışmanı. Psikolojik sağlığınız için profesyonel destek.`,
  });

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <JsonLd data={personSchema} />
        <meta name="apple-mobile-web-app-title" content="Psk. Lokman Yılmaz" />
      </head>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        >
          Ana içeriğe geç
        </a>
        <GoogleAnalytics />
        <SpeedInsights />
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
