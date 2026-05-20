import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { StudentSpotlightTrigger } from "@/components/site/student-spotlight";
import { YouTubeEmbed } from "@/components/site/youtube-embed";

type ImageData = {
  src: string;
  alt: string;
  objectPosition?: string;
  /** Extra inline style applied to the <Image>, e.g. for scale/origin. */
  imgStyle?: React.CSSProperties;
};

const pillars: {
  title: string;
  body: string[];
  image: ImageData;
  imageBack: ImageData;
  /** If true, render the Student Spotlight CTA + modal trigger in the body. */
  spotlight?: boolean;
  /** If true, render the "Our Programs & Initiatives" button in the body. */
  programsLink?: boolean;
}[] = [
  {
    title: "Mentorship & Youth Arts Education",
    spotlight: true,
    body: [
      "We provide mentoring, workshops, coaching sessions and Experiential Learning opportunities with professional creatives and innovative companies across a wide range of industries.",
      "Our coaches’ students have gone on to sign with Disney, Epitaph Records, Capitol, Sony Red, Universal Music Group, and been seen all over the world in festivals and on stages such as Coachella, Lollapalooza, GMA, Jimmy Kimmel, iHeart Music Awards, and many more.",
    ],
    image: {
      src: "/images/dale-coaching.png",
      alt: "A Mouseketeer leading a coaching session with a group of young students",
      objectPosition: "70% center",
    },
    imageBack: {
      src: "/images/disney-shot-on-stage.webp",
      alt: "Students with Mouseketeers on stage at Disney Imagination Campus",
      // Anchor to the right so the "Always in the Club" logo on the right is fully visible
      objectPosition: "right center",
    },
  },
  {
    title: "MMC’89 Social Impact Initiative",
    programsLink: true,
    body: [
      "Through our programs and campaigns, we address global challenges related to education, hunger, mental health, poverty, inequality and climate change.",
      "We also provide marketing and business management services to nonprofit organizations and socially conscious entrepreneurs who want to create impact — guided by all 17 of the United Nations Global Goals for a better world by 2030.",
    ],
    image: {
      src: "/images/mmc89_mmc30.png",
      alt: "Mouseketeers reunited on stage with Mickey Mouse under the MMC'89 logo",
      objectPosition: "center 25%",
    },
    imageBack: {
      src: "/images/Second%20Harvest-logo.png",
      alt: "Mouseketeers at Second Harvest Food Bank: sorted 4,000 pounds of food = more than 3,000 meals for people in need",
    },
  },
];

/**
 * Iris / spotlight reveal: the front photo is the always-visible base;
 * on hover, the back photo is unmasked from the center outward via an
 * expanding circular clip-path. Both states are class-based so the
 * cascade resolves cleanly (an inline clip-path would beat any
 * hover rule on specificity).
 */
function FlipImage({ front, back }: { front: ImageData; back: ImageData }) {
  return (
    <button
      type="button"
      aria-label="Reveal the second photo"
      className="iris-card group relative block aspect-[16/10] w-full overflow-hidden bg-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red"
    >
      {/* Front (base, always visible) — tinted with a red film that the
          iris reveal "uncovers" to show the back image in true colour */}
      <div className="absolute inset-0">
        <Image
          src={front.src}
          alt={front.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          style={{
            ...(front.objectPosition ? { objectPosition: front.objectPosition } : {}),
            ...(front.imgStyle ?? {}),
          }}
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-red mix-blend-multiply opacity-55"
        />
      </div>
      {/* Back (spotlight reveal — clip-path defined in the <style> block below
          so the default and hover states share specificity and transition cleanly) */}
      <div className="iris-back absolute inset-0 motion-reduce:!transition-none">
        <Image
          src={back.src}
          alt={back.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          style={{
            ...(back.objectPosition ? { objectPosition: back.objectPosition } : {}),
            ...(back.imgStyle ?? {}),
          }}
          className="object-cover"
        />
      </div>
      {/* Subtle hint that there's a second image — fades out once the
          back photo is revealed (hover on desktop, tap-focus on touch). */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0 group-focus-within:opacity-0"
      >
        Hover
      </span>
    </button>
  );
}

export function OurMission() {
  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            Our Mission
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Mentorship & Social Impact
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {pillars.map((p, i) => (
            <Reveal
              as="article"
              key={p.title}
              delay={i * 100}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-cream shadow-soft-sm"
            >
              <FlipImage front={p.image} back={p.imageBack} />
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <h3 className="font-display text-2xl font-medium leading-snug text-ink sm:text-[28px]">
                  {p.title}
                </h3>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-warm-gray">
                  {p.body.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
                {p.spotlight && (
                  <>
                    <StudentSpotlightTrigger />
                    {/* mt-auto pins the CTA to the bottom of the card so
                        it lines up flush with the MMC'89 card's button. */}
                    <a
                      href="https://www.Learn-Grow-Thrive.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-ink px-7 py-3 text-base font-semibold text-cream no-underline transition-colors hover:bg-ink/90"
                    >
                      Apply for Mentor / Book a Coach or Workshop
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </a>
                  </>
                )}
                {p.programsLink && (
                  <>
                    {/* Official UN Sustainable Development Goals logo —
                        transparent PNG so the cream card shows through.
                        Spans the full copy width; mb-6 keeps a gap above
                        the button. */}
                    <Image
                      src="/images/un-sdg-logo-horizontal.png"
                      alt="United Nations Sustainable Development Goals"
                      width={2459}
                      height={450}
                      sizes="(min-width: 1024px) 480px, 90vw"
                      className="mt-6 mb-6 h-auto w-full"
                      unoptimized
                    />
                    {/* mt-auto pins the CTA to the bottom of the card so
                        it lines up flush with the Mentorship card's button. */}
                    <Link
                      href="/programs"
                      className="mt-auto inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-ink px-7 text-base font-semibold text-cream no-underline transition-colors hover:bg-ink/90"
                    >
                      Our Programs & Initiatives
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-16">
          <YouTubeEmbed
            videoId="Cm3cnYSAV-w"
            title="Why? Because It's Christmas — Always In The Club Foundation × MusiCares"
            posterSrc="/images/mmc-holidays-musicares-facebook-event-cover.jpg"
            posterAlt="Why Because It's Christmas — Now Streaming, benefiting MusiCares"
          />
        </Reveal>

        <Reveal delay={280} className="mt-8">
          <p className="max-w-md text-[15px] leading-relaxed text-warm-gray">
            Stream the{" "}
            <a
              href="https://mmcreunion.com/products/15-day-rental"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display italic text-red transition-colors hover:text-red-deep"
            >
              Why? Because It&rsquo;s Christmas in Nashville Concert
            </a>{" "}
            supporting music people in need.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
