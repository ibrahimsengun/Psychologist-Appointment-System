'use client';

import { useEffect } from 'react';

// Aynı tarayıcı oturumunda bir yazıyı yalnızca bir kez sayar.
// Adminden açılan önizlemeler ve otomasyon araçları sayılmaz.
export function BlogViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (navigator.webdriver || document.referrer.includes('/admin')) return;

    const key = `blog-viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // sessionStorage kapalıysa yine de sayılır
    }

    fetch('/api/blog-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
      keepalive: true
    }).catch(() => {});
  }, [slug]);

  return null;
}
