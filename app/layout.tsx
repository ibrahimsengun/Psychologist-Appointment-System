import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Lokman Yılmaz - Klinik Psikolog',
  description: 'Psikolojik sağlığınız için profesyonel destek'
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
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
