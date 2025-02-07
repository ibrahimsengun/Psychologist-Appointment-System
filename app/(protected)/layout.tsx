import { BookText, Calendar, Mail, Users } from 'lucide-react';
import Link from 'next/link';

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto py-4">
          <nav className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold hover:text-primary"
            >
              <Calendar className="w-5 h-5" />
              Randevular
            </Link>
            <Link
              href="/admin/available-times"
              className="flex items-center gap-2 text-lg font-semibold hover:text-primary"
            >
              <Users className="w-5 h-5" />
              Müsait Zamanlar
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 text-lg font-semibold hover:text-primary"
            >
              <BookText className="w-5 h-5" />
              Blog Yazıları
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center gap-2 text-lg font-semibold hover:text-primary"
            >
              <Mail className="w-5 h-5" />
              İletişim Mesajları
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
