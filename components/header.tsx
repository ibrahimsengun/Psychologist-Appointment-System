'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';
import { getAdminEmail } from '@/actions/auth-actions';

const NAV_LINKS = [
  { href: '/hakkimda', label: 'Hakkımda', title: 'Hakkımda Detaylı Bilgi' },
  { href: '/hizmetler', label: 'Hizmetler', title: 'Verilen Psikolojik Danışmanlık Hizmetleri' },
  { href: '/blog', label: 'Blog', title: 'Psikoloji Blog Yazıları ve Makaleler' },
  { href: '/galeri', label: 'Galeri', title: 'Fotoğraf Galerisi' },
  { href: '/soru-sor', label: 'Soru Sor', title: 'Psikoloğa Anonim Soru Sorun' },
  { href: '/contact', label: 'İletişim', title: 'İletişim Bilgileri ve Formu' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const isAdmin = !!adminEmail;

  // Admin şeridi istemcide yüklenir; böylece public sayfalar statik kalır.
  // Supabase oturum çerezi yoksa (normal ziyaretçi) sunucuya hiç istek atılmaz.
  useEffect(() => {
    if (!/(?:^|;\s*)sb-[^=]+-auth-token/.test(document.cookie)) return;
    getAdminEmail().then(setAdminEmail).catch(() => {});
  }, []);
  const { trackAppointmentClick, trackContactClick, trackPhoneClick } = useAnalytics();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-foreground/10">
      {isAdmin && (
        <div className="bg-foreground text-background">
          <div className="container flex items-center justify-between py-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-medium">Admin Modu</span>
              <span className="opacity-60 hidden sm:inline">— {adminEmail}</span>
            </div>
            <Link href="/admin" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Panele Git →
            </Link>
          </div>
        </div>
      )}
      <div className="container">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" title="Ana Sayfaya Dön" className="flex flex-col leading-none">
            <span className="font-heading text-xl lg:text-2xl text-foreground">Lokman Yılmaz</span>
            <span className="mt-1 text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Uzm. Psikolog &amp; Aile Danışmanı
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={link.title}
                onClick={link.href === '/contact' ? () => trackContactClick('header') : undefined}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+905448322091"
              title="Bizi Arayın"
              onClick={() => trackPhoneClick('header')}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors tabular-nums"
            >
              0544 832 20 91
            </a>
            <Link
              href="/appointment"
              title="Online veya Yüz Yüze Randevu Al"
              onClick={() => trackAppointmentClick('header')}
              className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-primary transition-colors"
            >
              Randevu Al
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden -mr-2 p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menü</span>
          </button>
        </div>

        {/* Collapsible Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[32rem] pb-6' : 'max-h-0'}`}
        >
          <nav className="flex flex-col border-t border-foreground/10">
            {[{ href: '/', label: 'Ana Sayfa', title: 'Ana Sayfa' }, ...NAV_LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={link.title}
                className="font-heading text-2xl py-3 border-b border-foreground/10 text-foreground"
                onClick={() => {
                  if (link.href === '/contact') trackContactClick('header_mobile');
                  setIsOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/appointment"
              title="Online veya Yüz Yüze Randevu Al"
              onClick={() => {
                trackAppointmentClick('header_mobile');
                setIsOpen(false);
              }}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3.5 font-medium"
            >
              Randevu Al
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
