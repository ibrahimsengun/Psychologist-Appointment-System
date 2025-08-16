'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { CalendarDays, Menu, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          Uzman Psk. Lokman Yılmaz
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Ana Sayfa
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                İletişime Geç
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/appointment">
                <CalendarDays className="mr-2 h-4 w-4" />
                Randevu Al
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menü</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Uzman Psk. Lokman Yılmaz</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <Link href="/" className="text-lg font-medium hover:text-primary">
                Ana Sayfa
              </Link>
              <Link href="/blog" className="text-lg font-medium hover:text-primary">
                Blog
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Button asChild variant="outline">
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    İletişime Geç
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/appointment">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Randevu Al
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
