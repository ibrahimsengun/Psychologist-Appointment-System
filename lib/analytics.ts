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
  | 'test_completed';

export type EventSource =
  | 'hero'
  | 'header'
  | 'header_mobile'
  | 'footer'
  | 'contact_section'
  | 'cta_section'
  | 'landing_hero'
  | 'landing_cta'
  | 'test_result'
  | 'sss';

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
 * GA4'e event gönderir.
 * gtag yüklü değilse sessizce atlar (SSR, ad-blocker vb.).
 */
export function trackEvent(eventName: AnalyticsEvent, params?: EventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      page_path: window.location.pathname,
    });
  }
}
