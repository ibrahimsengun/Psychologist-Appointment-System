/**
 * GA4 Analytics Event Tracking
 *
 * Merkezi event tracking fonksiyonları.
 * Tüm GA4 event'leri bu dosya üzerinden yönetilir.
 */

export type AnalyticsEvent =
  | 'click_appointment'
  | 'click_phone'
  | 'click_whatsapp'
  | 'click_email'
  | 'click_contact'
  | 'click_instagram'
  | 'generate_lead';

export type LeadForm = 'appointment' | 'contact' | 'question';

export type EventSource =
  | 'hero'
  | 'header'
  | 'header_mobile'
  | 'footer'
  | 'contact_section'
  | 'cta_section'
  | 'landing_hero'
  | 'landing_cta'
  | 'sss'
  | 'floating_button';

interface EventParams {
  source?: EventSource;
  page?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Admin panelindeki WhatsApp sayacı. GA'dan bağımsızdır (reklam engelleyicide de çalışır).
 * Aynı tarayıcı oturumunda bir kez sayılır; böylece sayı yaklaşık kişi sayısını gösterir.
 */
function recordWhatsAppClick(source: EventSource) {
  if (typeof window === 'undefined' || navigator.webdriver) return;

  const key = 'whatsapp-clicked';
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch {
    // sessionStorage kapalıysa yine de sayılır
  }

  fetch('/api/whatsapp-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source }),
    keepalive: true
  }).catch(() => {});
}

/**
 * GA4'e event gönderir.
 * gtag yüklü değilse sessizce atlar (SSR, ad-blocker vb.).
 */
export function trackEvent(eventName: AnalyticsEvent, params?: EventParams) {
  if (eventName === 'click_whatsapp' && params?.source) {
    recordWhatsAppClick(params.source);
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      page_path: window.location.pathname,
    });
  }
}
