"use client";

/**
 * Student Spotlight modal — opened from the Mentorship card on the home
 * page. Showcases a single student (currently Yaffa Botier) with a hero
 * video, a 3-up photo gallery, a short tribute, and a CTA to the
 * mentoring program.
 *
 * Modal mechanics (focus trap / scroll lock / Esc) mirror CampaignModal
 * so behavior is consistent across the site.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles, X } from "lucide-react";

type Photo = { src: string; alt: string };

const VIDEO_SRC = "/images/YAFFA-video.MP4";
const PHOTOS: Photo[] = [
  { src: "/images/yaffa-1.JPG", alt: "Yaffa Botier on stage with Yungblud" },
  { src: "/images/yaffa-2.JPG", alt: "Yaffa Botier performing live" },
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
        className="group mt-6 inline-flex items-center gap-2 self-start rounded-full border border-red/30 bg-red/5 px-4 py-2 text-sm font-semibold text-red no-underline transition-colors hover:border-red hover:bg-red hover:text-cream"
      >
        <Sparkles
          className="h-4 w-4 text-red transition-colors group-hover:text-cream"
          aria-hidden
        />
        Student Spotlight: Yaffa Botier
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

  // Body scroll lock + focus management while modal is open
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    panelRef.current?.scrollTo({ top: 0 });
    return () => {
      document.body.style.overflow = prevOverflow;
      // Pause video if it was playing
      videoRef.current?.pause();
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  // Esc to close + Tab focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
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
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-spotlight-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/65 backdrop-blur-sm sm:items-center"
      onClick={(e) => {
        // Click on backdrop (not panel) → close
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-cream shadow-soft sm:max-h-[90vh] sm:rounded-2xl"
      >
        {/* Close button — floats top-right */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close Student Spotlight"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-ink shadow-soft-sm backdrop-blur-sm transition-colors hover:bg-warm-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        {/* Header band */}
        <header className="px-6 pb-5 pt-7 sm:px-10 sm:pb-7 sm:pt-9">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Student Spotlight
          </p>
          <h2
            id="student-spotlight-title"
            className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl"
          >
            Yaffa Botier
          </h2>
        </header>

        {/* Hero video */}
        <div className="px-6 sm:px-10">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-ink shadow-soft-sm sm:aspect-video">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster="/images/yaffa-1.JPG"
              className="h-full w-full bg-ink object-contain"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        </div>

        {/* 3-up photo gallery */}
        <ul className="mt-5 grid grid-cols-3 gap-2 px-6 sm:gap-3 sm:px-10">
          {PHOTOS.map((p) => (
            <li
              key={p.src}
              className="relative aspect-[3/4] overflow-hidden rounded-lg bg-warm-white shadow-soft-sm"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 640px) 220px, 33vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>

        {/* Body copy */}
        <div className="space-y-4 px-6 pt-7 text-[16px] leading-relaxed text-warm-gray sm:px-10 sm:text-[17px]">
          <p>
            So great to see one of our students thriving! Check her out
            sharing the stage with none other than{" "}
            <strong className="text-ink">Yungblud</strong>! Yaffa is being
            mentored by Always In The Club Foundation’s{" "}
            <strong className="text-ink">Tony Lucca</strong>, and we couldn’t
            be more proud.
          </p>
          <p>
            Shout out to AITC’s{" "}
            <strong className="text-ink">Chasen Hampton</strong> for making
            the connection!
          </p>
          <p>
            Congrats Yaffa, we can’t wait to see how far you go!
          </p>
        </div>

        {/* CTA + photo credit */}
        <footer className="mt-7 flex flex-col gap-4 border-t border-border bg-warm-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <a
            href={LEARN_MORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-red px-6 text-base font-semibold text-cream no-underline transition-colors hover:bg-red-deep"
          >
            Learn about our mentoring programs
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="text-[12px] uppercase tracking-[0.16em] text-warm-gray">
            📸 @_fitzphotos_
          </p>
        </footer>
      </div>
    </div>
  );
}
