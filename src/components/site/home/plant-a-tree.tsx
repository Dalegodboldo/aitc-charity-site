import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export function PlantATree() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid items-center gap-10 rounded-2xl border border-border bg-warm-white px-7 py-12 shadow-soft-sm sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-16 lg:py-20">
            <div className="order-2 lg:order-1">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
                Global Goals
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                Join Us to Reforest the World
              </h2>
              <p className="mt-5 text-lg text-warm-gray">
                When you make a purchase or donate in our{" "}
                <a
                  href="https://mmcreunion.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red underline underline-offset-2 transition-colors hover:text-red-deep"
                >
                  Club Store
                </a>
                , we plant a tree in your name to help offset global carbon
                emissions. Thanks to the generosity of our supporters, we have
                proudly planted more than 2,500 trees around the world.
              </p>
              <a
                href="https://tree-nation.com/profile/impact/always-in-the-club-foundation#co2"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-cream px-7 text-base font-semibold text-ink no-underline transition-colors hover:border-ink/35"
              >
                Visit Our Forest
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <Image
                src="/images/aitc-logo-forest.png"
                alt="Always In The Club Foundation forest emblem"
                width={2025}
                height={1518}
                sizes="(min-width: 1024px) 540px, 90vw"
                className="mx-auto h-auto w-full max-w-[420px] rounded-2xl"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
