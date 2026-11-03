'use client';

import { useState } from 'react';

interface LiteYouTubeProps {
  videoId: string;
  title: string;
}

// YouTube iframe'i tıklanana kadar yüklenmez; önce sadece kapak görseli gösterilir.
// Her iframe ~1MB JS indirdiği için sayfa açılışını ciddi şekilde hızlandırır.
export function LiteYouTube({ videoId, title }: LiteYouTubeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`${title} videosunu oynat`}
      className="group/play absolute inset-0 w-full h-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute inset-0 bg-black/20 group-hover/play:bg-black/30 transition-colors" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-background/90 shadow-lg group-hover/play:scale-110 transition-transform">
        <svg className="w-7 h-7 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
