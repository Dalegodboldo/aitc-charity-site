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
  /** Path-friendly slug used by the same-origin proxy that strips the
   *  "Hi {{ firstname }}," personalization placeholder. */
  slug: string;
  /** Original sender.net share URL, used for "Open in new tab". */
  href: string;
  image: string;
  alt: string;
  /** Optional object-position for the card image (e.g. "center top") when
   *  a portrait image would otherwise center-crop badly in the 16:10 frame. */
  objectPosition?: string;
  /** Short line naming the Mouseketeers featured in this issue. */
  featured: string;
};

const issues: Issue[] = [
  {
    month: "August",
    year: "2026",
    slug: "august",
    href: "https://share.sender.net/campaigns/hrOg/mouseketeer-roundup-august-special-edition",
    image: "/images/Season7Cast.webp",
    alt: "The cast of the All-New Mickey Mouse Club, featured in the August Special Edition Mouseketeer Roundup",
    featured:
      "Special Edition. Featuring JC Chasez, Nikki DeLoach, Ryan Gosling, Tony Lucca, Albert Fields, Chasen Hampton, Jennifer McGill, Damon Pampolina, and Dale Godboldo.",
  },
  {
    month: "July",
    year: "2026",
    slug: "july",
    href: "https://share.sender.net/campaigns/gLgN/mouseketeer-roundup-july",
    image: "/images/MR-july.jpg",
    alt: "Mouseketeers reuniting at House of Mouse Expo, featured in the July Mouseketeer Roundup",
    featured:
      "Featuring JC Chasez, Tony Lucca, Albert Fields, Chasen Hampton, Damon Pampolina, and Dale Godboldo.",
  },
  {
    month: "June",
    year: "2026",
    slug: "june",
    href: "https://share.sender.net/campaigns/go3e/mouseketeer-roundup-june",
    image: "/images/MR-june.jpg",
    alt: "The cast of the All-New Mickey Mouse Club, featured in the June Mouseketeer Roundup",
    featured:
      "Featuring Christina Aguilera, Rhona Bennett, Tasha Danner, Nikki DeLoach, Chasen Hampton, Jennifer McGill, Mylin Brooks-Stoddard, and Deedee Magno Hall.",
  },
  {
    month: "May",
    year: "2026",
    slug: "may",
    href: "https://share.sender.net/campaigns/fXxG/mouseketeer-roundup-may",
    image: "/images/roundup-may-2026.png",
    alt: "Featured in the May Mouseketeer Roundup",
    featured:
      "Featuring Nikki DeLoach, Rhona Bennett, Christina Aguilera, Matt Morris, JC Chasez, and Dale Godboldo.",
  },
  {
    month: "April",
    year: "2026",
    slug: "april",
    href: "https://share.sender.net/campaigns/fiqk/mouseketeer-roundup-april",
    image: "/images/roundup-april-2026.jpg",
    alt: "Featured in the April Mouseketeer Roundup",
    featured:
      "Featuring JC Chasez, Ryan Gosling, Raquel Herring, Chasen Hampton, and Tony Lucca.",
  },
  {
    month: "March",
    year: "2026",
    slug: "march",
    href: "https://share.sender.net/campaigns/d7pe/mouseketeer-roundup-march",
    image: "/images/roundup-march-2026.jpg",
    alt: "Featured in the March Mouseketeer Roundup",
    featured:
      "Featuring Keri Russell, Ryan Gosling, JC Chasez, Chasen Hampton, Lindsey Alley, and Raquel Herring.",
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
                  style={
                    iss.objectPosition
                      ? { objectPosition: iss.objectPosition }
                      : undefined
                  }
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
                  {iss.featured}
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
      {/* The panel is capped at 95svh and the iframe inside fills the
       *  remaining space. We use the iframe's intrinsic scrolling rather
       *  than scrolling the whole modal panel, because outer-scrolling a
       *  tall fixed panel on iOS produces noticeable jank near the end
       *  of the scroll. */}
      <div
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-cream shadow-soft"
        style={{ height: "95svh" }}
      >
        <header className="flex items-center gap-3 border-b border-border bg-cream px-5 py-3 sm:px-7 sm:py-4">
          <h2
            id="roundup-modal-title"
            className="min-w-0 flex-1 truncate font-display text-lg font-medium leading-tight tracking-tight text-ink sm:text-xl"
          >
            Mouseketeer Roundup{" "}
            <span className="text-warm-gray">
              {open.month} {open.year}
            </span>
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={`Close the ${open.month} ${open.year} Mouseketeer Roundup`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-cream shadow-soft-sm transition-colors hover:bg-red focus-visible:bg-red"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>
        <div className="flex-1 overflow-hidden bg-warm-white">
          <iframe
            src={`/api/roundup-proxy/${open.slug}`}
            title={`Mouseketeer Roundup ${open.month} ${open.year}`}
            className="block h-full w-full border-0"
          />
        </div>
        <footer className="flex shrink-0 items-center justify-center border-t border-border bg-cream px-5 py-3 sm:px-7">
          {/* Bottom "Open in browser" CTA — visible on every screen
           *  size, with a click handler that calls window.open
           *  explicitly. In-app browsers (Facebook, Instagram, etc.)
           *  sometimes ignore target="_blank" but respond to an
           *  explicit window.open, giving us a better chance of
           *  escaping the webview. */}
          <a
            href={open.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const w = window.open(open.href, "_blank", "noopener,noreferrer");
              if (w) e.preventDefault();
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
          >
            Open this issue in your browser
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
