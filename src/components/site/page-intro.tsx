import { Reveal } from "@/components/site/reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  body?: string;
};

export function PageIntro({ eyebrow, title, subtitle, body }: Props) {
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
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-warm-gray">
              {body}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
