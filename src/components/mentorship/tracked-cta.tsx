"use client";

/**
 * TrackedCta — anchor/Link that fires one GA4 event on click, then
 * proceeds to the href normally. Used for every conversion CTA on
 * /mentorship-coaching so each click is captured through GT-KDBG8HHL
 * (already installed site-wide in src/app/layout.tsx) and routed to
 * Google Ads via AW-11432642033.
 *
 * Three variants match the reference design:
 *   - "pill"    — primary brand-red filled pill
 *   - "outline" — neutral ink-bordered outline pill
 *   - "inline"  — small text link with arrow, for secondary CTAs
 *
 * `ctaId` is a stable label for the specific button (e.g.
 * "hero-strip:need-a-coach", "coach-card:tony-lucca"). GA4 receives
 * it as the `cta` param so we can split conversions by which surface
 * the visitor clicked.
 */

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export type CtaEvent =
  | { event: "book_coach"; coach?: string }
  | { event: "apply_for_mentor" }
  | { event: "schedule_call" }
  | { event: "book_speaker" };

type Variant = "pill" | "outline" | "inline";

type Props = {
  href: string;
  children: ReactNode;
  event: CtaEvent;
  /** Stable identifier — see file header. */
  ctaId: string;
  variant?: Variant;
  /** Override the auto-detect. Defaults to true for any http(s) URL. */
  external?: boolean;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(event: CtaEvent, ctaId: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    const params: Record<string, string> = { cta: ctaId };
    if (event.event === "book_coach" && event.coach) {
      params.coach = event.coach;
    }
    window.gtag("event", event.event, params);
  } catch {
    /* never block navigation on a tracking glitch */
  }
}

const PILL =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-sm font-semibold uppercase tracking-[0.04em] text-cream no-underline transition-all duration-200 hover:bg-red-deep hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const OUTLINE =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-cream px-7 text-sm font-semibold uppercase tracking-[0.04em] text-ink no-underline transition-all duration-200 hover:bg-ink hover:text-cream hover:border-ink hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const INLINE =
  "inline-flex items-baseline gap-1 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red rounded-sm";

export function TrackedCta({
  href,
  children,
  event,
  ctaId,
  variant = "pill",
  external,
}: Props) {
  // External = anything that isn't a same-site path. mailto: / tel: /
  // http(s):// all need a plain <a>, not next/link's <Link> (which would
  // treat mailto: as a relative route and fail to resolve).
  const isExternal =
    external ?? /^(https?:|mailto:|tel:)/.test(href);
  // target="_blank" makes no sense for mailto:/tel: — those open the
  // OS handler, not a new tab — but it doesn't hurt either. Browsers
  // ignore it. We keep rel=noopener for the http(s) case.
  const isNewTab = /^https?:\/\//.test(href);
  const handleClick = () => trackEvent(event, ctaId);
  const className =
    variant === "pill" ? PILL : variant === "outline" ? OUTLINE : INLINE;
  const Arrow = isExternal ? ArrowUpRight : ArrowRight;
  const arrowClasses =
    variant === "inline" ? "h-3.5 w-3.5 self-center" : "h-4 w-4";

  if (isExternal) {
    return (
      <a
        href={href}
        target={isNewTab ? "_blank" : undefined}
        rel={isNewTab ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className={className}
      >
        {children}
        <Arrow className={arrowClasses} aria-hidden />
      </a>
    );
  }
  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
      <Arrow className={arrowClasses} aria-hidden />
    </Link>
  );
}
