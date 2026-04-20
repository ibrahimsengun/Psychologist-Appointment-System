'use client';

import Link from 'next/link';
import { type ComponentProps, type MouseEvent } from 'react';
import { trackEvent, type AnalyticsEvent, type EventSource } from '@/lib/analytics';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  eventSource: EventSource;
};

/**
 * Analytics event tracking özellikli Next.js Link.
 * Server component'lerde kullanılabilir (client component olarak import edilir).
 */
export function TrackedLink({
  event,
  eventSource,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, { source: eventSource });
    if (onClick) onClick(e);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
