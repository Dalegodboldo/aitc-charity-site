"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CampaignModal } from "@/components/site/campaign-modal";
import { Reveal } from "@/components/site/reveal";
import { getCampaign, type CampaignPost } from "@/lib/campaigns";

type Campaign = {
  /** Which content/campaigns/<slug>.json this card opens. Also used as
   *  the React key, so it must be unique even for href-style cards. */
  slug: string;
  title: string;
  body: string;
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
    /** Extra zoom on top of object-cover. e.g. 1.25 = zoom in 25%. */
    zoom?: number;
    /** transform-origin for the zoom. Defaults to "center top" (keeps
     *  the top, crops the bottom). Use e.g. "center 65%" to crop more
     *  off the top instead. */
    zoomOrigin?: string;
  };
  /** When set, "Read more" links to this internal route (e.g. an All Ears
   *  blog post) instead of opening the campaign modal. */
  href?: string;
};

/** Build the cover <Image> style from a card's image config. */
function imageStyle(
  image: NonNullable<Campaign["image"]>
): CSSProperties | undefined {
  const s: CSSProperties = {};
  if (image.objectPosition) s.objectPosition = image.objectPosition;
  if (image.zoom) {
    s.transform = `scale(${image.zoom})`;
    s.transformOrigin = image.zoomOrigin ?? "center top";
  }
  return Object.keys(s).length ? s : undefined;
}

const campaigns: Campaign[] = [
  {
    slug: "book-sold-out",
    title: "Sold Out for Youth: What Your Support Is Building",
    body: "The limited print editions of the Mickey Mouse Club history sold out — and every purchase supports youth mentorship and arts education. Here's the difference your support is making.",
    image: {
      src: "/images/deedee_jenn_student.png",
      alt: "Deedee Magno Hall and Jennifer McGill with a student in our mentoring program",
      // Zoom in (anchored low) to crop the Imagination Campus logo in
      // the top-left out of the card frame while keeping the trio.
      zoom: 1.5,
      zoomOrigin: "center 70%",
    },
    href: "/blog/book-sold-out-funding-youth-mentorship",
  },
  {
    slug: "chasen-hampton",
    title: "Leader of the Club, Builder of Leaders: Chasen Hampton",
    body: "Chasen Hampton co-hosted the “All New” Mickey Mouse Club. Today he leads Always In The Club and builds the next generation of leaders. Meet the mentor and working artist at the center of our program — and read about his band, Close Enemies, featuring Aerosmith’s Tom Hamilton.",
    image: {
      src: "/images/chasen-daily-mail.avif",
      alt: "Chasen Hampton, lead singer of Close Enemies",
      // Portrait photo in the card's 4:3 frame — bias the crop upward
      // so his face stays in view, then zoom in (anchored to the top)
      // to enlarge him and crop the lower half of his shirt out.
      objectPosition: "center 25%",
      zoom: 1.25,
    },
    href: "/blog/leader-of-the-club-builder-of-leaders-chasen-hampton",
  },
  {
    slug: "mmc36",
    title: "The True Story of the “All New” Mickey Mouse Club",
    body: "Step into the world of the “All New” Mickey Mouse Club with this stunning collector’s book — a one-of-a-kind tribute to the show that defined a generation. Available as eBook/PDF, Hardcover, Paperback, and Coffee Table edition.",
    image: {
      src: "/images/3-e35fc5c.png",
      alt: "Cover of The True Story of the All New Mickey Mouse Club",
    },
  },
  {
    slug: "disney-campus",
    title: "Destination: Disney Imagination Campus",
    body: "Mouseketeers are on a mission to host 1,000 students on once-in-a-lifetime Experiential Learning trips behind the scenes at Disney Parks with Imagineers, professional performers, and company leaders.",
    image: {
      src: "/images/disney-campus-stage.jpg",
      alt: "Students with Mouseketeers on stage at Disney Imagination Campus",
    },
  },
  {
    slug: "mmc35",
    title: "#MMC35 @ 90s Con Daytona",
    body: "When twelve Mouseketeers reunited to celebrate the 35th anniversary of “The All New” Mickey Mouse Club at 90s Con Daytona Beach, they launched our #MMC35 campaign and transformed nostalgia into impact — generating over $62,000 in contributions.",
    image: {
      src: "/images/teers-90scon.jpg",
      alt: "Mouseketeers reunited at 90s Con Daytona Beach",
    },
  },
  {
    slug: "baby-j",
    title: "Whatever Happened to Baby J",
    body: "We were honored to sponsor an evening supporting the AIDS Resource Foundation for Children with a live table read of “Whatever Happened to Baby J,” featuring Jodie Sweetin, Drew Seeley, Dale Godboldo, and a cast of fan favorite stars.",
    image: {
      src: "/images/whatever-baby-j.avif",
      alt: "Whatever Happened to Baby J — live table read",
    },
  },
  {
    slug: "day-of-hope",
    title: "Day of Hope / Evening of Impact",
    body: "After our Day of Hope pampered and empowered survivors of domestic abuse, Rhona Bennett (formerly of En Vogue) joined the women for an Evening of Impact.",
    image: {
      src: "/images/rhona_doh.png",
      alt: "Rhona Bennett with women supported by Day of Hope",
    },
  },
];

export function FeaturedCampaigns() {
  const [openPost, setOpenPost] = useState<CampaignPost | null>(null);

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            Featured Campaigns
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Stories from the Club
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c, i) => (
            <Reveal
              as="li"
              key={c.slug}
              delay={(i % 3) * 80}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-soft-sm transition-shadow duration-300 hover:shadow-soft"
            >
              {/* Card itself isn't clickable — image only does the iris
                  hover reveal; the modal opens only when "Read more" is
                  pressed (button below). */}
              <div className="iris-card relative aspect-[4/3] overflow-hidden bg-cream">
                {c.image ? (
                  <>
                    <div className="absolute inset-0">
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        style={imageStyle(c.image)}
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-red mix-blend-multiply opacity-55"
                      />
                    </div>
                    <div className="iris-back absolute inset-0">
                      <Image
                        src={c.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        style={imageStyle(c.image)}
                        className="object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(171,7,7,0.08),rgba(255,255,255,0)_70%)]">
                    <span className="font-display text-5xl italic text-ink/15">
                      MMC&rsquo;89
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-medium leading-snug text-ink">
                  {c.title}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-warm-gray">
                  {c.body}
                </p>
                {c.href ? (
                  // Card backed by an All Ears blog post — link straight
                  // to it instead of opening the campaign modal.
                  <Link
                    href={c.href}
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
                  >
                    Read more
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const post = getCampaign(c.slug);
                      if (post) setOpenPost(post);
                    }}
                    aria-haspopup="dialog"
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-red transition-colors hover:text-red-deep"
                  >
                    Read more
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-12 text-center">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-base font-semibold text-ink no-underline transition-colors hover:text-red"
          >
            See all of our work
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>

      {/* The popup that renders the chosen campaign's blog post content */}
      <CampaignModal post={openPost} onClose={() => setOpenPost(null)} />
    </section>
  );
}
