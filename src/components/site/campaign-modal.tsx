"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { CampaignPost } from "@/lib/campaigns";

type Props = {
  post: CampaignPost | null;
  onClose: () => void;
};

const SITE_NAME = "mickeymouseclubreunion.com";

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

export function CampaignModal({ post, onClose }: Props) {
  const open = !!post;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  // Body scroll lock + focus management while open
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog
    closeBtnRef.current?.focus();
    // Reset scroll position to top whenever a new post opens
    panelRef.current?.scrollTo({ top: 0 });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
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
  }, [open, onClose]);

  if (!open || !post) return null;

  return (
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

        {/* Hero image — flex-shrink-0 so aspect-ratio holds inside the flex column */}
        {post.heroImage && (
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-warm-white">
            <Image
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Header */}
        <header className="px-7 pt-8 sm:px-10 sm:pt-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
            From the blog
            {post.date && (
              <>
                <span className="mx-2 text-warm-gray/50">·</span>
                <span className="text-warm-gray">{formatDate(post.date)}</span>
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

        {/* Body — text/headings/videos and INLINE images flow as prose;
            images marked `placement: "gallery"` (runs of 2+ consecutive
            images in the source) are collected into one grid at the bottom */}
        <div className="px-7 pb-2 pt-6 sm:px-10">
          <div className="prose-aitc prose max-w-none">
            {post.blocks
              .filter(
                (b) => b.type !== "img" || b.placement !== "gallery"
              )
              .map((b, i) => {
                if (b.type === "p") {
                  return (
                    <p
                      key={i}
                      dangerouslySetInnerHTML={{ __html: b.html }}
                    />
                  );
                }
                if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
                if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
                if (b.type === "h4") return <h4 key={i}>{b.text}</h4>;
                if (b.type === "img") {
                  // Inline contextual image — render at its position in flow,
                  // not in the bottom gallery
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={b.src}
                      alt={b.alt}
                      loading="lazy"
                      className="!my-6 rounded-xl"
                    />
                  );
                }
                if (b.type === "video" && b.kind === "youtube") {
                  return (
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
                }
                if (b.type === "video" && b.kind === "mp4") {
                  return (
                    <video
                      key={i}
                      src={b.src}
                      controls
                      preload="metadata"
                      className="!my-6 w-full rounded-xl"
                    />
                  );
                }
                return null;
              })}
          </div>

          {/* Gallery — only images that appeared as part of a run in the
              source (contiguous gallery sections in the original post) */}
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
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {galleryImgs.map((img, i) => (
                    <li
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-xl bg-warm-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })()}
        </div>

        {/* Footer — original link + visit our blog */}
        <footer className="mt-2 flex flex-col gap-4 border-t border-border bg-warm-white px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <a
            href={post.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
          >
            Read the full story on {SITE_NAME}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <Link
            href="/blog"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-cream no-underline transition-colors hover:bg-ink/90"
          >
            Visit our blog for more
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </footer>
      </div>
    </div>
  );
}
