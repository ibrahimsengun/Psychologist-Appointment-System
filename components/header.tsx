'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: 'Anasayfa', url: '/' },
    { name: 'Hakkımda', url: '/about' },
    { name: 'Blog', url: '/blog' },
    { name: 'Randevu', url: '/appointment' },
    { name: 'İletişim', url: '/contact' }
  ];
  return pathname.includes('/admin') ? (
    <></>
  ) : (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold">Lokman Yılmaz - Klinik Psikolog</div>
        <nav>
          <ul className="flex space-x-6">
            {links.map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
