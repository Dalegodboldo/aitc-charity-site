import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/site/count-up";
import { Reveal } from "@/components/site/reveal";

const stats = [
  {
    value: <CountUp to={4.5} prefix="$" suffix="M+" decimals={1} />,
    label: "raised for charitable causes",
  },
  {
    value: <CountUp to={13000} suffix="+" thousands />,
    label: "served through our MMC'89 community programs",
  },
  {
    value: <CountUp to={3500} suffix="+" thousands />,
    label: "students impacted by our mentors and coaches",
  },
  {
    value: <CountUp to={2500} suffix="+" thousands />,
    label: "trees planted to fight carbon emissions",
  },
];

export function ImpactStats() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Impact at a glance
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Real numbers behind the work
            </h2>
          </div>
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-base font-semibold text-red no-underline transition-colors hover:text-red-deep"
          >
            See our impact
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 80}
              className="rounded-2xl border border-border bg-warm-white px-7 py-10 shadow-soft-sm"
            >
              <p className="font-display text-5xl font-medium leading-none tracking-tight text-red sm:text-[56px]">
                {s.value}
              </p>
              <p className="mt-5 text-base leading-snug text-warm-gray">
                {s.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
