import type { Metadata } from "next";
import { ArrowUpRight, Check, Mail, Newspaper } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Mouseketeer Roundup",
  description:
    "A monthly update on your favorite Mouseketeers making an impact in the entertainment industry and in their communities, delivered straight to your inbox.",
};

const SIGNUP_URL = "https://stats.sender.net/forms/dwWNMd/view";

const issues = [
  {
    month: "May",
    year: "2026",
    href: "https://share.sender.net/campaigns/fXxG/mouseketeer-roundup-may",
  },
  {
    month: "April",
    year: "2026",
    href: "https://share.sender.net/campaigns/fiqk/mouseketeer-roundup-april",
  },
  {
    month: "March",
    year: "2026",
    href: "https://share.sender.net/campaigns/d7pe/mouseketeer-roundup-march",
  },
];

const benefits = [
  "News and projects from your favorite Mouseketeers in entertainment",
  "Mentorship and community-impact moments from across the Club",
  "Programs, events, and ways to support what we are building",
];

export default function MouseketeerRoundupPage() {
  return (
    <>
      <PageIntro
        eyebrow="Newsletter"
        title="Mouseketeer Roundup"
        body="A monthly update on your favorite Mouseketeers making an impact in the entertainment industry and in their communities, delivered straight to your inbox."
      />

      {/* Primary subscribe block */}
      <section className="bg-warm-white pb-16 pt-4 sm:pb-20 sm:pt-8">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-cream p-8 shadow-soft-sm sm:p-10">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-red" />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red text-cream shadow-soft-sm">
                <Mail className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                Get the Roundup in your inbox
              </h2>
              <p className="mt-4 text-base leading-relaxed text-warm-gray">
                One email a month, focused on what the Mouseketeers are
                doing and the impact they are making.
              </p>
              <ul className="mt-6 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="text-[15px] leading-snug text-warm-gray">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream"
              >
                Subscribe
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Past issues */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Recent issues
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              See what subscribers are reading
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warm-gray">
              A look at the last few Roundups so you know what to expect.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((iss, i) => (
              <Reveal as="li" key={iss.month} delay={i * 80}>
                <a
                  href={iss.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-warm-white p-7 no-underline shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-cream">
                    <Newspaper className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                    {iss.month} {iss.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink">
                    Mouseketeer Roundup
                  </h3>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-warm-gray">
                    A recap of Mouseketeers in entertainment, in their
                    communities, and at the foundation.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-colors group-hover:text-red-deep">
                    Read this issue
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-warm-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Join the Roundup
            </h2>
            <p className="mt-5 text-base leading-relaxed text-warm-gray">
              Free, one email a month, unsubscribe any time.
            </p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream"
            >
              Subscribe to the Roundup
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
