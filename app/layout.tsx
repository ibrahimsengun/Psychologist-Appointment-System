import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { Metadata } from 'next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Uzman Psk. Lokman Yılmaz - Aile Danışmanı',
  description: 'Psikolojik sağlığınız için profesyonel destek',
  keywords: 'aile danışmanı, psikoloji, terapi, danışmanlık, lokman yılmaz, samsun',
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
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uzman Psk. Lokman Yılmaz - Aile Danışmanı',
    description: 'Psikolojik sağlığınız için profesyonel destek'
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
