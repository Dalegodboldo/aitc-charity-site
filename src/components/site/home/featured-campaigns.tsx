import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

type Campaign = {
  title: string;
  body: string;
  href: string;
  image?: { src: string; alt: string };
};

const campaigns: Campaign[] = [
  {
    title: "The True Story of the “All New” Mickey Mouse Club",
    body: "Step into the world of the “All New” Mickey Mouse Club with this stunning collector’s book — a one-of-a-kind tribute to the show that defined a generation. Available as eBook/PDF, Hardcover, Paperback, and Coffee Table edition.",
    href: siteConfig.external.book,
    image: {
      src: "/images/3-e35fc5c.png",
      alt: "Cover of The True Story of the All New Mickey Mouse Club",
    },
  },
  {
    title: "Destination: Disney Imagination Campus",
    body: "Mouseketeers are on a mission to host 1,000 students on once-in-a-lifetime Experiential Learning trips behind the scenes at Disney Parks with Imagineers, professional performers, and company leaders.",
    href: "https://www.mickeymouseclubreunion.com/post/destination-disney-imagination-campus-walt-disney-world",
    image: {
      src: "/images/disney-shot-on-stage.webp",
      alt: "Students with Mouseketeers at the Disney Imagination Campus",
    },
  },
  {
    title: "#MMC35 @ 90s Con Daytona",
    body: "When twelve Mouseketeers reunited to celebrate the 35th anniversary of “The All New” Mickey Mouse Club at 90s Con Daytona Beach, they launched our #MMC35 campaign and transformed nostalgia into impact — generating over $62,000 in contributions.",
    href: "https://www.mickeymouseclubreunion.com/post/mmc35-90s-con-daytona-beach",
    image: {
      src: "/images/teers-90scon.jpg",
      alt: "Mouseketeers reunited at 90s Con Daytona Beach",
    },
  },
  {
    title: "Whatever Happened to Baby J",
    body: "We were honored to sponsor an evening supporting the AIDS Resource Foundation for Children with a live table read of “Whatever Happened to Baby J,” featuring Jodie Sweetin, Drew Seeley, and a cast of fan favorites.",
    href: "https://www.mickeymouseclubreunion.com/post/whatever-happened-to-baby-j",
  },
  {
    title: "Day of Hope / Evening of Impact",
    body: "After our Day of Hope pampered and empowered survivors of domestic abuse, En Vogue’s Rhona Bennett joined the women for an Evening of Impact.",
    href: "https://www.mickeymouseclubreunion.com/post/en-vogue-s-rhona-bennett-hosts-changemakers-networking-night",
    image: {
      src: "/images/rhona_doh.png",
      alt: "Rhona Bennett with women supported by Day of Hope",
    },
  },
  {
    title: "#LAStrong Relief Fund",
    body: "As Los Angeles faced one of its most devastating wildfire seasons in history, the MMC’89 #LAStrong Relief Fund mobilized to provide immediate assistance to those affected.",
    href: "https://www.mickeymouseclubreunion.com/post/doing-what-we-can-the-mmc-89-fire-relief-fund",
    image: {
      src: "/images/7cfac6ae-df61-498c-b14b-4a3e504d5c8c-2.jpg",
      alt: "#LAStrong Relief Fund campaign graphic showing firefighters during the LA fires",
    },
  },
];

export function FeaturedCampaigns() {
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
              key={c.title}
              delay={(i % 3) * 80}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-soft-sm transition-shadow duration-300 hover:shadow-soft"
            >
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col no-underline"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  {c.image ? (
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(200,146,42,0.18),rgba(247,242,232,0)_70%)]">
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
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-colors group-hover:text-red-deep">
                    Read more
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </a>
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
    </section>
  );
}
