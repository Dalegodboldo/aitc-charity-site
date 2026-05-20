import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  Mic2,
  Shield,
  Sparkles,
  Sun,
  TreePine,
  Users,
  Utensils,
} from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/site/count-up";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Mouseketeers have helped raise more than $4.5 million in support of youth education, mentoring, critically ill children, and many other causes.",
};

type ImpactCard = {
  title: string;
  body: string;
  image: {
    src: string;
    alt: string;
    objectPosition?: string;
    /** "cover" (default) crops to fill; "contain" mattes the whole image. */
    fit?: "cover" | "contain";
  };
  Icon: LucideIcon;
  /** Big anchor number rendered as a CountUp at the top of the card. */
  stat: {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    thousands?: boolean;
    decimals?: number;
  };
  /** Optional CTA at the foot of the card — links to the campaign report. */
  cta?: { label: string; href: string };
};

/**
 * Featured activation — pulled out of the grid because it's the youth-
 * education arm of the DIS Family Reunion (the global broadcast that
 * activated the 2,000 delegates already credited on that card).
 */
const featured = {
  eyebrow: "Featured activation",
  kicker: "Youth Education & Mentorship",
  title: "Global Broadcast from Disney World to 2,000 Youth Delegates",
  body: "Our livestream from Walt Disney World Resort reached more than 2,000 youth delegates around the world — in-depth conversations with Disney icons, humanitarians and business leaders, including Lee Cockerell (former EVP, Walt Disney World), Pamela Landwirth (CEO, Give Kids The World) and Jodi Benson (the voice of Ariel in The Little Mermaid).",
  image: {
    src: "/images/DIS-famility-2000-delegates.png",
    alt: "2,000 youth delegates broadcast from Walt Disney World",
  },
  Icon: GraduationCap,
  stat: { value: 2000, suffix: "+", thousands: true, label: "youth delegates reached" },
  cta: {
    label: "See recap",
    href: "https://www.canva.com/design/DAF7Zy0aTyU/ol6N5NmXAJena8N-trOswg/view",
  },
};

const cards: ImpactCard[] = [
  {
    title: "90s Con / Alzheimer’s Association",
    body: "We facilitated the reunion of Mouseketeers at the first-ever 90s Con, where more than $10,000 was raised for the Alzheimer’s Association and an additional $30,000 for Always In The Club Foundation. Mouseketeer Nikki DeLoach helped present a $5,000 donation from After-Party sponsor Tito’s Handmade Vodka.",
    image: {
      src: "/images/donation_titos_90scon-a46df53.png",
      alt: "Donation moment at 90s Con featuring Tito’s",
    },
    Icon: HandHeart,
    stat: { label: "raised across both causes", value: 40000, prefix: "$", thousands: true },
    cta: {
      label: "See impact report",
      href: "https://www.canva.com/design/DAE8rwuGeQY/nOHgCkGoOjkGXHpO3FvS8Q/view",
    },
  },
  {
    title: "Disney Imagination Campus",
    body: "We launched our experiential learning and mentoring program, sponsoring 11 children on a learning adventure behind the scenes at Walt Disney World Resort with Disney Imagineers and company leaders.",
    image: {
      src: "/images/disney-campus-kids-only.webp",
      alt: "Students at Disney Imagination Campus",
    },
    Icon: Sparkles,
    stat: { label: "children sponsored behind the scenes", value: 11, suffix: "" },
    cta: {
      label: "See recap",
      href: "https://www.mickeymouseclubreunion.com/post/destination-disney-imagination-campus-walt-disney-world",
    },
  },
  {
    title: "The Party VIP Cruise 2023",
    body: "The Party’s summer-long fundraising campaign, including their 30th Anniversary Concert Film, helped raise more than $53,000 in donations, sponsorships, and sales.",
    image: {
      src: "/images/img_5142.jpg",
      alt: "The Party VIP Cruise",
    },
    Icon: Mic2,
    stat: { label: "raised across donations, sponsorships, sales", value: 53000, prefix: "$", thousands: true },
    cta: {
      label: "See impact report",
      href: "https://www.mickeymouseclubreunion.com/post/the-party-vip-cruise-2023",
    },
  },
  {
    title: "Give Kids The World Village",
    body: "Mouseketeers reunited for the 30th anniversary of the show at Walt Disney World to raise $20,000 for Give Kids The World and diversity initiatives in Orlando.",
    image: {
      src: "/images/entc9zqwkamezz2.jpg",
      alt: "Mouseketeers reunited at Walt Disney World",
    },
    Icon: HeartHandshake,
    stat: { label: "raised for GKTW + Orlando diversity", value: 20000, prefix: "$", thousands: true },
    cta: {
      label: "Learn more",
      href: "https://www.mickeymouseclubreunion.com/mmc30",
    },
  },
  {
    title: "DIS Family Reunion",
    body: "We drove direct contributions of more than $7,000 to Give Kids The World, plus thousands in ticket sales, and activated 2,000 youth delegates worldwide alongside The Party Reunion Concert and the Be Great! Humanitarian Awards.",
    image: {
      src: "/images/mmc_kellen_mmc-panel.png",
      alt: "Mouseketeers on the DIS Family Reunion panel with a young guest",
    },
    Icon: Users,
    stat: { label: "direct contributions + 2,000 delegates", value: 7000, prefix: "$", thousands: true },
    cta: {
      label: "See impact report",
      href: "https://www.canva.com/design/DAE9iOnJkJM/6R813rCy-8BGPlIBd9YKOw/view",
    },
  },
  {
    title: "2022 Humanitarian Awards",
    body: "We helped raise more than $60,000, with $12,500 donated to Rose of Sharon, Cast Member Pantry, Canine Companions, and Entertainment For Change. The evening honored 15 humanitarians — including Nika King (HBO’s Euphoria) — and launched the Use Your Bottle, Change Our World campaign with the United Nations Development Programme.",
    image: {
      src: "/images/received_1214446556013120.jpeg",
      alt: "Honorees at the Be Great! 2022 Humanitarian Awards red carpet",
    },
    Icon: Award,
    stat: { label: "raised; $12,500 to four nonprofits", value: 60000, prefix: "$", thousands: true },
    cta: {
      label: "Learn more",
      href: "https://www.createimpactnow.org/begreat2022",
    },
  },
  {
    title: "Day of Hope with Jenesse Center",
    body: "We teamed with the Jenesse Center, Create Impact, and Spice Salon to treat survivors of domestic abuse with a special Day of Hope — pampering, sponsored gifts, lunch, make-up, manicures, pedicures, and new clothes.",
    image: {
      src: "/images/img_2683.jpg",
      alt: "Day of Hope team at Spice Salon",
    },
    Icon: Sun,
    stat: { label: "survivors of domestic abuse honored", value: 1, suffix: " Day of Hope" },
    cta: {
      label: "Learn more",
      href: "https://www.createimpactnow.org/post/a-day-of-hope-for-victims-of-domestic-abuse",
    },
  },
  {
    title: "Evening of Hope with Rhona Bennett",
    body: "Rhona Bennett (Formerly of En Vogue) hosted a Day + Evening of Hope with AITC, Valley Family Center and Create Impact — featuring sponsored gifts, lunch, make-up, manicures and pedicures for the women, and signed copies of Rhona’s book Saving Your Soul.",
    image: {
      src: "/images/rhona_doh.png",
      alt: "Rhona Bennett at the Evening of Hope, gifting signed copies of Saving Your Soul",
    },
    Icon: Sun,
    stat: { label: "host + book gifted to every guest", value: 1, suffix: " Day+Evening of Hope" },
    cta: {
      label: "Learn more",
      href: "https://www.mickeymouseclubreunion.com/post/en-vogue-s-rhona-bennett-hosts-changemakers-networking-night",
    },
  },
  {
    title: "unite4:humanity",
    body: "AITCF provided marketing and fundraising support to help raise $4,000,000 for charity with the launch of unite4:humanity. Honorees and speakers included Robert De Niro, Martin Scorsese, Alicia Keys, Sean Penn, Selena Gomez, Forest Whitaker, and President Bill Clinton.",
    image: {
      src: "/images/unite4humanity.webp",
      alt: "unite4:humanity launch",
    },
    Icon: Handshake,
    stat: { label: "raised at the unite4:humanity launch", value: 4, prefix: "$", suffix: "M", decimals: 0 },
    cta: {
      label: "Learn more",
      href: "https://www.createimpactnow.org/post/unite4-humanity",
    },
  },
  {
    title: "Jenesse Center",
    body: "AITCF provided marketing and production support to help raise $100,000 for the Jenesse Center, supporting Ambassador Halle Berry’s call to action.",
    image: {
      src: "/images/jenesse-halle.webp",
      alt: "Jenesse Center event with Ambassador Halle Berry",
    },
    Icon: Shield,
    stat: { label: "raised for the Jenesse Center", value: 100000, prefix: "$", thousands: true },
    cta: {
      label: "Learn more",
      href: "https://www.createimpactnow.org/post/100-000-raised-for-jenesse-center-for-the-prevention-of-domestic-violence",
    },
  },
  {
    title: "The Party 30th Anniversary Concert",
    body: "Cast members reunited as The Party for an epic 30th anniversary concert at House of Blues Orlando, grossing over $120,000 for charity.",
    image: {
      src: "/images/b15ad88f-fd59-4c59-891d-1447a777ae8e.jpg",
      alt: "The Party 30th Anniversary Concert at House of Blues Orlando",
    },
    Icon: Mic2,
    stat: { label: "grossed for charity at House of Blues Orlando", value: 120000, prefix: "$", thousands: true },
    cta: {
      label: "Learn more",
      href: "https://www.mickeymouseclubreunion.com/post/the-party-reunion-house-of-blues-disney-world",
    },
  },
  {
    title: "Cast Member Pantry",
    body: "We teamed with Cast Member Pantry, founded by Emily Lartigue, to help the startup raise almost $300,000 and serve over 10,000 cast members.",
    image: {
      src: "/images/4-0003.png",
      alt: "A Cast Member Pantry volunteer in the food bank",
    },
    Icon: Utensils,
    stat: { label: "raised + 10,000 cast members served", value: 300000, prefix: "$", thousands: true },
    cta: {
      label: "See impact report",
      href: "https://www.canva.com/design/DAE8sXxfRhY/AJwpfYC2wm74P1xImOodBg/view",
    },
  },
];

// Top stat band — Foundation totals across all campaigns
const totals = [
  {
    Icon: HandHeart,
    value: <CountUp to={4.5} prefix="$" suffix="M+" decimals={1} />,
    label: "raised across all campaigns",
  },
  {
    Icon: Utensils,
    value: <CountUp to={13000} suffix="+" thousands />,
    label: "served through our MMC'89 community programs",
  },
  {
    Icon: Users,
    value: <CountUp to={3500} suffix="+" thousands />,
    label: "students impacted by our mentors and coaches",
  },
  {
    Icon: TreePine,
    value: <CountUp to={2500} suffix="+" thousands />,
    label: "trees planted to offset global carbon emissions",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Impact"
        title="Our Impact"
        body="Guided by the Global Goals, our MMC’89 Social Impact Initiative supports a wide range of philanthropic efforts. Mouseketeers have helped raise more than $4.5 million to support youth education and mentoring, provide cost-free vacations to Disney World for critically ill children, groceries for families facing financial hardships, support victims of domestic abuse, and train socially conscious artists and entrepreneurs, among other important causes."
      />

      {/* Hero stat band — Foundation totals */}
      <section className="bg-cream pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              By the numbers
            </p>
          </Reveal>
          <ul className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {totals.map((t, i) => {
              const Icon = t.Icon;
              return (
                <Reveal
                  as="li"
                  key={i}
                  delay={i * 70}
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-warm-white p-6 shadow-soft-sm transition-shadow duration-300 hover:shadow-soft"
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red/10 text-red transition-all duration-300 group-hover:bg-red group-hover:text-cream">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="font-display text-4xl font-medium leading-none tracking-tight text-red sm:text-[42px]">
                    {t.value}
                  </p>
                  <p className="text-[14px] leading-snug text-warm-gray">
                    {t.label}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Featured activation — sits above the grid, gets its own layout */}
      <section className="bg-warm-white pt-16 sm:pt-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <article className="group relative overflow-hidden rounded-3xl border border-border bg-cream shadow-soft-sm ring-1 ring-red/10 transition-shadow duration-300 hover:shadow-soft">
              {/* Red top accent stripe — always on for the featured block */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-red"
              />
              <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
                {/* Image side — matted so the full banner is visible */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-white p-5 sm:p-7 lg:aspect-auto lg:min-h-[420px]">
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-contain p-5 sm:p-7"
                  />
                  {/* Featured tag — sits on the image, top-left */}
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-red px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream shadow-soft-sm">
                    <featured.Icon className="h-3.5 w-3.5" aria-hidden />
                    {featured.eyebrow}
                  </span>
                </div>

                {/* Text side */}
                <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 lg:p-12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {featured.kicker}
                  </p>
                  <h2 className="font-display text-[28px] font-medium leading-[1.15] tracking-tight text-ink sm:text-[34px] lg:text-[38px]">
                    {featured.title}
                  </h2>
                  <div className="flex items-baseline gap-3">
                    <p className="font-display text-[44px] font-medium leading-none tracking-tight text-red sm:text-[52px]">
                      <CountUp
                        to={featured.stat.value}
                        suffix={featured.stat.suffix}
                        thousands={featured.stat.thousands}
                      />
                    </p>
                    <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-warm-gray">
                      {featured.stat.label}
                    </p>
                  </div>
                  <p className="text-[15px] leading-relaxed text-warm-gray">
                    {featured.body}
                  </p>
                  <a
                    href={featured.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
                  >
                    {featured.cta.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Campaign cards */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Campaigns & moments
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              The work behind the numbers
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-8 md:grid-cols-2">
            {cards.map((c, i) => {
              const Icon = c.Icon;
              return (
                <Reveal
                  as="li"
                  key={c.title}
                  delay={(i % 2) * 90}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div
                    className={
                      c.image.fit === "contain"
                        ? "relative aspect-[16/10] w-full overflow-hidden bg-cream p-4 ring-1 ring-inset ring-ink/[0.06] sm:p-6"
                        : "relative aspect-[16/10] w-full overflow-hidden bg-warm-white"
                    }
                  >
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(min-width: 768px) 480px, 100vw"
                      style={
                        c.image.objectPosition
                          ? { objectPosition: c.image.objectPosition }
                          : undefined
                      }
                      className={
                        c.image.fit === "contain"
                          ? "object-contain p-4 sm:p-6"
                          : "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      }
                    />
                    {/* Soft warm overlay so text below sits on a quieter image — skip for matted (contain) images */}
                    {c.image.fit !== "contain" && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-ink/0 to-transparent"
                      />
                    )}
                    {/* Icon badge — top-left of the image */}
                    <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/95 text-red shadow-soft-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-red group-hover:text-cream motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <p className="font-display text-[40px] font-medium leading-none tracking-tight text-red sm:text-[44px]">
                      <CountUp
                        to={c.stat.value}
                        prefix={c.stat.prefix}
                        suffix={c.stat.suffix}
                        thousands={c.stat.thousands}
                        decimals={c.stat.decimals}
                      />
                    </p>
                    <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.12em] text-warm-gray">
                      {c.stat.label}
                    </p>
                    <h3 className="mt-6 font-display text-[22px] font-medium leading-snug text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm-gray">
                      {c.body}
                    </p>
                    {c.cta && (
                      <a
                        href={c.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
                      >
                        {c.cta.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ul>

          {/* Descriptor + two outbound links: event recap blog posts and the photo gallery */}
          <Reveal delay={120} className="mt-14 text-center">
            <p className="text-base leading-relaxed text-warm-gray">
              Explore more of our campaigns and events working to Create Impact.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              <a
                href="https://www.mickeymouseclubreunion.com/events"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-red no-underline transition-colors hover:text-red-deep"
              >
                Event Recap Blog Posts
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://www.createimpactnow.org/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-red no-underline transition-colors hover:text-red-deep"
              >
                Campaign / Event Photo Gallery
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
