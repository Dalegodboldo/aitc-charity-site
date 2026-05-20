"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { Play } from "lucide-react";

type Props = {
  videoId: string;
  /** Title used both for accessible labelling and the iframe title. */
  title: string;
  posterSrc: string;
  posterAlt: string;
  /** next/image `sizes` for the poster (matches the parent card's
   *  layout hints — e.g. "(min-width: 1024px) 270px, ..."). */
  posterSizes?: string;
  /** Tailwind `object-position` override for the poster crop. */
  posterObjectPosition?: string;
};

/**
 * Click-to-play YouTube hero. Initially shows a custom poster image with
 * a small play-icon overlay (no YouTube chrome). Clicking the play
 * button swaps to the actual YouTube iframe with autoplay=1.
 *
 * Designed to live inside a parent that's already a link — the play
 * button stops click propagation so the parent link doesn't navigate
 * when the user just wants to start the video.
 */
export function YouTubePosterHero({
  videoId,
  title,
  posterSrc,
  posterAlt,
  posterSizes,
  posterObjectPosition,
}: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0 bg-ink"
      />
    );
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setPlaying(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Play video: ${title}`}
      className="group/play absolute inset-0 block h-full w-full cursor-pointer overflow-hidden bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cream"
    >
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        sizes={posterSizes}
        style={
          posterObjectPosition
            ? { objectPosition: posterObjectPosition }
            : undefined
        }
        className="object-cover transition-transform duration-700 ease-out group-hover/play:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/play:scale-100"
      />
      {/* Play icon — small circular badge centered on the poster */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-ink shadow-soft backdrop-blur-sm transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-cream motion-reduce:transition-none motion-reduce:group-hover/play:scale-100">
          <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
        </span>
      </span>
    </button>
  );
}
