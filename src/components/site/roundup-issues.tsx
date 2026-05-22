"use client";

/**
 * Mouseketeer Roundup — past-issues grid + per-issue modal.
 *
 * The cards open a popup modal that iframes the sender.net share URL,
 * so visitors can read the newsletter without leaving the site. An
 * "Open in new tab" escape hatch in the modal header lets them break
 * out if they prefer.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowUpRight, Newspaper, X } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

type Issue = {
  month: string;
  year: string;
  href: string;
  image: string;
  alt: string;
};

const issues: Issue[] = [
  {
    month: "May",
    year: "2026",
    href: "https://share.sender.net/campaigns/fXxG/mouseketeer-roundup-may",
    image: "/images/mmc30-mickey-confetti.png",
    alt: "Mouseketeers and Mickey celebrating",
  },
  {
    month: "April",
    year: "2026",
    href: "https://share.sender.net/campaigns/fiqk/mouseketeer-roundup-april",
    image: "/images/mmc-holidays-musicares-facebook-event-cover.jpg",
    alt: "Mouseketeers, Why? Because It's Christmas with MusiCares",
  },
  {
    month: "March",
    year: "2026",
    href: "https://share.sender.net/campaigns/d7pe/mouseketeer-roundup-march",
    image: "/images/disney-shot-on-stage.webp",
    alt: "Mouseketeers and students on stage at Disney Imagination Campus",
  },
];

export function RoundupIssues() {
  const [open, setOpen] = useState<Issue | null>(null);

  return (
    <>
      <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {issues.map((iss, i) => (
          <Reveal as="li" key={iss.month} delay={i * 80}>
            <button
              type="button"
              onClick={() => setOpen(iss)}
              aria-label={`Open the ${iss.month} ${iss.year} Mouseketeer Roundup`}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-warm-white text-left shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {/* Image header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream">
                <Image
                  src={iss.image}
                  alt={iss.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-ink/0 to-transparent"
                />
                <span className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-red shadow-soft-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-red group-hover:text-cream motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                  <Newspaper className="h-4 w-4" aria-hidden />
                </span>
              </div>
              {/* Body */}
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {iss.month} {iss.year}
                </p>
                <p className="mt-2 font-display text-xl font-medium leading-snug text-ink">
                  Mouseketeer Roundup
                </p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-warm-gray">
                  A recap of Mouseketeers in entertainment, in their
                  communities, and at the foundation.
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-colors group-hover:text-red-deep">
                  Read this issue
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </ul>

      <RoundupModal open={open} onClose={() => setOpen(null)} />
    </>
  );
}

function RoundupModal({
  open,
  onClose,
}: {
  open: Issue | null;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  // Focus, scroll lock, Esc-to-close while the modal is open.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      const prev = previouslyFocused.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="roundup-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/65 p-3 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-cream shadow-soft"
        style={{ maxHeight: "90svh" }}
      >
        <header className="flex items-center justify-between gap-3 border-b border-border bg-cream px-5 py-3 sm:px-7 sm:py-4">
          <h2
            id="roundup-modal-title"
            className="font-display text-lg font-medium leading-tight tracking-tight text-ink sm:text-xl"
          >
            Mouseketeer Roundup{" "}
            <span className="text-warm-gray">
              {open.month} {open.year}
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={open.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-full border border-border bg-cream px-3 text-xs font-medium text-warm-gray no-underline transition-colors hover:border-ink/30 hover:text-ink sm:inline-flex"
            >
              Open in new tab
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={`Close the ${open.month} ${open.year} Mouseketeer Roundup`}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-cream shadow-soft-sm transition-colors hover:bg-red focus-visible:bg-red"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden bg-warm-white">
          <iframe
            src={open.href}
            title={`Mouseketeer Roundup ${open.month} ${open.year}`}
            className="block h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
