import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Our Impact — Always In The Club Foundation",
  description:
    "Mouseketeers have helped raise more than $4.5 million in support of youth education, mentoring, critically ill children, and many other causes.",
};

const cards = [
  {
    title: "Youth Education & Mentorship",
    body: "We are particularly proud of our livestream from Walt Disney World Resort to more than 2,000 youth delegates around the world, featuring in-depth discussions with Disney icons, humanitarians, and business leaders.",
  },
  {
    title: "Cast Member Pantry",
    body: "We teamed with Cast Member Pantry to help the startup raise almost $300,000 and serve over 10,000 cast members.",
  },
  {
    title: "90s Con / Alzheimer’s Association",
    body: "We facilitated the reunion of Mouseketeers at the first-ever 90s Con, where more than $10,000 was raised for the Alzheimer’s Association and an additional $30,000 for Always In The Club Foundation.",
  },
  {
    title: "Disney Imagination Campus",
    body: "We launched our experiential learning and mentoring program, sponsoring 11 children on a learning adventure behind the scenes at Walt Disney World Resort with Disney Imagineers and company leaders.",
  },
  {
    title: "The Party VIP Cruise 2023",
    body: "The Party’s summer-long fundraising campaign, including their 30th Anniversary Concert Film, helped raise more than $53,000 in donations, sponsorships, and sales.",
  },
  {
    title: "Give Kids The World Village",
    body: "Mouseketeers reunited for the 30th anniversary of the show at Walt Disney World to raise $20,000 for Give Kids The World and diversity initiatives in Orlando.",
  },
  {
    title: "DIS Family Reunion",
    body: "We drove direct contributions of more than $7,000 to Give Kids The World, plus thousands in ticket sales, and activated 2,000 youth delegates worldwide alongside The Party Reunion Concert and the Be Great! Humanitarian Awards.",
  },
  {
    title: "2022 Humanitarian Awards",
    body: "We helped raise more than $60,000, with $12,500 donated to Rose of Sharon, Cast Member Pantry, Canine Companions, and Entertainment For Change. The event launched the Use Your Bottle, Change Our World campaign with the United Nations Development Program.",
  },
  {
    title: "Day of Hope with Jenesse Center",
    body: "We teamed with the Jenesse Center, Create Impact, and Spice Salon to treat victims of domestic abuse with a special Day of Hope — pampering, sponsored gifts, lunch, and more.",
  },
  {
    title: "unite4:humanity",
    body: "AITCF provided marketing and fundraising support to help raise $4,000,000 for charity with the launch of unite4:humanity. Honorees and speakers included Robert De Niro, Martin Scorsese, Alicia Keys, Sean Penn, Selena Gomez, Forest Whitaker, and President Bill Clinton.",
  },
  {
    title: "Jenesse Center",
    body: "AITCF provided marketing and production support to help raise $100,000 for the Jenesse Center, supporting Ambassador Halle Berry’s call to action.",
  },
  {
    title: "The Party 30th Anniversary Concert",
    body: "Cast members reunited as The Party for an epic 30th anniversary concert at House of Blues Orlando, grossing over $120,000 for charity.",
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

      <section className="bg-warm-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={(i % 3) * 80}
                className="flex h-full flex-col rounded-2xl border border-border bg-cream p-7 shadow-soft-sm sm:p-8"
              >
                <h3 className="font-display text-xl font-medium leading-snug text-ink sm:text-[22px]">
                  {c.title}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-warm-gray">
                  {c.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
