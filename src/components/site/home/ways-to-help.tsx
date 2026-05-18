import {
  ArrowUpRight,
  CalendarHeart,
  HandHeart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

const ways = [
  {
    title: "Make a Donation",
    body: "Your contribution helps the Mouseketeers continue our work to promote youth arts education.",
    cta: "Donate",
    href: siteConfig.external.donate,
    Icon: HandHeart,
  },
  {
    title: "Become a Club Member",
    body: "By joining the Club, you become an official member of our family — with exclusive opportunities to reunite with your favorite ’Teers, exclusive media, and discounted merch and event tickets.",
    cta: "Join the Club",
    href: siteConfig.external.clubMembership,
    Icon: Sparkles,
  },
  {
    title: "Shop Always In The Club",
    body: "Shop exclusive and officially licensed items. Profits support our mission to empower young people through mentoring and arts education.",
    cta: "Visit the store",
    href: siteConfig.external.store,
    Icon: ShoppingBag,
  },
  {
    title: "Book Mouseketeers or Sponsor an Event",
    body: "The Mouseketeers support a wide range of causes through year-round events.",
    cta: "Book the ’Teers",
    href: siteConfig.external.bookTeers,
    Icon: CalendarHeart,
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
          {ways.map((w, i) => {
            const Icon = w.Icon;
            const numeral = String(i + 1).padStart(2, "0");
            return (
              <Reveal
                as="li"
                key={w.title}
                delay={i * 80}
                className="group/way h-full"
              >
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream p-7 no-underline shadow-soft-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink/15 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {/* Decorative top accent line that grows on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-out group-hover/way:scale-x-100 motion-reduce:transition-none"
                  />

                  {/* Header row: editorial numeral + animated icon */}
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
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm-gray">
                    {w.body}
                  </p>

                  {/* CTA — arrow slides on hover */}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-colors duration-300 group-hover/way:text-red-deep">
                    {w.cta}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 ease-out group-hover/way:translate-x-0.5 group-hover/way:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/way:translate-x-0 motion-reduce:group-hover/way:translate-y-0"
                      aria-hidden
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
