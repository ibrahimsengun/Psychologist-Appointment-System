import { createPublicClient } from '@/utils/supabase/public';
import { NextRequest, NextResponse } from 'next/server';

const BOT_USER_AGENT =
  /bot|crawl|spider|slurp|lighthouse|headless|facebookexternalhit|embedly|curl|wget|python|java\/|axios|node-fetch/i;
const VALID_SLUG = /^[a-z0-9-]{1,200}$/;

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

// Blog okunma sayacı. Sayfalar statik kalsın diye okunma, sayfa açıldıktan sonra
// tarayıcıdan gelen bu istekle sayılır.
export async function POST(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';
  if (!userAgent || BOT_USER_AGENT.test(userAgent) || !isSameOrigin(request)) {
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
