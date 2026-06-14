import { siteConfig } from "@/lib/site-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a GA4 event through the already-loaded Google tag (GT-KDBG8HHL →
 * Google Ads, and G-30E6TTYWYF → the alwaysintheclub.org GA4 stream).
 *
 * Fire-and-forget: no-ops if gtag isn't ready yet and never throws, so a
 * tracking call can never block or break a click or navigation. Mirrors
 * the pattern used by the /mentorship-coaching TrackedCta component
 * (book_coach / apply_for_mentor).
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params ?? {});
  } catch {
    /* analytics must never interfere with the UI */
  }
}

const { external } = siteConfig;

/** Compare two URLs ignoring trailing slashes and case. */
const norm = (s: string) => s.replace(/\/+$/, "").toLowerCase();

/**
 * Map a known outbound destination to its conversion event name, or null
 * for anything we don't track (internal routes, the legacy content site,
 * newsletter, social, etc.).
 */
function outboundEvent(href: string): string | null {
  const h = href.toLowerCase();
  // The Club Store lives on its own domain, mmcreunion.com — distinct
  // from the content site mickeymouseclubreunion.com (which never
  // contains the substring "mmcreunion.com"). Any link into the store is
  // a store click. NB: intentionally NOT begin_checkout — that event is
  // reserved for real checkout on the reunion shop in the same GA4
  // property.
  if (h.includes("mmcreunion.com")) return "store_click";
  // The mentor-application Google Form — the only forms.gle link on the
  // site. Clicking it (e.g. the "Apply here" inline link) is a mentor
  // application, same as the "Apply for mentor" buttons.
  if (h.includes("forms.gle/wgwnzef5kpx8zmm17")) return "apply_for_mentor";
  if (norm(href) === norm(external.book)) return "get_mmc_book";
  if (norm(href) === norm(external.clubMembership)) return "join_club_click";
  if (norm(href) === norm(external.bookTeers)) return "book_teers";
  return null;
}

/**
 * Fire the conversion event mapped to an outbound href, if any. Safe to
 * attach to any link's onClick — unmapped hrefs simply navigate with no
 * event.
 */
export function trackOutbound(href: string | undefined | null) {
  if (!href) return;
  const name = outboundEvent(href);
  if (name) trackEvent(name);
}
