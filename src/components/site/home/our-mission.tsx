import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
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
  body: string;
  image: ImageData;
  imageBack: ImageData;
}[] = [
  {
    title: "Mentorship & Youth Arts Education",
    body: "We provide mentoring, workshops, coaching sessions and Experiential Learning opportunities with professional creatives and innovative companies across a wide range of industries. Our coaches’ students have gone on to sign with Disney, Epitaph Records, Capitol, Sony Red, Universal Music Group, and been seen all over the world in festivals and on stages such as Coachella, Lollapalooza, GMA, Jimmy Kimmel, iHeart Music Awards, and many more.",
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
    body: "Through our programs and campaigns, we address global challenges related to education, hunger, mental health, poverty, inequality and climate change. We also provide marketing and business management services to nonprofit organizations and socially conscious entrepreneurs who want to create impact — guided by all 17 of the United Nations Global Goals for a better world by 2030.",
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
 * Cinematic crossfade reveal: on hover, the front photo slowly fades
 * out while zooming in slightly, and the back photo fades in while
 * settling from a slight zoom — like a slow-motion photographic
 * transition. Reads as editorial rather than gimmicky.
 */
function FlipImage({ front, back }: { front: ImageData; back: ImageData }) {
  return (
    <div className="group/flip relative aspect-[16/10] w-full overflow-hidden bg-warm-white">
      {/* Back face (revealed underneath) */}
      <div className="absolute inset-0 origin-center scale-[1.08] opacity-0 transition-[opacity,transform] duration-[900ms] ease-out group-hover/flip:scale-100 group-hover/flip:opacity-100 motion-reduce:transition-none motion-reduce:duration-0">
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
      {/* Front face (sits on top until hover) */}
      <div className="absolute inset-0 origin-center scale-100 opacity-100 transition-[opacity,transform] duration-[900ms] ease-out group-hover/flip:scale-[1.06] group-hover/flip:opacity-0 motion-reduce:transition-none motion-reduce:duration-0">
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
      </div>
      {/* Subtle hint that there's a second image — only visible until first hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm opacity-100 transition-opacity duration-500 group-hover/flip:opacity-0"
      >
        Hover
      </span>
    </div>
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
                <p className="mt-5 text-[17px] leading-relaxed text-warm-gray">
                  {p.body}
                </p>
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

        <Reveal
          delay={280}
          className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
        >
          <Link
            href="/programs"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 text-base font-semibold text-cream no-underline transition-colors hover:bg-ink/90"
          >
            Our Programs & Initiatives
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
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
