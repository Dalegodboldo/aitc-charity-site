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
  image: { src: string; alt: string; objectPosition?: string };
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
};

const cards: ImpactCard[] = [
  {
    title: "Youth Education & Mentorship",
    body: "We are particularly proud of our livestream from Walt Disney World Resort to more than 2,000 youth delegates around the world, featuring in-depth discussions with Disney icons, humanitarians, and business leaders.",
    image: {
      src: "/images/mmc_kellen_mmc-panel.png",
      alt: "Mouseketeer panel discussion at Walt Disney World",
    },
    Icon: GraduationCap,
    stat: { label: "youth delegates reached", value: 2000, suffix: "+", thousands: true },
  },
  {
    title: "Cast Member Pantry",
    body: "We teamed with Cast Member Pantry to help the startup raise almost $300,000 and serve over 10,000 cast members.",
    image: {
      src: "/images/4-0003.png",
      alt: "A Cast Member Pantry volunteer in the food bank",
    },
    Icon: Utensils,
    stat: { label: "raised + 10,000 cast members served", value: 300000, prefix: "$", thousands: true },
  },
  {
    title: "90s Con / Alzheimer’s Association",
    body: "We facilitated the reunion of Mouseketeers at the first-ever 90s Con, where more than $10,000 was raised for the Alzheimer’s Association and an additional $30,000 for Always In The Club Foundation.",
    image: {
      src: "/images/donation_titos_90scon-a46df53.png",
      alt: "Donation moment at 90s Con featuring Tito’s",
    },
    Icon: HandHeart,
    stat: { label: "raised across both causes", value: 40000, prefix: "$", thousands: true },
  },
  {
    title: "Disney Imagination Campus",
    body: "We launched our experiential learning and mentoring program, sponsoring 11 children on a learning adventure behind the scenes at Walt Disney World Resort with Disney Imagineers and company leaders.",
    image: {
      src: "/images/disney-campus-bright.png",
      alt: "Students at Disney Imagination Campus",
    },
    Icon: Sparkles,
    stat: { label: "children sponsored behind the scenes", value: 11, suffix: "" },
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
  },
  {
    title: "DIS Family Reunion",
    body: "We drove direct contributions of more than $7,000 to Give Kids The World, plus thousands in ticket sales, and activated 2,000 youth delegates worldwide alongside The Party Reunion Concert and the Be Great! Humanitarian Awards.",
    image: {
      src: "/images/received_1214446556013120.jpeg",
      alt: "DIS Family Reunion event",
    },
    Icon: Users,
    stat: { label: "direct contributions + 2,000 delegates", value: 7000, prefix: "$", thousands: true },
  },
  {
    title: "2022 Humanitarian Awards",
    body: "We helped raise more than $60,000, with $12,500 donated to Rose of Sharon, Cast Member Pantry, Canine Companions, and Entertainment For Change. The event launched the Use Your Bottle, Change Our World campaign with the United Nations Development Program.",
    image: {
      src: "/images/img_2683.jpg",
      alt: "2022 Humanitarian Awards event",
    },
    Icon: Award,
    stat: { label: "raised; $12,500 to four nonprofits", value: 60000, prefix: "$", thousands: true },
  },
  {
    title: "Day of Hope with Jenesse Center",
    body: "We teamed with the Jenesse Center, Create Impact, and Spice Salon to treat victims of domestic abuse with a special Day of Hope — pampering, sponsored gifts, lunch, and more.",
    image: {
      src: "/images/rhona_doh.png",
      alt: "Rhona Bennett with women supported by Day of Hope",
    },
    Icon: Sun,
    stat: { label: "survivors of domestic abuse honored", value: 1, suffix: " Day of Hope" },
  },
  {
    title: "unite4:humanity",
    body: "AITCF provided marketing and fundraising support to help raise $4,000,000 for charity with the launch of unite4:humanity. Honorees and speakers included Robert De Niro, Martin Scorsese, Alicia Keys, Sean Penn, Selena Gomez, Forest Whitaker, and President Bill Clinton.",
    image: {
      src: "/images/untitled-design---2025-07-20t000647.052.png",
      alt: "unite4:humanity launch",
    },
    Icon: Handshake,
    stat: { label: "raised at the unite4:humanity launch", value: 4, prefix: "$", suffix: "M", decimals: 0 },
  },
  {
    title: "Jenesse Center",
    body: "AITCF provided marketing and production support to help raise $100,000 for the Jenesse Center, supporting Ambassador Halle Berry’s call to action.",
    image: {
      src: "/images/b15ad88f-fd59-4c59-891d-1447a777ae8e.jpg",
      alt: "Jenesse Center event with Ambassador Halle Berry",
    },
    Icon: Shield,
    stat: { label: "raised for the Jenesse Center", value: 100000, prefix: "$", thousands: true },
  },
  {
    title: "The Party 30th Anniversary Concert",
    body: "Cast members reunited as The Party for an epic 30th anniversary concert at House of Blues Orlando, grossing over $120,000 for charity.",
    image: {
      src: "/images/teers-concert-cropped.jpg",
      alt: "The Party 30th Anniversary Concert at House of Blues Orlando",
    },
    Icon: Mic2,
    stat: { label: "grossed for charity at House of Blues Orlando", value: 120000, prefix: "$", thousands: true },
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
    value: <CountUp to={10000} suffix="+" thousands />,
    label: "individuals in need fed",
  },
  {
    Icon: Users,
    value: <CountUp to={2000} suffix="+" thousands />,
    label: "youth impacted worldwide",
  },
  {
    Icon: TreePine,
    value: <CountUp to={2500} suffix="+" thousands />,
    label: "trees planted",
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
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-white">
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
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {/* Soft warm overlay so text below sits on a quieter image */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-ink/0 to-transparent"
                    />
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
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
