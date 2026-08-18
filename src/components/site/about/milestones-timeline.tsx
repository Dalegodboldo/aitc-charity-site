"use client";

/**
 * Milestones timeline for the About page's "Where It All Began" section.
 *
 * Ports the "Milestones — From a small fan project to a community of
 * thousands" timeline from mickeymouseclubreunion.com/about-us. Each
 * entry's call-to-action maps to the closest existing destination on
 * this site (the source used Wix lightbox popups that don't exist here):
 *   - "recap"  -> the same origin-story CampaignModal used elsewhere in
 *                 this section (content/campaigns/where-it-all-began.json)
 *   - "book"   -> the site-wide BookModal (via BookModalTrigger)
 *   - internal -> a route on this site (next/link)
 *   - external -> the corresponding mickeymouseclubreunion.com page
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { CampaignModal } from "@/components/site/campaign-modal";
import { BookModalTrigger } from "@/components/site/book-modal-trigger";
import { Reveal } from "@/components/site/reveal";
import { getCampaign, type CampaignPost } from "@/lib/campaigns";

type Action =
  | { kind: "recap"; label: string }
  | { kind: "book"; label: string }
  | { kind: "internal"; href: string; label: string }
  | { kind: "external"; href: string; label: string }
  | null;

type Milestone = {
  year: string;
  title: string;
  body: string;
  action: Action;
};

const ORIGIN_SLUG = "where-it-all-began";

const milestones: Milestone[] = [
  {
    year: "2012",
    title: "AITC begins",
    body: "We launched as a fan-based community in support of one of Tony Lucca's earliest albums, and in support of his appearance as a finalist on NBC's The Voice hosted by Christina Aguilera.",
    action: { kind: "recap", label: "See the recap" },
  },
  {
    year: "2014",
    title: "AITC launches production company",
    body: "Helping raise more than $4M for numerous startup and established charities with leaders in business and entertainment.",
    action: { kind: "internal", href: "/impact", label: "Our impact history" },
  },
  {
    year: "2019",
    title: "#MMC30 at Walt Disney World",
    body: "Co-produced the 30th anniversary reunion of the Mickey Mouse Club with Disney, hosted by NSYNC's Joey Fatone.",
    action: {
      kind: "external",
      href: "https://www.mickeymouseclubreunion.com/mmc30",
      label: "Explore #MMC30",
    },
  },
  {
    year: "2020",
    title: "501(c)(3) formed",
    body: "Always In The Club Foundation incorporates as a federally recognized nonprofit.",
    action: {
      kind: "internal",
      href: "/annual-report-2024",
      label: "Our annual report",
    },
  },
  {
    year: "2022",
    title: "Inaugural 90s Con",
    body: "We kicked off 90s Con with its first ever reunion panel and co-produced the After Party featuring The Party and reunited Mouseketeers.",
    action: {
      kind: "external",
      href: "https://www.mickeymouseclubreunion.com/events",
      label: "Explore 90s Con",
    },
  },
  {
    year: "2024",
    title: "#MMC35",
    body: "Returned to 90s Con to celebrate MMC's 35th anniversary and produce After Party with O-Town and reunited Mouseketeers. Also celebrated at Christmas Con and Las Vegas.",
    action: {
      kind: "external",
      href: "https://www.mickeymouseclubreunion.com/events/hashtags/MMC35",
      label: "Explore #MMC35",
    },
  },
  {
    year: "2024",
    title: "Learn. Grow. Thrive.",
    body: "We launched our first Experiential Learning adventure for young creatives with a trip to Disney Imagination Campus.",
    action: {
      kind: "internal",
      href: "/mentorship-coaching",
      label: "Explore the program",
    },
  },
  {
    year: "2026",
    title: "AITC releases the book",
    body: "Limited Edition True Story of the '90s Mickey Mouse Club supporting our programs, in coffee table, hardcover, paperback, and e-book formats.",
    action: { kind: "book", label: "Get the book" },
  },
];

const ctaClass =
  "group/cta mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep";

const ctaArrow = (
  <ArrowUpRight
    className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0 motion-reduce:group-hover/cta:translate-y-0"
    aria-hidden
  />
);

export function MilestonesTimeline() {
  const [post, setPost] = useState<CampaignPost | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mt-16">
      <Reveal>
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
          Milestones
        </p>
        <h3 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
          From a small fan project to a community of thousands creating
          impact
        </h3>
      </Reveal>

      <ol className="mt-12 space-y-0">
        {milestones.map((m, i) => (
          <Reveal as="li" key={`${m.year}-${m.title}`} delay={(i % 3) * 80}>
            <div className="relative grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7">
              {/* Rail + year marker */}
              <div className="relative flex flex-col items-center">
                <span
                  aria-hidden
                  className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-red ring-4 ring-cream"
                />
                {i < milestones.length - 1 && (
                  <span
                    aria-hidden
                    className="w-px flex-1 bg-border"
                  />
                )}
              </div>
              {/* Content */}
              <div className="pb-12">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {m.year}
                </p>
                <h4 className="mt-1.5 font-display text-xl font-medium leading-snug text-ink">
                  {m.title}
                </h4>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-warm-gray">
                  {m.body}
                </p>
                {m.action?.kind === "recap" && (
                  <button
                    type="button"
                    onClick={() => {
                      const p = getCampaign(ORIGIN_SLUG);
                      if (p) setPost(p);
                    }}
                    aria-haspopup="dialog"
                    className={ctaClass}
                  >
                    {m.action.label}
                    {ctaArrow}
                  </button>
                )}
                {m.action?.kind === "book" && (
                  <BookModalTrigger className={ctaClass}>
                    {m.action.label}
                    {ctaArrow}
                  </BookModalTrigger>
                )}
                {m.action?.kind === "internal" && (
                  <Link href={m.action.href} className={ctaClass}>
                    {m.action.label}
                    {ctaArrow}
                  </Link>
                )}
                {m.action?.kind === "external" && (
                  <a
                    href={m.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass}
                  >
                    {m.action.label}
                    {ctaArrow}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      {mounted &&
        createPortal(
          <CampaignModal post={post} onClose={() => setPost(null)} />,
          document.body
        )}
    </div>
  );
}
