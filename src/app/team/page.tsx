import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the artists, educators, and entrepreneurs leading Always In The Club Foundation.",
};

type Person = {
  name: string;
  description: string;
  role: string;
  href?: string;
  photo?: string;
  /** CSS object-position for the square crop (default: "center"). */
  objectPosition?: string;
};

const board: Person[] = [
  {
    name: "Chasen Hampton",
    description: "Singer/Songwriter, Producer, Teacher & Mouseketeer",
    role: "Chairman of the Board",
    href: "https://www.linkedin.com/in/chasenhampton/",
    photo: "/images/chasen-hampton---executive-producer.jpg",
  },
  {
    name: "Gloria Ayee, PhD",
    description: "Lecturer in Extension, Harvard University",
    role: "Board Member",
    href: "https://extension.harvard.edu/faculty/gloria-ayee/",
    photo: "/images/gloria-ayee.jpg",
  },
  {
    name: "Patty Chung Adams, MBA, PGA",
    description:
      "Disney Creative Development, Inclusive Strategies (Walt Disney Imagineering)",
    role: "Board Member",
    href: "https://www.linkedin.com/in/patty-chung-adams/",
    photo: "/images/patty-chung-adams.jpg",
  },
  {
    name: "Bret Iwan",
    description: "Artist and Voice of Mickey Mouse",
    role: "Board Member",
    href: "https://disneyfineart.com/pages/bret-iwan",
    photo: "/images/iwan.png",
  },
  {
    name: "Jennifer Kramer, M.Ed.",
    description: "Educator, Trainer, Curriculum Developer, Non-Profit Consultant",
    role: "Board Member",
    href: "https://www.linkedin.com/in/jennifer-s-kramer-m-ed-40a15aa5/",
    photo: "/images/jennifer-kramer.jpg",
  },
  {
    name: "Tony Lucca",
    description: "Singer/Songwriter, Producer & Mouseketeer",
    role: "Board Member",
    href: "https://www.tonylucca.com/",
    photo: "/images/tony-lucca-promo-pic-3.jpg",
    objectPosition: "50% 20%",
  },
  {
    name: "Jennifer McGill",
    description: "Singer, Vocal Coach & Mouseketeer",
    role: "Board Member",
    href: "https://www.jennifermcgill.com/",
    photo: "/images/jennifer-mcgill.webp",
  },
  {
    name: "Axel Tillmann",
    description: "Entrepreneur",
    role: "Board Member (Secretary)",
    href: "https://alpha-consult.com/axel-tillmann/",
    photo: "/images/axel-tillmann-1024x683.jpg",
  },
  {
    name: "Jonathan B. Smith, CPA",
    description: "Certified Public Accountant",
    role: "Board Member (Treasurer)",
    photo: "/images/jonathan-b-smith.jpg",
  },
  {
    name: "Rachel Carlsen, CPA",
    description: "Certified Public Accountant",
    role: "Advisor",
    href: "https://rachelcarlsen.com/",
    photo: "/images/101315_rachel_carlsen_headshots_schlic-69d63f.webp",
  },
  {
    name: "Tasha Danner",
    description:
      "Actress/Singer, Accounting Manager at Caldera Arts & Mouseketeer",
    role: "Advisor",
    href: "https://www.linkedin.com/in/tasha-danner/",
    photo: "/images/tasha-danner.jpg",
  },
];

const staff: Person[] = [
  {
    name: "Chasen Hampton",
    description: "Singer/Songwriter, Producer, Teacher & Mouseketeer",
    role: "Executive Director & Chairman",
    photo: "/images/chasen-hampton---executive-producer.jpg",
  },
  {
    name: "Lisa Cannata",
    description: "Entrepreneur",
    role: "Production Manager",
    photo: "/images/lisa-cannata.webp",
  },
  {
    name: "Yvette Cherkala",
    description: "VIP Hospitality",
    role: "Club Memberships & Event Coordination",
    href: "https://www.linkedin.com/in/yvettecherkala",
    photo: "/images/yvette-cherkala.webp",
  },
  {
    name: "Axel Tillmann",
    description: "Entrepreneur & Business Consultant",
    role: "Secretary & Vice President",
    photo: "/images/axel-tillmann-1024x683.jpg",
  },
  {
    name: "Rhona Bennett",
    description: "Former member of En Vogue, Life Coach & Mouseketeer",
    role: "Program: Personal Power University",
    photo: "/images/rhona-bennett_1.webp",
  },
  {
    name: "Carrie Mulderink",
    description: "Doctor of Philosophy / Master of Arts",
    role: "Diversity Manager",
    photo: "/images/carrie.webp",
  },
  {
    name: "Jonathan B. Smith, CPA",
    description: "Certified Public Accountant",
    role: "Treasurer",
    photo: "/images/jonathan-b-smith.jpg",
  },
  {
    name: "Albert JeunePierre Fields",
    description: "Singer/Songwriter/Producer & Mouseketeer",
    role: "Program: Day of Hope",
    photo: "/images/albert-fields.webp",
  },
  {
    name: "Anthony Donovan",
    description: "Artist & Designer",
    role: "Social Media Manager",
    photo: "/images/anthony-headshot.jpeg",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter((c) => /[A-Z]/.test(c))
    .slice(0, 2)
    .join("");
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  return (
    <Reveal
      as="li"
      delay={(index % 4) * 60}
      className="flex h-full flex-col rounded-xl border border-border bg-cream p-4 shadow-soft-sm sm:p-5"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-warm-white">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 100vw"
            style={
              person.objectPosition
                ? { objectPosition: person.objectPosition }
                : undefined
            }
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(171,7,7,0.08),rgba(255,255,255,0)_70%)]">
            <span className="font-display text-4xl font-medium text-ink/25">
              {initials(person.name)}
            </span>
          </div>
        )}
      </div>
      <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gold">
        {person.role}
      </p>
      <h3 className="mt-1.5 font-display text-[17px] font-medium leading-snug text-ink">
        {person.name}
      </h3>
      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-warm-gray">
        {person.description}
      </p>
      {person.href && (
        <a
          href={person.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-red no-underline transition-colors hover:text-red-deep"
        >
          Bio / website
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      )}
    </Reveal>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Team"
        title="Our Team"
        body="Always In The Club is dedicated to empowering young people through arts education and mentoring, and using our platform to support efforts across a wide range of causes. Our team is comprised of accomplished artists, educators, and entrepreneurs committed to making a difference in the lives of those who need it most."
      />

      {/* Board */}
      <section className="bg-warm-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Governance
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Our Board
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {board.map((p, i) => (
              <PersonCard key={p.name + p.role} person={p} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* Leadership & Staff */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Day to day
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Our Leadership & Staff
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {staff.map((p, i) => (
              <PersonCard
                key={p.name + p.role}
                person={{
                  ...p,
                  // staff cards re-use cream-on-warm-white style for visual rhythm
                }}
                index={i}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Contact Us
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Drop us a line!
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-warm-gray">
              Reach the Foundation directly using the details below — we read
              every note.
            </p>
            <ul className="mt-10 space-y-6 text-[15px]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Always In The Club Foundation</p>
                  <p className="text-warm-gray">100 East Pine Street, Suite 110</p>
                  <p className="text-warm-gray">Orlando, FL 32801</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <a
                  href="tel:4078048737"
                  className="text-warm-gray no-underline transition-colors hover:text-red"
                >
                  (407) 804-8737
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-warm-gray no-underline transition-colors hover:text-red"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
