import Image from "next/image";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  CalendarHeart,
  HandHeart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { DonateTrigger } from "@/components/site/donate-trigger";
import { Reveal } from "@/components/site/reveal";
import { YouTubePosterHero } from "@/components/site/youtube-poster-hero";
import { siteConfig } from "@/lib/site-config";

/** Card hero — either a still image (with optional object-position
 *  override) or a click-to-play YouTube video shown with a custom
 *  poster image and a small play icon (no YouTube chrome until the
 *  visitor actually plays). */
type Hero =
  | { type: "image"; src: string; alt: string; objectPosition?: string }
  | {
      type: "youtube";
      videoId: string;
      title: string;
      posterSrc: string;
      posterAlt: string;
      posterObjectPosition?: string;
    };

type Way = {
  title: string;
  body: ReactNode;
  cta: string;
  Icon: LucideIcon;
  hero: Hero;
} & (
  /** Whole card opens the in-site Donate modal. */
  | { kind: "donate-modal" }
  /** Whole card is a single outbound link. */
  | { kind: "link"; href: string }
  /** Card container is non-clickable; only the CTA link at the bottom
   *  navigates. Use this when the card has its own interactive content
   *  (e.g. a click-to-play video, an inline body link) that shouldn't
   *  bulk-trigger card navigation. */
  | { kind: "compound-link"; href: string }
);

const ways: Way[] = [
  {
    title: "Make a Donation",
    body: "Your contribution helps us empower youth through transformative mentorship and arts education, while helping to build stronger communities and a sustainable future through our MMC’89 Initiative.",
    cta: "Donate",
    kind: "donate-modal",
    Icon: HandHeart,
    hero: {
      type: "image",
      src: "/images/chasen-girl.jpg",
      alt: "Chasen Hampton mentoring a young student",
      // Nudge the crop downward (image content shifts down within the
      // frame) so the top of the photo shows more head-room rather than
      // a tight centred crop.
      objectPosition: "50% 20%",
    },
  },
  {
    title: "Become a Club Member",
    body: "By joining the Club, you become an official member of our family with exclusive opportunities to reunite with your favorite ’Teers, exclusive media, and discounted merch and event tickets.",
    cta: "Join the Club",
    kind: "link",
    href: siteConfig.external.clubMembership,
    Icon: Sparkles,
    hero: {
      type: "image",
      src: "/images/vegas.png",
      alt: "Mouseketeers reunited in Las Vegas",
    },
  },
  {
    title: "Shop Always In The Club",
    body: "Shop exclusive and officially licensed items. Profits support our mission to empower young people through mentoring and arts education.",
    cta: "Visit the store",
    kind: "link",
    href: siteConfig.external.store,
    Icon: ShoppingBag,
    hero: {
      type: "image",
      src: "/images/shop-bundle-2.png",
      alt: "Always In The Club store bundle",
    },
  },
  {
    title: "Book Mouseketeers or Sponsor an Event",
    body: (
      <>
        <p>
          The Mouseketeers support a wide range of causes through year-round
          events.
        </p>
        <p>
          Lindsey Alley’s hilarious one-woman show was performed at Walt
          Disney World supporting Give Kids the World Village.{" "}
          <a
            href="https://mmcreunion.com/products/lindsey-alleys-blood-sweat-and-mouseketears-live-at-walt-disney-world"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red underline underline-offset-2 decoration-red/40 transition-colors hover:text-red-deep hover:decoration-red-deep"
          >
            Stream it
          </a>
          .
        </p>
      </>
    ),
    cta: "Book the ’Teers",
    kind: "compound-link",
    href: siteConfig.external.bookTeers,
    Icon: CalendarHeart,
    hero: {
      type: "youtube",
      videoId: "gtC1fE4XBlw",
      title: "Book the Mouseketeers — performance reel",
      posterSrc: "/images/Lindsey_Alley.png",
      posterAlt: "Lindsey Alley — Blood, Sweat and Mouseketears, live at Walt Disney World",
    },
  },
];

const CARD_CLASSES =
  "group/way relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream text-left no-underline shadow-soft-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink/15 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export function WaysToHelp() {
  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            Ways to Help
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Four easy ways to make an impact
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map((w, i) => {
            const Icon = w.Icon;
            const numeral = String(i + 1).padStart(2, "0");
            const ctaContent = (
              <>
                {w.cta}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover/way:translate-x-0.5 group-hover/way:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/way:translate-x-0 motion-reduce:group-hover/way:translate-y-0"
                  aria-hidden
                />
              </>
            );
            const ctaInlineFlex =
              "mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-red transition-colors duration-300 group-hover/way:text-red-deep";
            const cta =
              w.kind === "compound-link" ? (
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctaInlineFlex} no-underline hover:text-red-deep`}
                >
                  {ctaContent}
                </a>
              ) : (
                <span className={ctaInlineFlex}>{ctaContent}</span>
              );
            const inner = (
              <>
                {/* Hero — sits flush at the top of the card. Either a
                    still image (with subtle hover zoom) or a YouTube
                    iframe (the iframe captures its own clicks for the
                    YouTube player; the rest of the card still routes to
                    the card's CTA). */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-white">
                  {w.hero.type === "image" ? (
                    <Image
                      src={w.hero.src}
                      alt={w.hero.alt}
                      fill
                      sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                      style={
                        w.hero.objectPosition
                          ? { objectPosition: w.hero.objectPosition }
                          : undefined
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover/way:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover/way:scale-100"
                    />
                  ) : (
                    <YouTubePosterHero
                      videoId={w.hero.videoId}
                      title={w.hero.title}
                      posterSrc={w.hero.posterSrc}
                      posterAlt={w.hero.posterAlt}
                      posterSizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                      posterObjectPosition={w.hero.posterObjectPosition}
                    />
                  )}
                  {/* Decorative top accent line that grows on hover — pinned
                      to the card edge above the hero */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-out group-hover/way:scale-x-100 motion-reduce:transition-none"
                  />
                </div>

                {/* Body — numeral + icon row, title, copy, CTA */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-[28px] italic font-medium leading-none text-gold transition-colors duration-300 group-hover/way:text-red">
                      Nº {numeral}
                    </span>
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red/10 text-red transition-all duration-500 ease-out group-hover/way:rotate-[-8deg] group-hover/way:scale-110 group-hover/way:bg-red group-hover/way:text-cream motion-reduce:transition-none motion-reduce:group-hover/way:rotate-0 motion-reduce:group-hover/way:scale-100">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-xl font-medium leading-snug text-ink transition-colors duration-300 group-hover/way:text-red">
                    {w.title}
                  </h3>
                  <div className="mt-3 flex-1 space-y-3 text-[15px] leading-relaxed text-warm-gray">
                    {typeof w.body === "string" ? <p>{w.body}</p> : w.body}
                  </div>

                  {cta}
                </div>
              </>
            );
            return (
              <Reveal
                as="li"
                key={w.title}
                delay={i * 80}
                className="group/way h-full"
              >
                {w.kind === "donate-modal" ? (
                  <DonateTrigger className={CARD_CLASSES}>{inner}</DonateTrigger>
                ) : w.kind === "compound-link" ? (
                  <div className={CARD_CLASSES}>{inner}</div>
                ) : (
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CARD_CLASSES}
                  >
                    {inner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
