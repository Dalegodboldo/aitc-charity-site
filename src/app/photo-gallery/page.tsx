import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

const GALLERY_DIR = path.join(process.cwd(), "public/images/gallery");
const PHOTO_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Read every image in /public/images/gallery/ at build time. Drop a
 * photo into that folder and it appears in the grid automatically —
 * no manual list to maintain. Sorted alphabetically so naming the
 * files like `01-foo.jpg`, `02-bar.jpg` controls order.
 */
function listGalleryPhotos(): string[] {
  try {
    return fs
      .readdirSync(GALLERY_DIR)
      .filter((f) => PHOTO_EXT.test(f))
      .sort();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Moments from our events and impact campaigns — bringing together the community, the arts, and the causes we serve.",
  alternates: { canonical: "/photo-gallery" },
};

export default function PhotoGalleryPage() {
  const photos = listGalleryPhotos();

  return (
    <main>
      <PageIntro
        eyebrow="Photo Gallery"
        title="Moments from the work."
        subtitle="Events, campaigns, and the people who power them."
      />

      <section className="bg-warm-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {photos.length === 0 ? (
            // Empty state — keeps the page useful while photos are
            // being uploaded. Disappears as soon as any image lands
            // in /public/images/gallery/.
            <Reveal>
              <div className="rounded-2xl border border-dashed border-border bg-cream p-10 text-center">
                <p className="font-display text-2xl italic text-warm-gray">
                  Photos coming soon.
                </p>
                <p className="mt-3 text-sm text-warm-gray/80">
                  Drop image files into{" "}
                  <code className="rounded bg-warm-white px-1.5 py-0.5 font-mono text-[12px] text-ink/80">
                    public/images/gallery/
                  </code>{" "}
                  and they appear here automatically.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              {/* Client component: click any tile to open a full-
                  screen lightbox with a download button. Keyboard:
                  Esc closes, ←/→ paginate. */}
              <GalleryGrid photos={photos} />
            </Reveal>
          )}

          {/* Contact strip — sits below the grid. Email is rendered
              as plain text on purpose (no mailto:), matching the
              pattern used in the Speakers & Workshops modal. */}
          <Reveal delay={120} className="mt-16">
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-cream p-8 text-center sm:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                Plan an event with us
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                Contact us at{" "}
                <span className="font-semibold">
                  {siteConfig.contact.email}
                </span>{" "}
                and let us know how we can help with your event.
              </p>
              <a
                href={siteConfig.external.events}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-base font-semibold text-cream no-underline transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                Our Events
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
