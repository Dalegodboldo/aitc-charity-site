"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  vimeoId: string;
  title: string;
  posterSrc: string;
  posterAlt: string;
  /**
   * Optional decorative element pinned to the bottom-left of the tile
   * (e.g. a brand seal). It fades out once the visitor presses play.
   */
  seal?: React.ReactNode;
};

/**
 * Renders a 16:9 poster with a play button overlay; on click, swaps in
 * the Vimeo iframe with autoplay. The iframe isn't loaded until the
 * visitor opts in, so the page stays light and there's no auto-play.
 */
export function HeroVideo({ vimeoId, title, posterSrc, posterAlt, seal }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative">
      <div className="relative aspect-video overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/[0.04]">
        {playing ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
            allow="autoplay; fullscreen; picture-in-picture"
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
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
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
              className="group absolute inset-0 outline-none transition-colors focus-visible:bg-ink/20"
            >
              {/* Play badge — tucked into the upper-right so it doesn't
                  cover the subject's face in the poster. The whole
                  button still captures clicks across the hero area. */}
              <span className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream/95 text-ink shadow-soft transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105 sm:right-6 sm:top-6 sm:h-16 sm:w-16">
                <Play className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" aria-hidden />
              </span>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                Watch our story
              </span>
            </button>
          </>
        )}
      </div>
      {seal && (
        <div
          aria-hidden={playing}
          className={cn(
            "absolute -bottom-5 -left-5 hidden transition-[opacity,transform] duration-500 ease-out sm:block motion-reduce:transition-none",
            playing
              ? "pointer-events-none scale-95 opacity-0"
              : "scale-100 opacity-100"
          )}
        >
          {seal}
        </div>
      )}
    </div>
  );
}
