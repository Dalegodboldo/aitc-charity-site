"use client";

/**
 * Photo Gallery grid + lightbox. Each thumbnail expands on click
 * into a full-screen lightbox view with a download button. Keyboard:
 * Esc closes, ←/→ paginates between photos.
 *
 * The lightbox renders via createPortal into <body> so it sits above
 * the site header/sub-nav regardless of where the grid lives in the
 * page tree — matching the pattern used in campaign-modal.tsx.
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Download, X } from "lucide-react";

type Props = { photos: string[] };

/** How many photos to render in the initial batch and per
 *  "Load more" click. Tuned to ~10 rows of a 4-col desktop grid
 *  — enough to fill the visible area without thousands of image
 *  optimization requests piling up on first paint. */
const PAGE_SIZE = 40;

export function GalleryGrid({ photos }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(PAGE_SIZE, photos.length),
  );
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  const visiblePhotos = photos.slice(0, visibleCount);
  const remaining = photos.length - visibleCount;
  const loadMore = () =>
    setVisibleCount((n) => Math.min(n + PAGE_SIZE, photos.length));

  const open = activeIdx !== null;
  const activePhoto = open ? photos[activeIdx as number] : null;

  const close = useCallback(() => setActiveIdx(null), []);
  const goPrev = useCallback(() => {
    setActiveIdx((idx) =>
      idx === null || idx <= 0 ? idx : idx - 1,
    );
  }, []);
  const goNext = useCallback(() => {
    setActiveIdx((idx) =>
      idx === null || idx >= photos.length - 1 ? idx : idx + 1,
    );
  }, [photos.length]);

  // Focus the close button on open; restore focus to the launching
  // thumbnail on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();
    return () => {
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  // Esc / arrow-key handling.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, goPrev, goNext]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visiblePhotos.map((filename, i) => (
          <li
            key={filename}
            className="relative aspect-square overflow-hidden rounded-xl bg-cream"
          >
            <button
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`View photo ${i + 1} of ${photos.length}`}
              className="group absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              <Image
                src={`/images/gallery/${filename}`}
                alt=""
                fill
                // Tight sizes hint — desktop grid maxes around 250px
                // per tile, so we don't need the optimizer to generate
                // anything wider than that.
                sizes="(min-width: 1024px) 250px, (min-width: 640px) 33vw, 50vw"
                // quality=60 is visually identical at thumbnail size
                // but ~30% fewer bytes than the default 75.
                quality={60}
                // First row loads eagerly so the gallery doesn't pop
                // in below the fold during initial paint.
                priority={i < 4}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* "Load more" pager — instead of rendering all 200+ tiles up
          front (which triggers a flood of image-optimization requests
          on first paint), we render PAGE_SIZE at a time and let the
          visitor pull the next batch on demand. */}
      {remaining > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-warm-gray">
            Showing {visibleCount} of {photos.length}
          </p>
          <button
            type="button"
            onClick={loadMore}
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-base font-semibold text-cream transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            Load {Math.min(PAGE_SIZE, remaining)} more
          </button>
        </div>
      )}

      {open &&
        activePhoto &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 motion-reduce:animate-none"
            onClick={close}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
            />

            {/* Top-right controls: Download then Close */}
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
              <a
                href={`/images/gallery/${activePhoto}`}
                download={activePhoto}
                aria-label={`Download ${activePhoto}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/95 text-ink shadow-soft-sm transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                <Download className="h-5 w-5" aria-hidden />
              </a>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                aria-label="Close photo viewer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/95 text-ink shadow-soft-sm transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* Photo counter — bottom-left, only when there are 2+. */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-4 z-10 rounded-full bg-cream/95 px-3 py-1.5 text-[12px] font-semibold text-ink shadow-soft-sm">
                {(activeIdx as number) + 1} / {photos.length}
              </div>
            )}

            {/* Full-size image — using a plain <img> so the download
                attribute pulls the original asset (next/image rewrites
                src to an optimized variant, which would download with
                a generated filename). The click handler stops bubbling
                so clicking the photo itself doesn't dismiss the modal. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/gallery/${activePhoto}`}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88svh] max-w-full cursor-default rounded-xl object-contain shadow-soft animate-in zoom-in-95 duration-200 motion-reduce:animate-none"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
