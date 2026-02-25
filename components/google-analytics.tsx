'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export function GoogleAnalytics() {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const pathname = usePathname();

    // Don't render if no GA ID is set
    if (!gaId) {
        return null;
    }

    // Don't track admin pages
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/sign-in') || pathname?.startsWith('/reset-password')) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `
                }}
            />
        </>
    );
}
