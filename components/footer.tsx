'use client';

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary text-white" />
                <p>Atakum, Samsun, Türkiye</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary text-white" />
                <p>+90 (555) 123 45 67</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary text-white" />
                <p>info@lokmanyilmaz.com</p>
              </div>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Hızlı Linkler</h3>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-white transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/blog" className="block hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="block hover:text-white transition-colors">
                İletişim
              </Link>
              <Link href="/appointment" className="block hover:text-white transition-colors">
                Randevu Al
              </Link>
            </div>
          </div>

          {/* Sosyal Medya ve Çalışma Saatleri */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Çalışma Saatleri</h3>
            <div className="space-y-2 mb-6">
              <p>Pazartesi - Cuma: 09:00 - 18:00</p>
              <p>Cumartesi: 09:00 - 14:00</p>
              <p>Pazar: Kapalı</p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Uzman Psk. Lokman Yılmaz. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
