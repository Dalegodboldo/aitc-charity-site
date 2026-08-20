"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DONATE_MODAL_OPEN_EVENT } from "@/components/site/donate-modal";
import { trackOutbound } from "@/lib/analytics/track";
import { primaryNav, siteConfig, type NavItem } from "@/lib/site-config";

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

/** Desktop nav dropdown (e.g. "Press"). Opens on hover and on click,
 *  closes on outside click, Escape, or route change. */
function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 whitespace-nowrap text-[15px] font-medium text-ink no-underline transition-colors hover:text-red"
      >
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 pt-3">
          <ul className="w-[24rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-cream p-2 shadow-soft">
            {(item.children ?? []).map((child) => {
              const isCta = !child.sublabel;
              return (
                <li
                  key={child.href}
                  className={
                    isCta ? "mt-1 border-t border-border pt-1" : undefined
                  }
                >
                  <a
                    href={child.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => child.href && trackOutbound(child.href)}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 no-underline transition-colors hover:bg-warm-white",
                      isCta && "font-semibold text-red hover:text-red-deep"
                    )}
                  >
                    {isCta ? (
                      <span className="inline-flex items-center gap-1.5 text-sm">
                        {child.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    ) : (
                      <>
                        <span className="block text-[13.5px] font-medium leading-snug text-ink">
                          {child.label}
                        </span>
                        <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                          {child.sublabel}
                        </span>
                      </>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Mobile nav dropdown group (e.g. "Press") — collapsed by default,
 *  tap the label to expand its links. */
function MobileNavGroup({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-display text-2xl font-medium text-ink transition-colors hover:bg-warm-white hover:text-red"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-6 w-6 shrink-0 transition-transform",
            expanded && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      {expanded && (
        <ul className="mb-2 ml-3 mt-1 space-y-1 border-l border-border pl-4">
          {(item.children ?? []).map((child) => (
            <li key={child.href}>
              <a
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (child.href) trackOutbound(child.href);
                  onNavigate();
                }}
                className="block rounded-lg px-2 py-2 no-underline transition-colors hover:bg-warm-white"
              >
                <span className="block text-[15px] font-medium leading-snug text-ink">
                  {child.label}
                </span>
                {child.sublabel && (
                  <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                    {child.sublabel}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
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
          className="hidden items-center gap-4 lg:flex xl:gap-6"
        >
          {primaryNav
            .filter((item) => !item.mobileOnly)
            .map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} />
              ) : item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(item.href!)}
                  className="whitespace-nowrap text-[15px] font-medium text-ink no-underline transition-colors hover:text-red"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  aria-current={isActivePath(pathname, item.href!) ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap text-[15px] font-medium no-underline transition-colors hover:text-red",
                    isActivePath(pathname, item.href!)
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
            item.children ? (
              <MobileNavGroup
                key={item.label}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ) : item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackOutbound(item.href!);
                  setOpen(false);
                }}
                className="block rounded-xl px-3 py-3 font-display text-2xl font-medium text-ink no-underline transition-colors hover:bg-warm-white hover:text-red"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setOpen(false)}
                aria-current={isActivePath(pathname, item.href!) ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-3 py-3 font-display text-2xl font-medium no-underline transition-colors hover:bg-warm-white hover:text-red",
                  isActivePath(pathname, item.href!)
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
