'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { name: 'Anasayfa', url: '/' },
  //{ name: 'Hakkımda', url: '/about' },
  { name: 'Blog', url: '/blog' },
  { name: 'Randevu', url: '/appointment' },
  { name: 'İletişim', url: '/contact' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-lg md:text-xl font-semibold">
            Lokman Yılmaz
            <span className="hidden md:inline"> - Klinik Psikolog</span>
          </Link>

          {/* Masaüstü Menü */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {links.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className={`transition duration-150 ease-in-out ${
                      isActive(item.url)
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobil Menü */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menü</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {links.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className={`px-2 py-1 rounded-md transition duration-150 ease-in-out ${
                      isActive(item.url)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
