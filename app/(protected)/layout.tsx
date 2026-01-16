'use client';

import { BookText, Briefcase, Calendar, Home, LogOut, Mail, Menu, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from '@/actions/auth-actions';

const adminLinks = [
  { name: 'Randevular', url: '/admin', icon: Calendar },
  { name: 'Müsait Zamanlar', url: '/admin/available-times', icon: Users },
  { name: 'Blog Yazıları', url: '/admin/blog', icon: BookText },
  { name: 'İletişim Mesajları', url: '/admin/messages', icon: Mail },
  { name: 'Hizmetler', url: '/admin/services', icon: Briefcase }
];

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo / Branding */}
            <Link href="/admin" className="flex items-center gap-3 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                L
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-foreground text-sm leading-tight">Admin Panel</p>
                <p className="text-xs text-muted-foreground">Lokman Yılmaz</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-xl p-1">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.url);
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${active
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex text-muted-foreground hover:text-foreground gap-2"
                asChild
              >
                <Link href="/" target="_blank">
                  <Home className="w-4 h-4" />
                  <span className="hidden lg:inline">Siteyi Görüntüle</span>
                </Link>
              </Button>
              <form action="/api/auth/signout" method="POST">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive gap-2"
                  formAction={signOut}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Çıkış</span>
                </Button>
              </form>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menü</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <SheetHeader className="p-6 border-b bg-muted/30">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                        L
                      </div>
                      <div>
                        <p className="font-semibold text-left">Admin Panel</p>
                        <p className="text-xs text-muted-foreground font-normal text-left">Lokman Yılmaz</p>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 p-4">
                    {adminLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.url);
                      return (
                        <Link
                          key={link.url}
                          href={link.url}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                        >
                          <Icon className="w-5 h-5" />
                          {link.name}
                        </Link>
                      );
                    })}
                    <div className="border-t my-2" />
                    <Link
                      href="/"
                      target="_blank"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    >
                      <Home className="w-5 h-5" />
                      Siteyi Görüntüle
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}

