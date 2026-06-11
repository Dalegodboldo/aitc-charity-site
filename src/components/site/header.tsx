"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DONATE_MODAL_OPEN_EVENT } from "@/components/site/donate-modal";
import { trackOutbound } from "@/lib/analytics/track";
import { primaryNav, siteConfig } from "@/lib/site-config";

/** True when the visitor is on `href` or any sub-route of it (so a
 *  blog post still highlights the "All Ears" link, etc.). */
function isActivePath(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(href + "/");
}

function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Always In The Club Foundation — home"
      className={cn(
        "group inline-flex items-end gap-2.5 no-underline",
        className
      )}
    >
      <Image
        src="/images/aitc-logo-long.png"
        alt="Always In The Club"
        width={310}
        height={57}
        priority
        className="h-6 w-auto transition-opacity group-hover:opacity-75 sm:h-7 lg:h-[30px]"
      />
      <span className="hidden -translate-y-[3px] text-[10px] font-medium uppercase tracking-[0.18em] text-gold sm:inline">
        Foundation
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Wordmark />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {primaryNav
            .filter((item) => !item.mobileOnly)
            .map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(item.href)}
                  className="text-[15px] font-medium text-ink no-underline transition-colors hover:text-red"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "text-[15px] font-medium no-underline transition-colors hover:text-red",
                    isActivePath(pathname, item.href)
                      ? "text-gold hover:text-gold"
                      : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={siteConfig.external.mainSite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-warm-gray no-underline transition-colors hover:text-ink"
          >
            Celebrate the Legacy
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(DONATE_MODAL_OPEN_EVENT))}
            className="inline-flex h-10 items-center justify-center rounded-full bg-red px-5 text-sm font-semibold text-cream no-underline transition-colors hover:bg-red-deep hover:text-cream"
          >
            Donate
          </button>
        </div>

        {/* Mobile CTAs */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(DONATE_MODAL_OPEN_EVENT))}
            className="inline-flex h-9 items-center justify-center rounded-full bg-red px-4 text-[13px] font-semibold text-cream no-underline transition-colors hover:bg-red-deep hover:text-cream"
          >
            Donate
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-warm-white text-ink transition-colors hover:border-ink/30"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile menu — full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed top-0 left-0 z-50 flex h-svh w-screen flex-col bg-cream lg:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-border/70 px-5 sm:h-20 sm:px-8">
          <Wordmark />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-warm-white text-ink transition-colors hover:border-ink/30"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <nav
          aria-label="Primary"
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-8 sm:px-8"
        >
          {primaryNav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackOutbound(item.href);
                  setOpen(false);
                }}
                className="block rounded-xl px-3 py-3 font-display text-2xl font-medium text-ink no-underline transition-colors hover:bg-warm-white hover:text-red"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-3 py-3 font-display text-2xl font-medium no-underline transition-colors hover:bg-warm-white hover:text-red",
                  isActivePath(pathname, item.href)
                    ? "text-gold hover:text-gold"
                    : "text-ink",
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="my-4 h-px bg-border" />
          <a
            href={siteConfig.external.mainSite}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-sm font-medium text-warm-gray no-underline transition-colors hover:text-ink"
            onClick={() => setOpen(false)}
          >
            Celebrate the Legacy →
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event(DONATE_MODAL_OPEN_EVENT));
            }}
            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-red px-6 text-base font-semibold text-cream no-underline transition-colors hover:bg-red-deep hover:text-cream"
          >
            Donate
          </button>
        </nav>
      </div>
    </header>
  );
}
