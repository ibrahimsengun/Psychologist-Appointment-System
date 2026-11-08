import { isAllowedBeacon } from '@/lib/beacon-guard';
import { createPublicClient } from '@/utils/supabase/public';
import { NextRequest, NextResponse } from 'next/server';

const VALID_SLUG = /^[a-z0-9-]{1,200}$/;

// Blog okunma sayacı. Sayfalar statik kalsın diye okunma, sayfa açıldıktan sonra
// tarayıcıdan gelen bu istekle sayılır.
export async function POST(request: NextRequest) {
  if (!isAllowedBeacon(request)) {
    return new NextResponse(null, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const slug = body?.slug;
  if (typeof slug !== 'string' || !VALID_SLUG.test(slug)) {
    return new NextResponse(null, { status: 400 });
  }

  const { error } = await createPublicClient().rpc('increment_blog_post_view', { p_slug: slug });
  if (error) {
    console.error('Blog okunma sayısı artırılamadı:', error.message);
  }

  return new NextResponse(null, { status: 204 });
}
