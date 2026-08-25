import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  body?: string;
  /** Optional full-bleed background photo. When set, the hero renders a
   *  photo variant: image + left-dark gradient scrim + light (cream),
   *  left-justified copy. Omit for the default cream text hero. */
  backgroundImage?: string;
  /** object-position for the background photo (e.g. "center 40%"). */
  backgroundPosition?: string;
  /** Optional CTA button rendered in the photo-variant hero. */
  cta?: { label: string; href: string };
};

export function PageIntro({
  eyebrow,
  title,
  subtitle,
  body,
  backgroundImage,
  backgroundPosition,
  cta,
}: Props) {
  if (backgroundImage) {
    return (
      <section className="relative overflow-hidden bg-ink">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          style={
            backgroundPosition
              ? { objectPosition: backgroundPosition }
              : undefined
          }
          className="object-cover"
        />
        {/* Scrims: darker on the left (where the copy sits) fading toward
            the photo on the right, plus a soft bottom grounding. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
        />
        <div className="relative mx-auto flex min-h-[440px] max-w-6xl flex-col justify-center px-5 py-20 sm:min-h-[540px] sm:px-8 sm:py-28">
          <div className="max-w-2xl text-left">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
                {eyebrow}
              </p>
              <h1 className="mt-5 font-display text-[40px] font-medium leading-[1.05] tracking-tight text-cream sm:text-[56px] lg:text-[64px]">
                {title}
              </h1>
            </Reveal>
            {subtitle && (
              <Reveal delay={80}>
                <p className="mt-5 font-display text-2xl italic leading-snug text-cream/90 sm:text-3xl">
                  {subtitle}
                </p>
              </Reveal>
            )}
            {body && (
              <Reveal delay={160}>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/85">
                  {body}
                </p>
              </Reveal>
            )}
            {cta && (
              <Reveal delay={220}>
                <Link
                  href={cta.href}
                  className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-soft transition-colors hover:bg-red-deep hover:text-cream"
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[40px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[56px] lg:text-[64px]">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={80}>
            <p className="mt-5 font-display text-2xl italic leading-snug text-warm-gray sm:text-3xl">
              {subtitle}
            </p>
          </Reveal>
        )}
        {body && (
          <Reveal delay={160}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-warm-gray">
              {body}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
