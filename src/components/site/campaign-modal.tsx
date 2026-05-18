"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import type { CampaignPost } from "@/lib/campaigns";

type Props = {
  post: CampaignPost | null;
  onClose: () => void;
};

const EXTERNAL_BLOG = "https://www.mickeymouseclubreunion.com/blog";

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Convert a Wix CDN URL with a /fill/ crop (used for thumbnails) into a
 * /fit/ URL that returns the full uncropped image at high resolution.
 * Falls back to the original URL if it doesn't match the expected pattern.
 */
function toFullSizeWixUrl(src: string): string {
  if (!/static\.wixstatic\.com/.test(src)) return src;
  // Strip whatever /v1/...transform path the URL has and replace with a
  // /fit/ transform that returns the uncropped image at high resolution.
  return src.replace(/\/v1\/.+$/, "/v1/fit/w_2200,h_2200,q_90/file.jpg");
}

export function CampaignModal({ post, onClose }: Props) {
  const open = !!post;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

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
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open]);

  // Esc handler — if the lightbox is open, Esc closes that first; otherwise
  // it closes the whole modal. Also handle Tab focus trap for the modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (lightbox) setLightbox(null);
        else onClose();
        return;
      }
      if (e.key !== "Tab" || lightbox) return;
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
    return () => document.removeEventListener("keydown", onKey);
  }, [open, lightbox, onClose]);

  // Reset lightbox state whenever the modal opens a different post
  useEffect(() => {
    setLightbox(null);
  }, [post]);

  if (!open || !post) return null;

  const openLightbox = (src: string, alt: string) =>
    setLightbox({ src: toFullSizeWixUrl(src), alt });

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="campaign-modal-title"
        className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
      >
        {/* Backdrop */}
        <div
          aria-hidden
          onClick={onClose}
          className="absolute inset-0 bg-ink/65 backdrop-blur-sm animate-in fade-in duration-300 motion-reduce:animate-none motion-reduce:duration-0"
        />

        {/* Panel — scrollable */}
        <div
          ref={panelRef}
          className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-cream shadow-soft animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none motion-reduce:duration-0"
        >
          {/* Close X — pinned over the hero image */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/95 text-ink shadow-soft-sm backdrop-blur-sm transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          {/* Hero image — click to view full size */}
          {post.heroImage && (
            <button
              type="button"
              onClick={() =>
                openLightbox(post.heroImage!.src, post.heroImage!.alt)
              }
              aria-label="View full-size image"
              className="group relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-warm-white"
            >
              <Image
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                unoptimized
              />
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink shadow-soft">
                  <ZoomIn className="h-5 w-5" aria-hidden />
                </span>
              </span>
            </button>
          )}

          {/* Header */}
          <header className="px-7 pt-8 sm:px-10 sm:pt-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
              From the blog
              {post.date && (
                <>
                  <span className="mx-2 text-warm-gray/50">·</span>
                  <span className="text-warm-gray">
                    {formatDate(post.date)}
                  </span>
                </>
              )}
            </p>
            <h2
              id="campaign-modal-title"
              className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-[34px]"
            >
              {post.title}
            </h2>
          </header>

          {/* Body */}
          <div className="px-7 pb-2 pt-6 sm:px-10">
            <div className="prose-aitc prose max-w-none">
              {(() => {
                /**
                 * Walk the filtered blocks and group consecutive inline
                 * images into a single row. Per spec:
                 *   - 2 images side-by-side → 2 columns
                 *   - odd count             → 3 columns
                 *   - any larger even count → 2 columns (wraps)
                 *   - solo image            → full width
                 */
                const visible = post.blocks.filter(
                  (b) => b.type !== "img" || b.placement !== "gallery"
                );
                type B = (typeof visible)[number];
                const out: React.ReactNode[] = [];
                let i = 0;
                while (i < visible.length) {
                  const b = visible[i];
                  if (b.type === "img") {
                    // Collect the consecutive image run
                    const run: Extract<B, { type: "img" }>[] = [b];
                    let j = i + 1;
                    while (j < visible.length && visible[j].type === "img") {
                      run.push(visible[j] as Extract<B, { type: "img" }>);
                      j++;
                    }
                    if (run.length === 1) {
                      out.push(
                        <button
                          key={i}
                          type="button"
                          onClick={() => openLightbox(b.src, b.alt)}
                          aria-label={`View full-size: ${b.alt || "image"}`}
                          className="!my-6 block w-full cursor-zoom-in overflow-hidden rounded-xl"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={b.src}
                            alt={b.alt}
                            loading="lazy"
                            className="!my-0 block h-auto w-full transition-transform duration-500 ease-out hover:scale-[1.02]"
                          />
                        </button>
                      );
                    } else {
                      // 2 or 4 imgs → 2 columns; everything else 2+ →
                      // 3 columns. Stay 3-across on mobile too — the
                      // tiles shrink gracefully.
                      const gridClass =
                        run.length === 2 || run.length === 4
                          ? "grid-cols-2"
                          : "grid-cols-3";
                      // A row of "logo"-treated images: light contained
                      // tiles that match the modal bg, no zoom on hover,
                      // no aspect-square crop. Mixed rows fall back to
                      // the standard photo treatment.
                      const isLogoRow = run.every(
                        (img) => img.treatment === "logo"
                      );
                      out.push(
                        <div
                          key={i}
                          className={`!my-6 grid gap-3 sm:gap-4 ${gridClass}`}
                        >
                          {run.map((img, k) => {
                            const hasCaption = !!img.caption;
                            if (img.treatment === "logo") {
                              const inner = (
                                <>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={img.src}
                                    alt={img.alt || img.caption || ""}
                                    loading="lazy"
                                    className="!my-0 mx-auto block h-full w-full max-h-32 object-contain sm:max-h-40"
                                  />
                                  {hasCaption && (
                                    <p className="!mt-2 !mb-0 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-warm-gray sm:text-[13px]">
                                      {img.caption}
                                    </p>
                                  )}
                                </>
                              );
                              // Logo tiles don't open a lightbox — they're
                              // just brand marks, not photos worth zooming.
                              return (
                                <div
                                  key={k}
                                  className="flex flex-col items-center justify-center p-2 sm:p-3"
                                >
                                  {inner}
                                </div>
                              );
                            }
                            return (
                              <figure key={k} className="!my-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    openLightbox(img.src, img.alt)
                                  }
                                  aria-label={`View full-size: ${img.alt || img.caption || "image"}`}
                                  className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-warm-white"
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    className="!my-0 absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                  />
                                </button>
                                {hasCaption && (
                                  <figcaption className="!mt-2 !mb-0 text-center text-[12px] font-semibold leading-snug text-warm-gray sm:text-[13px]">
                                    {img.caption}
                                  </figcaption>
                                )}
                              </figure>
                            );
                          })}
                        </div>
                      );
                      // Suppress unused-var warning when isLogoRow isn't
                      // referenced inside the map (kept for readability).
                      void isLogoRow;
                    }
                    i = j;
                    continue;
                  }
                  if (b.type === "p") {
                    out.push(
                      <p
                        key={i}
                        dangerouslySetInnerHTML={{ __html: b.html }}
                      />
                    );
                  } else if (b.type === "h2") {
                    out.push(<h2 key={i}>{b.text}</h2>);
                  } else if (b.type === "h3") {
                    out.push(<h3 key={i}>{b.text}</h3>);
                  } else if (b.type === "h4") {
                    out.push(<h4 key={i}>{b.text}</h4>);
                  } else if (b.type === "video" && b.kind === "youtube") {
                    out.push(
                      <div
                        key={i}
                        className="relative my-6 aspect-video w-full overflow-hidden rounded-xl"
                      >
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${b.videoId}?rel=0`}
                          title="Embedded video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full border-0"
                        />
                      </div>
                    );
                  } else if (b.type === "video" && b.kind === "mp4") {
                    out.push(
                      <video
                        key={i}
                        src={b.src}
                        controls
                        preload="metadata"
                        className="!my-6 w-full rounded-xl"
                      />
                    );
                  } else if (b.type === "report") {
                    out.push(
                      <div key={i} className="!my-8 flex flex-col items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={b.src}
                          alt={b.alt}
                          loading="lazy"
                          className="!my-0 block h-auto w-full max-w-full rounded-xl border border-border"
                        />
                        <a
                          href={b.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red px-6 text-sm font-semibold text-cream no-underline transition-colors hover:bg-red-deep hover:text-cream"
                        >
                          {b.label}
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                      </div>
                    );
                  }
                  i++;
                }
                return out;
              })()}
            </div>

            {/* Gallery — click any tile to see the full uncropped image */}
            {(() => {
              const galleryImgs = post.blocks.filter(
                (b): b is Extract<typeof b, { type: "img" }> =>
                  b.type === "img" && b.placement === "gallery"
              );
              if (galleryImgs.length === 0) return null;
              return (
                <section className="mt-10 border-t border-border pt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Gallery
                  </p>
                  <p className="mt-1 text-[12px] text-warm-gray">
                    Tap any photo to view at full size
                  </p>
                  <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {galleryImgs.map((img, i) => (
                      <li
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-xl bg-warm-white"
                      >
                        <button
                          type="button"
                          onClick={() => openLightbox(img.src, img.alt)}
                          aria-label={`View full-size: ${img.alt || "photo"}`}
                          className="group absolute inset-0 cursor-zoom-in"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100"
                          >
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink shadow-soft">
                              <ZoomIn className="h-4 w-4" aria-hidden />
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })()}
          </div>

          {/* Footer — single CTA back to the original blog */}
          <footer className="mt-2 flex flex-col items-stretch gap-4 border-t border-border bg-warm-white px-7 py-8 sm:flex-row sm:items-center sm:justify-end sm:px-10">
            <a
              href={EXTERNAL_BLOG}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-cream no-underline transition-colors hover:bg-ink/90"
            >
              Visit our blog for more
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </footer>
        </div>
      </div>

      {/* Lightbox — full uncropped image on top of the modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size image"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 motion-reduce:animate-none"
          onClick={() => setLightbox(null)}
        >
          <div aria-hidden className="absolute inset-0 bg-ink/85 backdrop-blur-sm" />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close full-size view"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/95 text-ink shadow-soft-sm transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88svh] max-w-full cursor-default rounded-xl object-contain shadow-soft animate-in zoom-in-95 duration-200 motion-reduce:animate-none"
          />
        </div>
      )}
    </>
  );
}
