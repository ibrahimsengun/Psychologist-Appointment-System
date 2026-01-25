'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { CalendarDays, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        {/* Ana Header */}
        <div className="flex h-18 items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="hidden sm:block">
              <p className="font-semibold text-foreground leading-tight">Uzm. Psk. Lokman Yılmaz</p>
              <p className="text-xs text-muted-foreground">Psikolog & Aile Danışmanı</p>
            </div>
            <p className="sm:hidden font-semibold text-foreground">Uzm. Psk. Lokman Yılmaz</p>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/#hakkimda"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
            >
              Hakkımda
            </Link>
            <Link
              href="/#hizmetler"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
            >
              Hizmetler
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
            >
              Blog
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                İletişim
              </Link>
            </Button>
            <Button asChild size="sm" className="rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              <Link href="/appointment">
                <CalendarDays className="mr-2 h-4 w-4" />
                Randevu Al
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menü</span>
          </Button>
        </div>

        {/* Collapsible Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-border/50">
            <Link
              href="/"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/#hakkimda"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Hakkımda
            </Link>
            <Link
              href="/#hizmetler"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Hizmetler
            </Link>
            <Link
              href="/blog"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>

            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border/50">
              <Button asChild variant="outline" className="w-full justify-center rounded-xl">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Phone className="mr-2 h-4 w-4" />
                  İletişim
                </Link>
              </Button>
              <Button asChild className="w-full justify-center rounded-xl shadow-lg shadow-primary/25">
                <Link href="/appointment" onClick={() => setIsOpen(false)}>
                  <CalendarDays className="ml-auto h-4 w-4 opacity-50" aria-hidden="true" />
                  Randevu Al
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
