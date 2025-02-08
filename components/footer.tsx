'use client';

import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-9">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Lokman Yılmaz - Klinik Psikolog</h3>
            <p>Samsun İlkadım Psikoloji Merkezi</p>
            <p>Email: info@lokmanyilmaz.com</p>
            <p>Tel: +90 123 456 7890</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-400 transition duration-150 ease-in-out">
              <Facebook />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition duration-150 ease-in-out">
              <Instagram />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition duration-150 ease-in-out">
              <Twitter />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Lokman Yılmaz. Tüm Hakları Saklıdır.
        </div>
      </div>
    </footer>
  );
}
