'use client';

import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { trackEvent, type AnalyticsEvent, type EventSource } from '@/lib/analytics';

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: AnalyticsEvent;
  eventSource: EventSource;
  children: ReactNode;
}

/**
 * Analytics event tracking özellikli <a> etiketi.
 * tel:, mailto: ve harici linkler için kullanılır.
 * Server component'lerde kullanılabilir (client component olarak import edilir).
 */
export function TrackedAnchor({
  event,
  eventSource,
  onClick,
  children,
  ...props
}: TrackedAnchorProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, { source: eventSource });
    if (onClick) onClick(e);
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
