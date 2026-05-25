"use client";

/**
 * "Need a Speaker or Workshop?" modal — opened from the Workshops &
 * Coaching card on the Programs page. Compact single-column layout
 * with three speaker portraits, a featured-speaker link to Rhona
 * Bennett's profile on mickeymouseclubreunion.com, and a plain-text
 * email contact (per Chasen's spec: do not link the email address).
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Mic2, X } from "lucide-react";

type Photo = { src: string; alt: string };

const PHOTOS: Photo[] = [
  { src: "/images/jenn-speaking.png", alt: "Jennifer Kramer speaking on stage" },
  { src: "/images/tony-class.png", alt: "Tony Lucca leading a class" },
  {
    src: "/images/rhona-speaking.png",
    alt: "Rhona Bennett (formerly of En Vogue) speaking on stage",
  },
];

const RHONA_FEATURED_PHOTO: Photo = {
  src: "/images/rhona-lights-camera-action.png",
  alt: "Rhona Bennett — Lights, Camera, Action",
};

const RHONA_URL = "https://www.mickeymouseclubreunion.com/rhona-bennett";
const CONTACT_EMAIL = "Info@AlwaysInTheClub.org";

export function SpeakersModalTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
      >
        <Mic2
          className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          aria-hidden
        />
        Speakers / Workshops
      </button>
      <SpeakersModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function SpeakersModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  // Focus management while modal is open. Body scroll lock would
  // help on long pages, but it breaks iOS touch scroll inside the
  // modal — leaving it off, same pattern as StudentSpotlight.
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();
    return () => {
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  // Esc-to-close + Tab focus trap within the panel.
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
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (
        e.shiftKey &&
        (active === first || !panelRef.current?.contains(active))
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="speakers-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-ink/65 backdrop-blur-sm animate-in fade-in duration-300 motion-reduce:animate-none motion-reduce:duration-0"
      />

      {/* Panel — scrollable on small viewports */}
      <div
        ref={panelRef}
        className="relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-cream shadow-soft animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none motion-reduce:duration-0"
      >
        {/* Close X */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/95 text-ink shadow-soft-sm backdrop-blur-sm transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        {/* Header */}
        <header className="px-7 pt-10 sm:px-10 sm:pt-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
            Book a Mouseketeer
          </p>
          <h2
            id="speakers-modal-title"
            className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-[34px]"
          >
            Need a Speaker or Workshop?
          </h2>
        </header>

        {/* 3-up portrait grid — sits above the copy so the visuals
            land first when the modal opens. */}
        <ul className="mt-6 grid grid-cols-1 gap-3 px-7 sm:grid-cols-3 sm:gap-4 sm:px-10">
          {PHOTOS.map((photo) => (
            <li
              key={photo.src}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-warm-white"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 200px, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>

        {/* Body */}
        <div className="space-y-5 px-7 pb-6 pt-6 text-base leading-relaxed text-warm-gray sm:px-10">
          <p>
            Former Mouseketeers are world-class public speakers, personal
            development coaches and professional educators that have coached
            and mentored more than{" "}
            <strong className="font-semibold text-ink">3,500 students</strong>{" "}
            and shared the stage with icons, such as: Jack Canfield, John
            Travolta, Halle Berry, Quincy Jones, Matthew McConaughey, Les
            Brown, Demi Moore, Shark Tank&rsquo;s Robert Herjavec, and
            Presidents Bill Clinton and George W. Bush, among other leaders
            in the arts, business and government.
          </p>
          <p>
            Contact us to book your next event, corporate retreat or school
            program. We&rsquo;ll help you identify the right speaker(s) to
            maximize your impact. Reach out at{" "}
            <span className="font-semibold text-ink">{CONTACT_EMAIL}</span>
          </p>
        </div>

        {/* Featured Speaker — Rhona Bennett photo + Learn more button */}
        <section className="border-t border-border bg-warm-white px-7 py-7 sm:px-10 sm:py-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
            Featured Speaker
          </p>
          <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink sm:text-[22px]">
            Rhona Bennett{" "}
            <span className="font-display italic text-warm-gray">
              (Formerly of En Vogue)
            </span>
          </h3>

          <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-cream">
            <Image
              src={RHONA_FEATURED_PHOTO.src}
              alt={RHONA_FEATURED_PHOTO.alt}
              fill
              sizes="(min-width: 640px) 560px, 100vw"
              className="object-cover"
            />
          </div>

          <a
            href={RHONA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-ink px-6 text-sm font-semibold text-cream no-underline transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            Learn more about Rhona
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </section>
      </div>
    </div>,
    document.body,
  );
}
