import { isAllowedBeacon } from '@/lib/beacon-guard';
import { createPublicClient } from '@/utils/supabase/public';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_SOURCES = new Set([
  'hero',
  'header',
  'header_mobile',
  'footer',
  'contact_section',
  'cta_section',
  'landing_hero',
  'landing_cta',
  'test_result',
  'sss',
  'floating_button'
]);

// WhatsApp butonu sayacı: gün ve buton başına toplam tutulur, kişisel veri saklanmaz.
export async function POST(request: NextRequest) {
  if (!isAllowedBeacon(request)) {
    return new NextResponse(null, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const source = body?.source;
  if (typeof source !== 'string' || !ALLOWED_SOURCES.has(source)) {
    return new NextResponse(null, { status: 400 });
  }

  const { error } = await createPublicClient().rpc('record_whatsapp_click', { p_source: source });
  if (error) {
    console.error('WhatsApp tıklaması kaydedilemedi:', error.message);
  }

  return new NextResponse(null, { status: 204 });
}
