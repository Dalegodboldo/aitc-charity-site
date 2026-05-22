"use client";

/**
 * Student Spotlight modal — opened from the Mentorship card on the home
 * page. Compact, no-scroll layout: on desktop the video sits beside the
 * gallery + copy; on mobile it stacks but everything is sized to fit
 * within the panel without overflowing.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X, ZoomIn } from "lucide-react";

type Photo = { src: string; alt: string };

const VIDEO_SRC = "/images/yaffa-video-3.MP4";
const PHOTOS: Photo[] = [
  { src: "/images/yaffa-1.JPG", alt: "Yaffa Botier on stage with Yungblud" },
  { src: "/images/yaffa-2-2.jpg", alt: "Yaffa Botier performing live" },
  { src: "/images/yaffa-3.JPG", alt: "Yaffa Botier on tour" },
];
const LEARN_MORE_URL = "https://www.Learn-Grow-Thrive.org";

export function StudentSpotlightTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group animate-spotlight-glow mt-6 mb-6 inline-flex items-center gap-2 self-start rounded-full border border-red/30 bg-red/5 px-4 py-2 text-sm font-semibold text-red no-underline transition-colors hover:border-red hover:bg-red hover:text-cream"
      >
        <Sparkles
          className="h-4 w-4 text-red transition-colors group-hover:text-cream"
          aria-hidden
        />
        Student Spotlight: Yaffa Botier (Rock Guitarist)
      </button>
      <StudentSpotlightModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function StudentSpotlightModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  // Focus management while modal is open. (We deliberately do NOT lock
  // body scroll — the modal is fixed-position with a full backdrop, so
  // page scroll behind it is harmless, and locking body scroll has
  // historically broken touch scroll inside the modal on iOS.)
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();
    return () => {
      videoRef.current?.pause();
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  // Reset lightbox each time the modal closes
  useEffect(() => {
    if (!open) setLightbox(null);
  }, [open]);

  // Esc to close + Tab focus trap. If the lightbox is open, Esc closes
  // that first; otherwise it closes the whole modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (lightbox) setLightbox(null);
        else onClose();
        return;
      }
      if (lightbox) return; // don't trap focus while lightbox is open
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, lightbox]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-spotlight-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/65 p-4 backdrop-blur-sm"
      onClick={(e) => {
        // Click on backdrop (not panel) → close
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-cream shadow-soft"
      >
        {/* Title bar — title + Close. On mobile the title stacks onto
            two lines ("Student Spotlight:" / "Yaffa Botier") so the
            close button never clips the name; one line on sm+. */}
        <header className="flex items-center justify-between gap-4 border-b border-border bg-cream px-5 py-3 sm:px-7 sm:py-4">
          <h2
            id="student-spotlight-title"
            className="min-w-0 font-display text-lg font-medium leading-tight tracking-tight text-ink sm:text-xl"
          >
            <span className="flex items-center gap-2 text-gold sm:inline-flex">
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
              Student Spotlight:
            </span>{" "}
            <span className="block text-ink sm:inline">Yaffa Botier</span>
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close Student Spotlight"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-4 text-sm font-semibold text-cream no-underline shadow-soft-sm transition-colors hover:bg-red focus-visible:bg-red sm:h-11 sm:px-5"
          >
            <X className="h-4 w-4" aria-hidden />
            Close
          </button>
        </header>

        {/* Body —
              MOBILE (default): video → 3-thumb row → copy → links → credit
                                (unchanged from prior layout).
              DESKTOP (lg+): two featured items side-by-side at the top
                             (the video and PHOTO #1), then body copy on
                             the left and the two supporting thumbs
                             (#2 + #3) on the right beneath them.
              CSS grid placement (row-start / col-start) gives the
              desktop layout without disturbing mobile flow order. */}
        <div className="grid gap-5 p-5 sm:gap-6 sm:p-7 lg:grid-cols-[1.4fr_1fr] lg:gap-x-5">
          {/* Video — feature, desktop top-left */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink shadow-soft-sm">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="none"
              poster="/images/yaffa-1.JPG"
              className="h-full w-full bg-ink object-contain"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>

          {/* Featured photo #1 — desktop only, top-right, stretches to
              match the video's height via grid align-self: stretch */}
          <button
            type="button"
            onClick={() => setLightbox(PHOTOS[0])}
            aria-label={`Expand image: ${PHOTOS[0].alt}`}
            className="group relative hidden h-full w-full overflow-hidden rounded-xl bg-warm-white shadow-soft-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red lg:block"
          >
            <Image
              src={PHOTOS[0].src}
              alt={PHOTOS[0].alt}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/65 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <ZoomIn className="h-4 w-4" aria-hidden />
            </span>
          </button>

          {/* Thumbs — mobile shows all 3 in one row; desktop drops #1
              (it's the featured photo above) and shows #2 + #3 stacked
              on the right under the featured pair */}
          <ul className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:col-start-2 lg:row-start-2 lg:grid-cols-2 lg:self-start">
            {PHOTOS.map((p, idx) => (
              <li
                key={p.src}
                className={idx === 0 ? "lg:hidden" : undefined}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(p)}
                  aria-label={`Expand image: ${p.alt}`}
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-lg bg-warm-white shadow-soft-sm transition-shadow hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 200px, 30vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/65 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <ZoomIn className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Body copy + links + credit — mobile flows in order; desktop
              sits in col 1 row 2 under the video */}
          <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2">
            {/* One <p> on mobile (sentences flow inline as a single
                paragraph); on desktop (sm+) each sentence span breaks
                onto its own block so the body reads as three short
                one-sentence paragraphs. */}
            <p className="text-[13px] leading-relaxed text-warm-gray sm:text-[18px]">
              {/* First sentence — desktop only: display serif at medium
                  weight + snug leading so it reads as a headline /
                  announcement (sm:text-[20px]). Mobile stays uniform
                  body text. */}
              <span className="sm:block sm:font-display sm:text-[20px] sm:font-medium sm:leading-snug sm:tracking-tight sm:text-ink">
                Check out <strong className="text-ink">Yaffa Botier</strong>{" "}
                sharing the stage with none other than{" "}
                <strong className="text-ink sm:uppercase">Yungblud!</strong>
              </span>{" "}
              <span className="sm:mt-4 sm:block">
                Yaffa was mentored by{" "}
                <a
                  href="https://www.TonyLucca.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline underline-offset-2 decoration-warm-gray/40 transition-colors hover:text-red hover:decoration-red"
                >
                  Tony Lucca
                </a>{" "}
                and introduced to our program by{" "}
                <a
                  href="https://www.chasenhampton.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline underline-offset-2 decoration-warm-gray/40 transition-colors hover:text-red hover:decoration-red"
                >
                  Chasen Hampton
                </a>{" "}
                (of{" "}
                <a
                  href="https://closeenemiestheband.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline underline-offset-2 decoration-warm-gray/40 transition-colors hover:text-red hover:decoration-red"
                >
                  Close Enemies
                </a>
                ).
              </span>{" "}
              {/* Mobile: inline so the body stays one paragraph. Desktop:
                  its own block, same size as the body sentence above it
                  (inherits the <p>'s sm:text-[18px]). */}
              <span className="sm:mt-4 sm:block">
                Learn more about our mentoring and coaching programs at:
                <br />
                <a
                  href={LEARN_MORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red no-underline transition-colors hover:text-red-deep"
                >
                  www.Learn-Grow-Thrive.org
                </a>
                .
              </span>
            </p>

            <p className="mt-auto text-[12px] uppercase tracking-[0.16em] text-warm-gray/80">
              📸 @_fitzphotos_
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox — sits above the modal panel; click anywhere or press
          Esc to dismiss. The image is rendered in its natural aspect with
          the longest edge capped to the viewport so nothing gets cropped. */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded image: ${lightbox.alt}`}
          className="absolute inset-0 z-10 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close expanded image"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-soft transition-colors hover:bg-warm-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div
            className="relative max-h-[88vh] max-w-[95vw] sm:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Use a plain <img> so we can let the image size to its
                natural aspect without giving next/image a fixed container. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="block max-h-[88vh] max-w-full rounded-xl object-contain shadow-soft"
            />
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
