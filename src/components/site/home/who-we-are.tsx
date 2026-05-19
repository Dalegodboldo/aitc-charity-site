import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export function WhoWeAre() {
  return (
    <section className="bg-warm-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            Who We Are
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Inspired by the{" "}
            <span className="text-red">&apos;90s Mickey Mouse Club</span>
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10 space-y-6 text-base leading-relaxed text-warm-gray lg:text-center">
          <p>
            The &ldquo;All New&rdquo; Mickey Mouse Club premiered in 1989 on
            the Disney Channel. Much more than a variety show, it tackled
            important social issues of the day.
          </p>
          <p>
            And as a performing arts academy, it trained some of the biggest
            stars in the world, including Keri Russell, Ryan Gosling, Justin
            Timberlake, Christina Aguilera, Britney Spears, Hallmark
            Channel&rsquo;s Nikki DeLoach, NSYNC&rsquo;s JC Chasez, and Rhona
            Bennett (formerly of En Vogue), among many others.
          </p>
        </Reveal>

        <Reveal delay={160} className="my-12 flex justify-center">
          <p className="text-center font-display text-2xl italic leading-snug text-ink sm:text-3xl">
            Once in the Club…{" "}
            <a
              href={siteConfig.external.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold not-italic text-red no-underline transition-colors hover:text-red-deep"
            >
              #AlwaysInTheClub
            </a>
          </p>
        </Reveal>

        <Reveal delay={240} className="space-y-6 text-base leading-relaxed text-warm-gray lg:text-center">
          <p>
            Reunited Mouseketeers and more than 10,000 long-time fans helped
            launch Always In The Club Foundation and our{" "}
            <strong className="font-semibold text-ink">
              MMC&rsquo;89 Initiative
            </strong>{" "}
            to support those who need it most through projects, programs and
            outreach campaigns led by cast members of the now iconic show.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
