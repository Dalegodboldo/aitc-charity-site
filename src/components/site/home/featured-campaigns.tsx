"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  image?: { src: string; alt: string; objectPosition?: string };
  /** When set, "Read more" links to this internal route (e.g. an All Ears
   *  blog post) instead of opening the campaign modal. */
  href?: string;
};

const campaigns: Campaign[] = [
  {
    slug: "chasen-hampton",
    title: "Leader of the Club, Builder of Leaders",
    body: "Our Executive Director Chasen Hampton went from helping lead the “All New” Mickey Mouse Club to building the next generation of leaders. Meet the mentor and working artist at the center of our program — and read about his band, Close Enemies, featuring Aerosmith’s Tom Hamilton.",
    image: {
      src: "/images/chasen-girl.jpg",
      alt: "Chasen Hampton in an MMC’89 cap with a young performer from the mentoring program",
      objectPosition: "center 35%",
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
  {
    slug: "lastrong",
    title: "#LAStrong Relief Fund",
    body: "As Los Angeles faced one of its most devastating wildfire seasons in history, the MMC’89 #LAStrong Relief Fund mobilized to provide immediate assistance to those affected.",
    image: {
      src: "/images/7cfac6ae-df61-498c-b14b-4a3e504d5c8c-2.jpg",
      alt: "#LAStrong Relief Fund campaign graphic showing firefighters during the LA fires",
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
                        style={
                          c.image.objectPosition
                            ? { objectPosition: c.image.objectPosition }
                            : undefined
                        }
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
                        style={
                          c.image.objectPosition
                            ? { objectPosition: c.image.objectPosition }
                            : undefined
                        }
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
