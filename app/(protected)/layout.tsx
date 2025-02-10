'use client';

import { BookText, Calendar, LogOut, Mail, Menu, Users } from 'lucide-react';
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
  { name: 'İletişim Mesajları', url: '/admin/messages', icon: Mail }
];

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto py-4">
          {/* Masaüstü Menü */}
          <div className="flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-6">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    className={`flex items-center gap-2 text-lg font-semibold transition-colors ${
                      isActive(link.url)
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="ml-auto flex items-center">
              <form action="/api/auth/signout" method="POST">
                <Button variant="outline" size="sm" className="gap-2" formAction={signOut}>
                  <LogOut className="w-4 h-4" />
                  Çıkış Yap
                </Button>
              </form>
            </div>
          </div>

          {/* Mobil Menü */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menü</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Admin Paneli</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.url}
                        href={link.url}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                          isActive(link.url)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="ml-4 font-semibold">Admin Paneli</div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
