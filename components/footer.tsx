'use client';

import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Dekoratif Arka Plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6">

          {/* Logo ve Açıklama */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div>
                <p className="font-semibold text-background leading-tight">Uzm. Psk. Lokman Yılmaz</p>
                <p className="text-xs text-background/60">Psikolog & Aile Danışmanı</p>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Bilimsel temelli yaklaşımlarla güvenli, empatik ve gizliliğe dayalı profesyonel psikolojik destek.
            </p>
            {/* Sosyal Medya */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/psikologlokmanyilmaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:psk.lokmanylmz@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
                aria-label="E-posta"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+905448322091"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"
                aria-label="Telefon"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-background font-semibold text-lg mb-6 flex items-center gap-2">
              Hızlı Linkler
            </h3>
            <div className="space-y-3">
              <Link href="/" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                Ana Sayfa
              </Link>
              <Link href="/#hakkimda" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                Hakkımda
              </Link>
              <Link href="/#hizmetler" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                Hizmetler
              </Link>
              <Link href="/blog" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                Blog
              </Link>
              <Link href="/sss" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                SSS
              </Link>
              <Link href="/appointment" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                Randevu Al
              </Link>
            </div>
          </div>

          {/* Hizmet Bölgeleri */}
          <div>
            <h3 className="text-background font-semibold text-lg mb-6 flex items-center gap-2">
              Hizmet Bölgeleri
            </h3>
            <div className="space-y-3">
              <Link href="/samsun-psikolog" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                Samsun Psikolog
              </Link>
              <Link href="/atakum-psikolog" className="block text-background/70 hover:text-background hover:translate-x-1 transition-all duration-300">
                Atakum Psikolog
              </Link>
              <div className="pt-2 border-t border-background/10">
                <p className="text-background/50 text-sm">
                  İlkadım, Canik, Bafra ve tüm Samsun ilçeleri
                </p>
              </div>
            </div>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-background font-semibold text-lg mb-6 flex items-center gap-2">
              İletişim
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                  <MapPin className="h-5 w-5 text-white group-hover:text-gray-900 transition-colors" />
                </div>
                <div>
                  <p className="text-white/90 font-medium">Psikodemy</p>
                  <p className="text-white/60 text-sm">Atakum, Samsun</p>
                </div>
              </div>
              <a href="tel:+905448322091" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                  <Phone className="h-5 w-5 text-white group-hover:text-gray-900 transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors">
                  +90 (544) 832 20 91
                </span>
              </a>
              <a href="mailto:psk.lokmanylmz@gmail.com" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                  <Mail className="h-5 w-5 text-white group-hover:text-gray-900 transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors text-sm">
                  psk.lokmanylmz@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <h3 className="text-background font-semibold text-lg mb-6 flex items-center gap-2">
              Çalışma Saatleri
            </h3>
            <div className="space-y-4">
              <div className="bg-background/5 rounded-2xl p-4 border border-background/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-background/70 text-sm">Her Gün</span>
                  <span className="text-background font-semibold">10:00 - 21:00</span>
                </div>
                <p className="text-background/50 text-xs">
                  Yüz yüze ve online görüşme
                </p>
              </div>
              <div className="bg-primary/20 rounded-2xl p-4">
                <p className="text-sm text-background/90 font-medium mb-2">Online Danışmanlık</p>
                <p className="text-background/60 text-xs">
                  Türkiye'nin her yerinden güvenli görüntülü görüşme
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Alt Kısım */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Uzm. Psk. Lokman Yılmaz. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-background/50 hover:text-background transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="text-background/50 hover:text-background transition-colors">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
