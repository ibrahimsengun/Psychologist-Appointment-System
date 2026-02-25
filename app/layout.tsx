import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GoogleAnalytics } from '@/components/google-analytics';
import type { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Samsun Psikolog | Uzman Psk. Lokman Yılmaz | Atakum Aile Danışmanı',
  description:
    'Samsun\'da uzman psikolog ve aile danışmanı Lokman Yılmaz ile psikolojik destek alın. Atakum, İlkadım, Canik bölgelerinde yüz yüze ve online görüşme hizmetleri.',
  keywords:
    'samsun psikolog, atakum psikolog, samsun aile danışmanı, psikolog lokman yılmaz, atakum aile danışmanı, online danışmanlık, ilkadım psikolog, canik psikolog',
  authors: [{ name: 'Lokman Yılmaz' }],
  creator: 'Lokman Yılmaz',
  publisher: 'Lokman Yılmaz',
  alternates: {
    canonical: 'https://lokmanyilmaz.com.tr'
  },
  openGraph: {
    title: 'Uzman Psk. Lokman Yılmaz - Aile Danışmanı',
    description: 'Psikolojik sağlığınız için profesyonel destek',
    url: 'https://lokmanyilmaz.com.tr',
    siteName: 'Uzman Psk. Lokman Yılmaz - Aile Danışmanı',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: 'https://lokmanyilmaz.com.tr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uzman Psikolog Lokman Yılmaz - Samsun Aile Danışmanı'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uzman Psk. Lokman Yılmaz - Aile Danışmanı',
    description: 'Psikolojik sağlığınız için profesyonel destek',
    images: ['https://lokmanyilmaz.com.tr/og-image.png']
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

const geistSans = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  preload: true
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lokman Yılmaz',
    jobTitle: 'Aile Danışmanı',
    description:
      'Uzman Psk. Lokman Yılmaz - Aile Danışmanı. Psikolojik sağlığınız için profesyonel destek.',
    url: 'https://lokmanyilmaz.com.tr',
    sameAs: []
  };

  return (
    <html lang="tr" className={geistSans.className} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
