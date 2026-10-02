import { updateSession } from '@/utils/supabase/middleware';
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Oturum kontrolü Supabase'e ağ isteği attığı için sadece admin ve giriş
  // sayfalarında çalışır; public sayfa geçişleri bu beklemeyi yaşamaz.
  matcher: ['/admin/:path*', '/sign-in']
};
