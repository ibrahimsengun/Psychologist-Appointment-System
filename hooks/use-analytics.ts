'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { trackEvent, type AnalyticsEvent, type EventSource } from '@/lib/analytics';

/**
 * GA4 event tracking hook'u.
 * Client component'lerde kullanılır.
 * Otomatik olarak mevcut sayfa yolunu ekler.
 */
export function useAnalytics() {
  const pathname = usePathname();

  const track = useCallback(
    (eventName: AnalyticsEvent, source: EventSource, extraParams?: Record<string, string | number | boolean>) => {
      trackEvent(eventName, {
        source,
        page: pathname,
        ...extraParams,
      });
    },
    [pathname]
  );

  const trackAppointmentClick = useCallback(
    (source: EventSource) => track('click_appointment', source),
    [track]
  );

  const trackPhoneClick = useCallback(
    (source: EventSource) => track('click_phone', source),
    [track]
  );

  const trackWhatsAppClick = useCallback(
    (source: EventSource) => track('click_whatsapp', source),
    [track]
  );

  const trackEmailClick = useCallback(
    (source: EventSource) => track('click_email', source),
    [track]
  );

  const trackContactClick = useCallback(
    (source: EventSource) => track('click_contact', source),
    [track]
  );

  const trackInstagramClick = useCallback(
    (source: EventSource) => track('click_instagram', source),
    [track]
  );

  const trackTestCompleted = useCallback(
    (testName: string, score: number, resultLabel: string) => {
      trackEvent('test_completed', {
        page: pathname,
        test_name: testName,
        score,
        result_label: resultLabel,
      });
    },
    [pathname]
  );

  return {
    track,
    trackAppointmentClick,
    trackPhoneClick,
    trackWhatsAppClick,
    trackEmailClick,
    trackContactClick,
    trackInstagramClick,
    trackTestCompleted,
  };
}
