import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Quote, Sparkles } from "lucide-react";
import { OriginStoryTrigger } from "@/components/site/about/origin-story-trigger";
import { BookModalTrigger } from "@/components/site/book-modal-trigger";
import { ImageLightbox } from "@/components/site/image-lightbox";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Inspired by the 'All New' Mickey Mouse Club and built by reunited cast members. Learn how Always In The Club Foundation began.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="A foundation built on lifelong friendship"
        body="The ’90s Mickey Mouse Club helped raise a generation of socially conscious artists, entrepreneurs and humanitarians. Today, that family of Mouseketeers and thousands of fans continue to make a difference."
      />

      {/* About the 'All New' Mickey Mouse Club */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              The Show
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              About the &ldquo;All New&rdquo; Mickey Mouse Club
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-10 space-y-6 text-base leading-relaxed text-warm-gray">
            <p>
              Filmed at Hollywood Studios in Walt Disney World, The &ldquo;All
              New&rdquo; Mickey Mouse Club debuted in 1989 on the Disney
              Channel. Mouseketeers were chosen by Disney from all over the
              country and represented a variety of races, religions and skill
              sets — each chosen because they individually represented
              something exceptional.
            </p>
            <p>
              Cast members have gone on to play a pivotal role in shaping the
              last 30 years of popular culture with critically acclaimed and
              wildly successful projects across music, film, television and
              theater, and they&rsquo;re still making an impact today.
              Recognizing their place as lifelong ambassadors of the Disney
              brand, many have leveraged their global influence to help raise
              millions of dollars for nonprofits around the world.
            </p>
          </Reveal>

          {/* Book promo banner — links out to /about-mmc and the book store */}
          <Reveal delay={140} className="mt-12">
            <ImageLightbox
              src="/images/Cast-Photo-Book-Branding.png"
              alt="Always In The Club: The True Story of the All-New Mickey Mouse Club — cast photo and book branding"
              width={1800}
              height={570}
              sizes="(min-width: 1024px) 768px, 100vw"
              wrapperClassName="rounded-2xl border border-border shadow-soft-sm"
            />
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <BookModalTrigger className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-semibold text-cream no-underline transition-colors hover:bg-red-deep hover:text-cream">
                <BookOpen className="h-4 w-4" aria-hidden />
                Get the true story
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </BookModalTrigger>
              <a
                href="https://www.mickeymouseclubreunion.com/about-mmc"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-base font-semibold text-red no-underline transition-colors hover:text-red-deep"
              >
                Learn more about MMC
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <figure className="my-14 rounded-2xl border border-border bg-cream p-8 sm:p-10">
              <Quote className="h-7 w-7 text-gold" aria-hidden />
              <blockquote className="mt-4 font-display text-2xl italic leading-snug text-ink sm:text-[28px]">
                What an incredible honor it has been representing one of
                Walt&rsquo;s passion projects. The show helped in raising us to
                be socially conscious and gave us the ultimate gift of the
                exposure to each other&rsquo;s beliefs, skills, and backgrounds
                to learn, grow and build upon.
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-warm-gray">
                Chasen Hampton <span className="text-gold">— Mouseketeer</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Where It All Began */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Origin
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Where It All Began
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10 text-base leading-relaxed text-warm-gray">
            <p>
              Always In The Club was founded in 2012 as a fan community and
              fiscally sponsored program. Since then, we have grown into a
              thriving 501(c)(3) nonprofit serving those in need. We have
              supported dozens of organizations and produced numerous events
              featuring global leaders in entertainment, business and
              government.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <OriginStoryTrigger />
            <Link
              href="/programs"
              className="group inline-flex items-center gap-1.5 text-base font-semibold text-red no-underline transition-colors hover:text-red-deep"
            >
              Learn more about our Programs
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <figure>
              <ImageLightbox
                src="/images/mmc30-confetti-mickey-fist-pump.jpg"
                alt="Mouseketeers and Mickey Mouse celebrating with confetti and fists raised in the air"
                width={3000}
                height={1251}
                sizes="(min-width: 1024px) 768px, 100vw"
                wrapperClassName="rounded-2xl border border-border shadow-soft-sm"
              />
              <figcaption className="mt-3 text-center text-[12px] italic leading-snug text-warm-gray">
                <a
                  href="https://www.mickeymouseclubreunion.com/mmc30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red underline underline-offset-2 transition-colors hover:text-red-deep"
                >
                  #MMC30
                </a>
                {" "}— Cast &amp; Crew reunion at Walt Disney World® Resort
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={80} className="mt-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Get Involved
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              There&rsquo;s a place for you in the Club
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-8 text-base leading-relaxed text-warm-gray">
            <p>
              Whether you&rsquo;re interested in volunteering, donating, or
              simply learning more about us, there are plenty of ways to get
              involved. We welcome individuals and groups of all backgrounds
              and experience levels.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <aside className="mt-10 flex items-start gap-4 rounded-2xl border border-gold/40 bg-gold/10 p-6 sm:p-7">
              <Sparkles className="h-6 w-6 shrink-0 text-gold" aria-hidden />
              <p className="text-[16px] leading-relaxed text-ink">
                <span className="font-semibold">Are you a Disney employee?</span>{" "}
                We are an approved charity for the Disney Matching Gifts and
                VoluntEARS Grants programs.
              </p>
            </aside>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-10 text-base leading-relaxed text-ink">
              Email us to get involved:{" "}
              <span className="font-semibold">{siteConfig.contact.email}</span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
