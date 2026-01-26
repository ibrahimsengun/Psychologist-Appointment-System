'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export function ClarityAnalytics() {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    const pathname = usePathname();

    // Don't render if no Clarity ID is set
    if (!clarityId) {
        return null;
    }

    // Don't track admin pages
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/sign-in') || pathname?.startsWith('/reset-password')) {
        return null;
    }

    return (
        <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `
            }}
        />
    );
}
