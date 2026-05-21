import Image from "next/image";
import { BookModalTrigger } from "@/components/site/book-modal-trigger";
import { DonateTrigger } from "@/components/site/donate-trigger";
import { HeroVideo } from "@/components/site/hero-video";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32">
      {/* Soft gold-to-cream wash behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_20%_0%,rgba(171,7,7,0.06),transparent_70%)]"
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
          <p className="mt-6 max-w-xl font-display text-lg italic leading-snug text-warm-gray sm:text-xl">
            Using our E.A.R.S. to make a difference.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <DonateTrigger className="inline-flex h-12 items-center justify-center rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream">
              Donate
            </DonateTrigger>
            <BookModalTrigger className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-warm-white px-7 text-base font-semibold text-ink no-underline transition-colors hover:border-ink/35 hover:text-ink">
              Get the MMC Book
            </BookModalTrigger>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <HeroVideo
            vimeoId="1013461750"
            title="Always In The Club Foundation — our story"
            posterSrc="/images/disney-campus.png"
            posterAlt="Students cheering with Mouseketeers at Walt Disney World"
            seal={
              <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-cream shadow-soft-sm">
                <Image
                  src="/images/AITCF-CREATE%20IMPACT%20NOW%20-%202.png"
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            }
          />
          {/* Primary CTA sits directly beneath the hero video, full-width
              so it lines up flush with the player above it. */}
          <a
            href="https://www.mickeymouseclubreunion.com/mentorship-coaching"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream"
          >
            Apply for a Mentor or Book a Coach
          </a>
        </Reveal>
      </div>
    </section>
  );
}
