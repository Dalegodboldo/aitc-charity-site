import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

const ways = [
  {
    title: "Make a Donation",
    body: "Your contribution helps the Mouseketeers continue our work to promote youth arts education.",
    cta: "Donate",
    href: siteConfig.external.donate,
  },
  {
    title: "Become a Club Member",
    body: "By joining the Club, you become an official member of our family — with exclusive opportunities to reunite with your favorite ’Teers, exclusive media, and discounted merch and event tickets.",
    cta: "Join the Club",
    href: siteConfig.external.clubMembership,
  },
  {
    title: "Shop Always In The Club",
    body: "Shop exclusive and officially licensed items. Profits support our mission to empower young people through mentoring and arts education.",
    cta: "Visit the store",
    href: siteConfig.external.store,
  },
  {
    title: "Book Mouseketeers or Sponsor an Event",
    body: "The Mouseketeers support a wide range of causes through year-round events.",
    cta: "Book the ’Teers",
    href: siteConfig.external.bookTeers,
  },
];

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
          {ways.map((w, i) => (
            <Reveal
              as="li"
              key={w.title}
              delay={i * 80}
              className="flex h-full flex-col rounded-2xl border border-border bg-cream p-7 shadow-soft-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 font-display text-lg font-medium text-red">
                {i + 1}
              </div>
              <h3 className="mt-5 font-display text-xl font-medium leading-snug text-ink">
                {w.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm-gray">
                {w.body}
              </p>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
              >
                {w.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
