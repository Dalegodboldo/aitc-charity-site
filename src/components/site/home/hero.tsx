import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32">
      {/* Soft gold-to-cream wash behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_20%_0%,rgba(200,146,42,0.10),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            {siteConfig.name}
          </p>
          <h1 className="mt-5 font-display text-[44px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[60px] lg:text-[72px]">
            Education, Arts, Resources…{" "}
            <em className="italic text-red">Social Impact</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-warm-gray sm:text-xl">
            Using our E.A.R.S. to make a difference.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={siteConfig.external.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream"
            >
              Donate
            </a>
            <a
              href={siteConfig.external.book}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-warm-white px-7 text-base font-semibold text-ink no-underline transition-colors hover:border-ink/35 hover:text-ink"
            >
              Get the MMC Book
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/[0.04]">
            <Image
              src="/images/teers-concert-cropped.jpg"
              alt="Mouseketeers performing together on stage"
              fill
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent"
            />
          </div>
          {/* Decorative gold corner tab */}
          <div
            aria-hidden
            className="absolute -bottom-3 -left-3 hidden h-20 w-20 rounded-2xl border border-gold/40 bg-cream/80 backdrop-blur sm:block"
          />
        </Reveal>
      </div>
    </section>
  );
}
