"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "aitc-book-modal-suppressed-until";
const SUPPRESS_DAYS = 14;
const DELAY_MS = 9_000; // ~9 seconds after first paint
const BOOK_URL = "https://www.mickeymouseclubreunion.com/books";

/**
 * Site-wide promo modal for the MMC book. Mounted once in the root layout.
 *
 * - Opens ~9s after first mount (the layout doesn't remount on route
 *   change in App Router, so this fires once per visit, not per nav)
 * - Suppressed for 14 days once the visitor dismisses it (any path:
 *   X button, "Maybe later", overlay click, Esc, or clicking through
 *   to the book)
 * - Locks body scroll while open
 * - Focus trap + Esc-to-close + restore-focus per WAI-ARIA dialog
 * - Respects prefers-reduced-motion (instant open instead of animation)
 */
export function BookModal() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  // Schedule the first-load open, gated by the 14-day suppression key.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const until = raw ? parseInt(raw, 10) : 0;
      if (Number.isFinite(until) && Date.now() < until) return;
    } catch {
      // localStorage unavailable — fall through and show normally
    }
    timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Body scroll lock + focus management while open
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== "Tab") return;
      // Trap Tab/Shift+Tab inside the panel
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
    // dismiss is stable (defined below); we only want this to run when open flips
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    try {
      const until = Date.now() + SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(until));
    } catch {
      // No localStorage — that's fine, modal just won't be suppressed next visit
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-headline"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop — clicking dismisses */}
      <div
        aria-hidden
        onClick={dismiss}
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm animate-in fade-in duration-300 motion-reduce:animate-none motion-reduce:duration-0"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative grid max-h-[90svh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-2xl bg-cream shadow-soft animate-in fade-in zoom-in-95 duration-300 lg:grid-cols-[5fr_7fr] motion-reduce:animate-none motion-reduce:duration-0"
      >
        {/* Book cover (anchor) */}
        <div className="relative h-64 w-full bg-warm-white sm:h-80 lg:h-auto lg:min-h-[420px]">
          <Image
            src="/images/3-e35fc5c.png"
            alt="Cover of The True Story of the All New Mickey Mouse Club"
            fill
            priority
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover object-top lg:object-center"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col p-7 sm:p-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            Now Available
          </p>
          <h2
            id="book-modal-headline"
            className="mt-4 font-display text-[28px] font-medium leading-[1.1] tracking-tight text-ink sm:text-[34px]"
          >
            The True Story of the &ldquo;All New&rdquo; Mickey Mouse Club
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-warm-gray">
            A stunning collector&rsquo;s book — a one-of-a-kind tribute to the
            show that defined a generation. Available as eBook, Hardcover,
            Paperback, and Coffee Table editions.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="inline-flex h-12 items-center justify-center rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream"
            >
              Get the Book
            </a>
            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-medium text-warm-gray underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Close X */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/95 text-ink shadow-soft-sm backdrop-blur-sm transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
