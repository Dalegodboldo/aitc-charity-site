"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  /** YouTube video ID (the part after v= or in /embed/). */
  videoId: string;
  /** Accessible title used by the iframe and play button. */
  title: string;
  /** Poster image (shown until visitor presses play). */
  posterSrc: string;
  posterAlt: string;
  /** Optional small label rendered under the play button. Omit for a clean poster. */
  ctaLabel?: string;
};

/**
 * Click-to-play YouTube embed. Matches the visual pattern of HeroVideo
 * but uses the privacy-respecting youtube-nocookie host. The iframe
 * isn't loaded until the visitor opts in.
 */
export function YouTubeEmbed({
  videoId,
  title,
  posterSrc,
  posterAlt,
  ctaLabel,
}: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/[0.04]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title}
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/45 via-ink/15 to-transparent"
          />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex items-center justify-center outline-none transition-colors focus-visible:bg-ink/20"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream/95 text-ink shadow-soft transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105">
              <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden />
            </span>
            {ctaLabel && (
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                {ctaLabel}
              </span>
            )}
          </button>
        </>
      )}
    </div>
  );
}
