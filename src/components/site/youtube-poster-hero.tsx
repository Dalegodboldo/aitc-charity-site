"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";

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
 * Click-to-play YouTube hero. Shows a custom poster image with a small
 * play-icon badge tucked into the top-left corner. On click the video
 * pops into a centred modal with a roomy 16:9 iframe — much bigger than
 * the card's hero slot, but not fullscreen. Close X / Esc / backdrop
 * click dismiss the modal and unmount the iframe so the video stops.
 *
 * Designed to live inside a parent that may itself be a link or button.
 * The play button stops click propagation so the surrounding element
 * doesn't fire its own action when the visitor just wants to play.
 */
export function YouTubePosterHero({
  videoId,
  title,
  posterSrc,
  posterAlt,
  posterSizes,
  posterObjectPosition,
}: Props) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  const handlePlayClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePlayClick}
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
        {/* Play icon — small circular badge tucked into the top-left so
            it never covers the subject's face. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-3"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-ink shadow-soft backdrop-blur-sm transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-cream motion-reduce:transition-none motion-reduce:group-hover/play:scale-100">
            <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden />
          </span>
        </span>
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          >
            <div
              aria-hidden
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-in fade-in duration-300 motion-reduce:animate-none motion-reduce:duration-0"
            />
            <div className="relative w-full max-w-4xl animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none motion-reduce:duration-0">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute -right-2 -top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:-right-4 sm:-top-4"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-ink shadow-soft">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0 bg-ink"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
