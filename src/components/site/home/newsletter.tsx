import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export function Newsletter() {
  return (
    <section className="bg-ink py-20 text-cream sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            Newsletter
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-cream sm:text-5xl">
            Stay in the Club
          </h2>
          <p className="mt-5 text-lg text-cream/75">
            Subscribe for inspiring stories, creative insights, and the latest
            updates on our initiatives.
          </p>
          <a
            href={siteConfig.external.newsletter}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cream px-7 text-base font-semibold text-ink no-underline transition-colors hover:bg-warm-white hover:text-ink"
          >
            Subscribe to the newsletter
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
