import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const pillars = [
  {
    title: "Mentorship & Youth Arts Education",
    body: "We provide mentoring, workshops, coaching sessions and Experiential Learning opportunities with professional creatives and innovative companies across a wide range of industries. Our coaches’ students have gone on to sign with Disney, Epitaph Records, Capitol, Sony Red, Universal Music Group, and been seen all over the world in festivals and on stages such as Coachella, Lollapalooza, GMA, Jimmy Kimmel, iHeart Music Awards, and many more.",
    image: {
      src: "/images/dale-coaching.png",
      alt: "A Mouseketeer leading a coaching session with a group of young students",
      // Shift the image left within the frame (reveals more of the right side of source)
      objectPosition: "70% center",
    },
  },
  {
    title: "MMC’89 Social Impact Initiative",
    body: "Through our programs and campaigns, we address global challenges related to education, hunger, mental health, poverty, inequality and climate change. We also provide marketing and business management services to nonprofit organizations and socially conscious entrepreneurs who want to create impact — guided by all 17 of the United Nations Global Goals for a better world by 2030.",
    image: {
      src: "/images/mmc89_mmc30.png",
      alt: "Mouseketeers reunited on stage with Mickey Mouse under the MMC'89 logo",
      // Shift focus toward top of source so the mouse ears on the MMC'89 logo aren't clipped
      objectPosition: "center 25%",
    },
  },
];

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
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-white">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  style={
                    "objectPosition" in p.image
                      ? { objectPosition: p.image.objectPosition }
                      : undefined
                  }
                  className="object-cover"
                />
              </div>
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

        <Reveal delay={220} className="mt-12">
          <Link
            href="/programs"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-base font-semibold text-cream no-underline transition-colors hover:bg-ink/90"
          >
            Our Programs & Initiatives
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
