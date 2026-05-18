"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/** Dispatch this from anywhere on the page to open the DonateModal —
 *  the in-site Zeffy donation form. Keeps visitors on the site instead
 *  of bouncing them to zeffy.com. */
export const DONATE_MODAL_OPEN_EVENT = "aitc:donate-modal:open";

/**
 * Site-wide donate modal — embeds the Zeffy donation form so visitors
 * can give without leaving the site.
 *
 * - Mounted once in the root layout, idle until a trigger fires
 * - Opens in response to the DONATE_MODAL_OPEN_EVENT window event
 * - Locks body scroll while open
 * - Focus trap + Esc-to-close + restore-focus per WAI-ARIA dialog
 * - Iframe is lazy-mounted only after first open so the Zeffy bundle
 *   isn't fetched on initial page load
 */
export function DonateModal() {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // keeps iframe alive after first open
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    const openOnDemand = () => {
      setHasMounted(true);
      setOpen(true);
    };
    window.addEventListener(DONATE_MODAL_OPEN_EVENT, openOnDemand);
    return () =>
      window.removeEventListener(DONATE_MODAL_OPEN_EVENT, openOnDemand);
  }, []);

  // Body scroll lock + focus management while open
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
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  // Keep the iframe in the DOM (just hidden) once it's been opened, so
  // re-opening doesn't refetch the Zeffy bundle.
  if (!hasMounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-modal-headline"
      hidden={!open}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
    >
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-ink/65 backdrop-blur-sm animate-in fade-in duration-300 motion-reduce:animate-none motion-reduce:duration-0"
      />

      <div
        ref={panelRef}
        className="relative flex h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-cream shadow-soft animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none motion-reduce:duration-0"
      >
        <header className="flex items-center justify-between gap-4 border-b border-border bg-cream/95 px-5 py-3 backdrop-blur-sm sm:px-6">
          <h2
            id="donate-modal-headline"
            className="font-display text-lg font-medium text-ink sm:text-xl"
          >
            Make a donation
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close donation form"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white text-ink shadow-soft-sm transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <iframe
          title="Donation form"
          src={siteConfig.external.donateEmbed}
          allow="payment *"
          className="block h-full w-full flex-1 border-0 bg-cream"
        />
      </div>
    </div>
  );
}
