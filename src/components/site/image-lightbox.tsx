"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  /** Natural width — passed through to next/image's intrinsic sizing. */
  width: number;
  /** Natural height. */
  height: number;
  /** next/image `sizes` attribute for the inline (un-zoomed) image. */
  sizes?: string;
  /** Extra classes for the thumbnail wrapper (e.g. rounded corners, shadow). */
  wrapperClassName?: string;
  /** Extra classes for the inline <Image> itself. */
  imgClassName?: string;
  /** Render a child overlay on top of the thumbnail (e.g. logo marks). */
  children?: React.ReactNode;
  /** When true, treats the asset as a fixed-aspect static — uses its intrinsic
   *  dimensions instead of next/image optimization. Defaults to false. */
  unoptimized?: boolean;
};

/**
 * Wraps an image in a click-to-expand affordance. Click → fullscreen
 * overlay with the same image rendered uncropped on a dark backdrop.
 * Click anywhere on the backdrop, hit Esc, or click the close X to
 * dismiss.
 */
export function ImageLightbox({
  src,
  alt,
  width,
  height,
  sizes,
  wrapperClassName,
  imgClassName,
  children,
  unoptimized,
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full-size: ${alt || "image"}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden ${wrapperClassName ?? ""}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          unoptimized={unoptimized}
          className={`block h-auto w-full ${imgClassName ?? ""}`}
        />
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 shadow-soft-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Image preview"}
          className="fixed inset-0 z-[75] flex items-center justify-center p-4 sm:p-8"
        >
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-in fade-in duration-300 motion-reduce:animate-none motion-reduce:duration-0"
          />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div className="relative z-0 max-h-full max-w-full animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none motion-reduce:duration-0">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(min-width: 1024px) 90vw, 100vw"
              unoptimized={unoptimized}
              priority
              className="block max-h-[90svh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
