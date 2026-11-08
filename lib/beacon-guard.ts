import { NextRequest } from 'next/server';

const BOT_USER_AGENT =
  /bot|crawl|spider|slurp|lighthouse|headless|facebookexternalhit|embedly|curl|wget|python|java\/|axios|node-fetch/i;

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

/** Sayaç isteklerinde botları ve başka sitelerden gelen istekleri eler. */
export function isAllowedBeacon(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';
  return Boolean(userAgent) && !BOT_USER_AGENT.test(userAgent) && isSameOrigin(request);
}
