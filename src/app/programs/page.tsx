import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Brush,
  Compass,
  Download,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Mic2,
  Music2,
  Plane,
  Quote,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Trophy,
  Users,
  Utensils,
} from "lucide-react";
import { ImageLightbox } from "@/components/site/image-lightbox";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { GoalIcons } from "@/components/site/sdg-icons";

export const metadata: Metadata = {
  title: "Programs & Initiatives",
  description:
    "Mentoring, Experiential Learning, Workshops & Coaching, and the MMC'89 Social Impact Initiative.",
};

type Program = {
  title: string;
  body: string;
  href: string;
  /** `objectPosition` overrides the default centred crop — e.g. "top"
   *  to slide a portrait photo all the way down within the 16:10
   *  frame so the upper part of the photo stays visible. */
  image: { src: string; alt: string; objectPosition?: string };
  Icon: LucideIcon;
  /** Three short feature pills shown under the body — quick scan of what's inside. */
  features: { Icon: LucideIcon; label: string }[];
};

const programs: Program[] = [
  {
    title: "Mentoring",
    body: "We match young adults and children pursuing a career in the entertainment industry with a Mouseketeer Mentor or other accomplished veteran of the arts — based on common interests, career goals, experiences and life challenges.",
    href: "https://www.mickeymouseclubreunion.com/mentorship-coaching#mentor",
    image: {
      src: "/images/yaffa-3.JPG",
      alt: "Student Yaffa Botier — supported by AITC's Mentoring program",
      // Slide the image all the way down inside the 16:10 frame so
      // the top of the photo stays visible after the crop.
      objectPosition: "top",
    },
    Icon: HeartHandshake,
    features: [
      { Icon: Users, label: "1:1 matches" },
      { Icon: Smartphone, label: "Virtual + IRL" },
      { Icon: ShieldCheck, label: "Parent-loop for under-18s" },
    ],
  },
  {
    title: "Experiential Learning",
    body: "There’s no education like real-world experience. Mouseketeers lead trips to Broadway and Disney Imagination Campus for students interested in performing arts, humanities, science, technology, leadership and innovation.",
    href: "https://www.mickeymouseclubreunion.com/destination-broadway",
    image: {
      src: "/images/img_1593.jpg",
      alt: "Students on an experiential learning trip",
    },
    Icon: Plane,
    features: [
      { Icon: Sparkles, label: "Disney + Broadway + Music/Film Production Facilities" },
      { Icon: Compass, label: "Behind-the-scenes" },
      { Icon: GraduationCap, label: "Real-world credit" },
    ],
  },
  {
    title: "Workshops & Coaching",
    body: "Mouseketeers share their knowledge through workshops and one-on-one coaching — training young creatives on their craft while guiding them through emotional well-being and the business of entertainment.",
    href: "https://www.mickeymouseclubreunion.com/mentorship-coaching#coaches",
    image: {
      src: "/images/tony-coaching.avif",
      alt: "Tony Lucca coaching a student",
    },
    Icon: Mic2,
    features: [
      { Icon: Brush, label: "Craft training" },
      { Icon: HeartHandshake, label: "Well-being focus" },
      { Icon: Briefcase, label: "Business of the biz" },
    ],
  },
];

type Campaign = {
  title: string;
  body: ReactNode;
  goals: string;
  /** `objectPosition` overrides the default centred crop — e.g. "top"
   *  to anchor a portrait photo so the head/upper torso stays visible
   *  after the 16:10 crop. */
  image: { src: string; alt: string; objectPosition?: string };
  Icon: LucideIcon;
  /** Outbound "Learn more" link at the foot of the card. */
  cta?: { label: string; href: string };
};


const campaigns: Campaign[] = [
  {
    title: "Mentoring & Youth Arts Education",
    body: "Inspired by the training they received from Disney in their youth, Mouseketeers are supporting the next generation of artists and entrepreneurs with training and mentorship programs.",
    goals: "Global Goals 3, 4 & 8",
    image: {
      src: "/images/deedee_jenn_student.png",
      alt: "Mouseketeer mentoring a young student through the Mentoring & Youth Arts Education program",
    },
    Icon: GraduationCap,
    cta: {
      label: "Learn, Grow, Thrive",
      href: "https://www.mickeymouseclubreunion.com/mentorship-coaching",
    },
  },
  {
    title: "Business Launch & Growth Solutions",
    body: (
      <>
        Through our dba brand name —{" "}
        <strong className="font-semibold text-ink">Create Impact Now</strong> —
        we transform visions into impact, providing comprehensive for-profit
        and nonprofit launch and growth solutions.
      </>
    ),
    goals: "Global Goals 8, 9, 10 & 17",
    image: { src: "/images/cin.png", alt: "Business launch & growth solutions workshop" },
    Icon: Rocket,
    cta: {
      label: "View program",
      href: "https://www.mickeymouseclubreunion.com/business-services",
    },
  },
  {
    title: "Community Support & Resources",
    body: "A range of emergency services for cast members in need. Originally formed as Cast Member Pantry at the height of the COVID-19 pandemic, we have served more than 10,000 cast members with groceries and other food essentials.",
    goals: "Global Goals 2 & 17",
    image: {
      src: "/images/b91c43_0f462b73bc154aa28b3b48c4fbd575d6-mv2.jpeg",
      alt: "Cast Member Pantry volunteers serving groceries",
    },
    Icon: Utensils,
    cta: { label: "View program", href: "https://www.mickeymouseclubreunion.com/csr" },
  },
  {
    title: "Use Your Bottle, Change Our World",
    body: "With support from the United Nations Development Program, we launched a campaign promoting a solution-based approach to reducing single-use plastic.",
    goals: "Global Goals 6, 12 & 13",
    image: {
      src: "/images/3ee52e_6bcc609dea3148129d984b10d3d1b3e8-mv2.j.webp",
      alt: "Use Your Bottle, Change Our World campaign",
    },
    Icon: Leaf,
    cta: { label: "Learn more", href: "https://www.createimpactnow.org/use-your-bottle" },
  },
  {
    title: "Veterans, First Responders & Healthcare Workers",
    body: "We support veterans and first responders in partnership with Victory Bridge and others, including a campaign with Orlando Bloom to reduce the stigma around mental health in veteran communities.",
    goals: "Global Goals 3, 8, 16 & 17",
    image: {
      src: "/images/3ee52e_433531b6a8ee4f17b8cba8c26f623909-mv2-1.webp",
      alt: "Veterans, first responders & healthcare workers campaign",
    },
    Icon: ShieldCheck,
    cta: {
      label: "Learn more",
      href: "https://www.createimpactnow.org/post/honoring-and-supporting-our-veterans",
    },
  },
  {
    title: "Day at Disney",
    body: "Merit-based trips with Mouseketeers to Disney World and Disneyland for outstanding youth.",
    goals: "Global Goals 4 & 17",
    image: {
      src: "/images/65126762_2564381300247248_5987177040460120064_.jpg",
      alt: "Mouseketeers and youth at Disney for a Day at Disney trip",
    },
    Icon: Sparkles,
    cta: { label: "Learn more", href: "https://www.mickeymouseclubreunion.com/mmc30" },
  },
  {
    title: "Day of Service",
    body: "Mouseketeer-led volunteering — including sorting 4,000 pounds of food at Nashville’s Second Harvest Food Bank to provide more than 3,000 meals to people in need.",
    goals: "Global Goals 1–17",
    image: { src: "/images/img_8917.jpg", alt: "Mouseketeers volunteering at Second Harvest Food Bank" },
    Icon: HandHeart,
    cta: { label: "Learn more", href: "https://www.mickeymouseclubreunion.com/mmc-89-day-of-service" },
  },
  {
    title: "Day of Hope / Evening of Impact",
    body: (
      <>
        Empowering days of pampering and{" "}
        <a
          href="https://www.mickeymouseclubreunion.com/post/en-vogue-s-rhona-bennett-hosts-changemakers-networking-night"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red underline underline-offset-2 transition-colors hover:text-red-deep"
        >
          evenings of impact
        </a>{" "}
        for women who are victims of domestic abuse.
      </>
    ),
    goals: "Global Goals 5 & 10",
    image: { src: "/images/rhona_doh.png", alt: "Rhona Bennett at the Evening of Hope" },
    Icon: Sun,
    cta: {
      label: "Learn more",
      href: "https://www.mickeymouseclubreunion.com/day-of-hope",
    },
  },
  {
    title: "Hall of Fame / Be Great! Awards",
    body: "Like the Mouse Club’s “Hall of Fame Day,” we spotlight community leaders and provide grants to those in need.",
    goals: "Global Goals 1–17",
    image: { src: "/images/img_5573.webp", alt: "Hall of Fame / Be Great! Awards honourees" },
    Icon: Trophy,
    cta: { label: "Learn more", href: "https://www.mickeymouseclubreunion.com/hall-of-fame" },
  },
  {
    title: "Why? Because It’s Christmas",
    body: "Mouseketeers reunited for music and events supporting MusiCares and music people in need.",
    goals: "Global Goals 1, 2 & 3",
    image: {
      src: "/images/mmc-holidays-musicares-facebook-event-cover.jpg",
      alt: "Why? Because It’s Christmas — Mouseketeers x MusiCares",
    },
    Icon: Music2,
    cta: { label: "Learn more", href: "https://www.mickeymouseclubreunion.com/mmcholidays" },
  },
  {
    title: "Shop the Club, We Plant a Tree",
    goals: "Global Goals 7, 11, 13, 14 & 15",
    body: (
      <>
        With every purchase or donation in our{" "}
        <a
          href="https://mmcreunion.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red underline underline-offset-2 transition-colors hover:text-red-deep"
        >
          Club Store
        </a>
        , we plant a tree in your name to help offset carbon emissions. We&rsquo;ve
        proudly planted more than 2,500 trees around the world.
      </>
    ),
    image: {
      src: "/images/screen-shot-2023-12-23-at-4_49_42-pm.webp",
      alt: "Shop the Club, We Plant a Tree campaign",
    },
    Icon: Leaf,
    cta: {
      label: "Visit our forest",
      href: "https://tree-nation.com/profile/impact/always-in-the-club-foundation#co2",
    },
  },
];

// Bullets that flesh out the two side-by-side problem/solution panels.
const problemPoints: { Icon: LucideIcon; text: string }[] = [
  {
    Icon: AlertTriangle,
    text: "Adolescence brings real mental-health pressure — and arts education is a proven preventive tool.",
  },
  {
    Icon: GraduationCap,
    text: "Schools still optimize for a diploma → 9-to-5 path that no longer guarantees a stable career.",
  },
  {
    Icon: Smartphone,
    text: "Social media and the gig economy add professional and emotional hurdles previous generations didn’t face.",
  },
];

const solutionPoints: { Icon: LucideIcon; text: string }[] = [
  {
    Icon: Brush,
    text: "Training in the arts and craft alongside working professionals.",
  },
  {
    Icon: Briefcase,
    text: "Entrepreneurship + the business of entertainment, taught the way it actually works.",
  },
  {
    Icon: HeartHandshake,
    text: "Mentoring on innovation, leadership and managing mental health for the long run.",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  /** Small italic footnote rendered under the title — used for event-
   *  attribution context like "Event co-produced by AITCF". */
  note?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "We are truly honored to be a part of this special reunion of the Mickey Mouse Club. The joy that participants bring to these precious families through their support is immeasurable.",
    name: "Pamela Landwirth",
    title: "President & CEO, Give Kids The World",
  },
  {
    quote:
      "We are grateful to Always in the Club for its efforts to raise awareness for the Brave of Heart Fund.",
    name: "Holly Welch Stubbing",
    title: "President & CEO of E4E Relief (Brave of Heart Fund)",
  },
  {
    quote:
      "Music has such a unique ability to heal and unify us. The direct impact we’ve been able to make on our music community would not be possible without the generosity of partners like Always In The Club.",
    name: "Laura Segura",
    title: "Executive Director of MusiCares",
  },
  {
    quote:
      "On behalf of Jenessee Center, Inc., I would like to thank you for your donation of $100,000. Your gift ensures that families who are survivors of domestic violence will continue to receive safe and culturally relevant services that will both empower and guide them on the road to self sufficiency and independence.",
    name: "Karen Earl",
    title: "CEO, Jenessee Center, Inc.",
    note: "(Event co-produced by AITCF)",
  },
  {
    quote:
      "On behalf of the Charlize Africa Outreach Project, I would like to acknowledge and express our appreciation for your support for CTAOP. The donation has helped CTAOP in its mission to help keep African youth safe from HIV/AIDS.",
    name: "Lee Bodner",
    title: "Managing Director, Charlize Theron Africa Outreach Project*",
    note: "*Event co-produced by AITCF. Letter addressed to the event’s Executive Producer.",
  },
];

type Partner = {
  name: string;
  body: string;
  /** If the source PNG is a white-only mark on transparent, set `invert`
   *  so the logo is recoloured black for visibility on the cream tile. */
  logo: { src: string; alt: string; invert?: boolean };
  href: string;
};

const partners: Partner[] = [
  {
    name: "MusiCares",
    body: "We partnered with MusiCares on our holiday album Why? Because It’s Christmas, which debuted at #21 on Billboard.",
    logo: { src: "/images/musicares-lockup_red-rgb.webp", alt: "MusiCares logo" },
    href: "https://www.musicares.org/",
  },
  {
    name: "Educational Destinations",
    body: "A Disney Parks Recognized Youth Travel Planner and Disney on Broadway’s Preferred Travel Planner.",
    logo: { src: "/images/logo.png", alt: "Educational Destinations logo" },
    href: "https://www.educationaldestinations.com/index.html",
  },
  {
    name: "That’s 4 Entertainment",
    body: "We partner with their 90s Con and Christmas Con to raise awareness and funds for our programs.",
    logo: {
      src: "/images/Thats4EntertainmentLogo-dark.png",
      alt: "That’s 4 Entertainment logo",
    },
    href: "https://www.thats4entertainment.com/",
  },
  {
    name: "Entertainment For Change",
    body: "We work with EFC to amplify young voices and create a new kind of empowered leader.",
    logo: { src: "/images/logo-text-only.webp", alt: "Entertainment For Change logo" },
    href: "https://www.createimpactnow.org/impactartist",
  },
  {
    name: "Be Great!",
    body: "A social impact-based production company. Together we produce awards, events and media that inspire people to Be Great!",
    logo: { src: "/images/cr-w-814-h-407.webp", alt: "Be Great! logo" },
    href: "https://begreatshow.com/",
  },
];

const downloads = [
  {
    title: "Programs Overview — Youth Arts Education & Mentoring",
    file: "/downloads/programs-overview---youth-arts-education-men.pdf",
  },
  {
    title: "Imagination Campus — Workshops and Performances Overview",
    file: "/downloads/imagination-campus---workshop-and-perf-cce35fe.pdf",
  },
  {
    title: "Always In The Club Production Services Deck",
    file: "/downloads/aitcf-productions-services-deck.pdf",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Programs & Initiatives"
        title="Our Programs & Initiatives"
        subtitle="Using our E.A.R.S. to make a difference — Education, Arts, Resources… Social Impact"
      />

      {/* Mentoring & Youth Arts Education */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Our focus
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Mentoring & Youth Arts Education
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-10 text-base leading-relaxed text-warm-gray">
            <p>
              More than a variety show, the &ldquo;All New&rdquo; Mickey Mouse
              Club was a world-class performing arts academy. Inspired by the
              support they received from Disney, Mouseketeers are lending their
              unique insights to enhance the lives of young people through
              mentoring and arts education — essential for social and emotional
              well-being, and critical tools for establishing equity and access.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <figure className="my-12 rounded-2xl border border-border bg-cream p-8 sm:p-10">
              <Quote className="h-7 w-7 text-gold" aria-hidden />
              <blockquote className="mt-4 font-display text-2xl italic leading-snug text-ink sm:text-[28px]">
                MMC was the most informative experience I&rsquo;ve ever had as
                an entertainer.
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-warm-gray">
                Justin Timberlake <span className="text-gold">— Mouseketeer</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={260} className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Problem panel — red accent + bullet list of pressures */}
            <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-cream p-7 shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft sm:p-9 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover:scale-x-0"
              />
              {/* Decorative blur — soft red halo */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red/10 blur-3xl"
              />
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-red text-cream shadow-soft-sm transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                <AlertTriangle className="h-6 w-6" aria-hidden />
              </span>
              <p className="relative mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-red">
                What We Aim To Solve
              </p>
              <h3 className="relative mt-2 font-display text-2xl font-medium leading-snug text-ink sm:text-[26px]">
                The gap today’s young creatives face
              </h3>
              <ul className="relative mt-6 space-y-4">
                {problemPoints.map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red/10 text-red transition-colors group-hover:bg-red/15">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-[15px] leading-relaxed text-warm-gray sm:text-[16px]">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>

            {/* Solution panel — gold accent + bullet list of responses */}
            <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-cream p-7 shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft sm:p-9 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover:scale-x-0"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/15 blur-3xl"
              />
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-cream shadow-soft-sm transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                <Lightbulb className="h-6 w-6" aria-hidden />
              </span>
              <p className="relative mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
                Our Solutions
              </p>
              <h3 className="relative mt-2 font-display text-2xl font-medium leading-snug text-ink sm:text-[26px]">
                A well-rounded education that meets the moment
              </h3>
              <ul className="relative mt-6 space-y-4">
                {solutionPoints.map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold transition-colors group-hover:bg-gold/25">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-[15px] leading-relaxed text-warm-gray sm:text-[16px]">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="relative mt-6 text-[14px] leading-relaxed text-warm-gray/90">
                Spearheaded by reunited Mouseketeers, we fill the gaps with
                youth arts education and mentoring programs that include
                real-world learning opportunities.
              </p>
            </article>
          </Reveal>

          {/* CTA across to the Our Why page */}
          <Reveal delay={320} className="mt-12">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-cream p-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="text-[16px] leading-relaxed text-ink">
                <span className="font-semibold">Why does this matter?</span>{" "}
                We gathered the research behind arts education and mentorship
                in one place.
              </p>
              <Link
                href="/our-why"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream"
              >
                Read Our Why
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programs cards */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Programs
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Three ways we work with young creatives
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => {
              const Icon = p.Icon;
              return (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 80}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {/* Red top accent — wipes in on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover:scale-x-0"
                  />
                  {/* Image header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      style={
                        p.image.objectPosition
                          ? { objectPosition: p.image.objectPosition }
                          : undefined
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/0 to-transparent"
                    />
                    {/* Icon badge — top-left, flips red on hover */}
                    <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/95 text-red shadow-soft-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-red group-hover:text-cream motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    {/* Number tag — bottom-left, overlays the image */}
                    <span className="absolute bottom-4 left-4 font-display text-[44px] font-medium leading-none tracking-tight text-cream drop-shadow-md">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="font-display text-xl font-medium leading-snug text-ink sm:text-[22px]">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-warm-gray">
                      {p.body}
                    </p>
                    {/* Feature pills — quick scan of what's inside the program */}
                    <ul className="mt-5 flex flex-1 flex-wrap items-start gap-2">
                      {p.features.map(({ Icon: FIcon, label }, idx) => (
                        <li
                          key={idx}
                          className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-[12px] font-semibold text-warm-gray ring-1 ring-inset ring-border"
                        >
                          <FIcon className="h-3.5 w-3.5 text-gold" aria-hidden />
                          {label}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
                    >
                      Learn more
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" aria-hidden />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* MMC'89 Social Impact Initiative */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Hero — wide confetti-stage photo with two white logo overlays.
              Layout responds to viewport:
                Mobile: MMC'89 top-left small, Changemaker top-right small.
                Desktop: MMC'89 top-centre prominent, Changemaker bottom-right.
              Top + bottom gradients keep both white marks legible against
              the photo. */}
          <Reveal>
            <figure className="mx-auto max-w-3xl">
              <ImageLightbox
                src="/images/mmc30-mickey-confetti.png"
                alt="Mouseketeers and Mickey Mouse celebrating amid confetti"
                width={2995}
                height={1114}
                sizes="(min-width: 768px) 768px, 100vw"
                wrapperClassName="rounded-2xl bg-ink shadow-soft"
              >
                {/* Top + bottom legibility gradients */}
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink/55 via-ink/10 to-transparent" />
                <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent" />
                {/* MMC'89 mark — mobile: top-left, 2× the previous small size; desktop: top-centre prominent */}
                <span className="pointer-events-none absolute left-3 top-3 sm:left-1/2 sm:top-4 sm:-translate-x-1/2 lg:top-5">
                  <Image
                    src="/images/MMC89-mj-v6-wht.png"
                    alt=""
                    width={450}
                    height={460}
                    className="h-20 w-auto drop-shadow-md sm:h-20 lg:h-24"
                  />
                </span>
                {/* Changemaker mark — mobile: top-right, 2× the previous small size; desktop: bottom-right */}
                <span className="pointer-events-none absolute right-3 top-3 sm:bottom-4 sm:right-4 sm:top-auto lg:bottom-5 lg:right-5">
                  <Image
                    src="/images/Changemaker-regular-Logo-white.png"
                    alt=""
                    width={528}
                    height={524}
                    className="h-20 w-auto drop-shadow-md sm:h-20 lg:h-24"
                  />
                </span>
              </ImageLightbox>
              <figcaption className="mt-3 text-center text-[12px] italic leading-snug text-warm-gray">
                <a
                  href="https://www.mickeymouseclubreunion.com/mmc30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red underline underline-offset-2 transition-colors hover:text-red-deep"
                >
                  #MMC30
                </a>
                {" "}— Cast &amp; Crew reunion at Walt Disney World® Resort
              </figcaption>
            </figure>
          </Reveal>

          {/* Copy */}
          <div className="mx-auto mt-14 max-w-3xl">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
                Social Impact
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                MMC&rsquo;89 Social Impact Initiative
              </h2>
            </Reveal>
            <Reveal delay={80} className="mt-8 space-y-6 text-base leading-relaxed text-warm-gray">
              <p>
                Our MMC&rsquo;89 Initiative uses the United Nations&rsquo;
                Global Goals as a framework for identifying and supporting a
                wide range of causes — including those related to education,
                inequality and climate change.
              </p>
              <p>
                Although our primary focus is Mentoring &amp; Youth Arts
                Education, our team has raised more than $50 million to
                support all 17 of the Global Goals.
              </p>
            </Reveal>
          </div>

          {/* All 17 Global Goals — each tile links to the UN goal page */}
          <Reveal delay={120}>
            <ul
              aria-label="All 17 UN Global Goals"
              className="mx-auto mt-12 grid max-w-3xl grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3 lg:grid-cols-9"
            >
              {Array.from({ length: 17 }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <a
                    href={`https://sdgs.un.org/goals/goal${n}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Learn about UN Global Goal ${n} on sdgs.un.org`}
                    className="block overflow-hidden rounded-md transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                  >
                    <Image
                      src={`/images/sdg/sdg-${String(n).padStart(2, "0")}.jpg`}
                      alt={`UN Global Goal ${n}`}
                      width={150}
                      height={150}
                      sizes="(min-width: 1024px) 110px, 18vw"
                      className="block h-auto w-full"
                      unoptimized
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* MMC'89 Programs & Campaigns grid */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Programs & Campaigns
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              MMC&rsquo;89 in action
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c, i) => {
              const Icon = c.Icon;
              return (
                <Reveal
                  as="li"
                  key={c.title}
                  delay={(i % 3) * 80}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {/* Image + icon badge */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                      style={
                        c.image.objectPosition
                          ? { objectPosition: c.image.objectPosition }
                          : undefined
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-ink/0 to-transparent"
                    />
                    {/* Icon badge — top-left */}
                    <span className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-red shadow-soft-sm backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-red group-hover:text-cream motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-lg font-medium leading-snug text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm-gray">
                      {c.body}
                    </p>
                    {c.goals && (
                      <div className="mt-5">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                          {c.goals}
                        </p>
                        <GoalIcons goals={c.goals} />
                      </div>
                    )}
                    {c.cta && (
                      <a
                        href={c.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Testimonials
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              What our partners say
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-7 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                as="li"
                key={t.name}
                delay={i * 100}
                className="flex h-full flex-col rounded-2xl border border-border bg-cream p-8 shadow-soft-sm"
              >
                <Quote className="h-6 w-6 text-gold" aria-hidden />
                <blockquote className="mt-4 flex-1 font-display text-lg italic leading-snug text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="mt-1 text-sm text-warm-gray">{t.title}</p>
                  {t.note && (
                    <p className="mt-2 text-[12px] italic leading-snug text-warm-gray">
                      {t.note}
                    </p>
                  )}
                </figcaption>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Our Partners
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Doing this together
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={(i % 3) * 80}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-soft-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* Logo matte — full logo with safe padding, no crop */}
                <div className="relative aspect-[16/9] w-full bg-cream p-6 ring-1 ring-inset ring-ink/[0.04]">
                  <Image
                    src={p.logo.src}
                    alt={p.logo.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className={`object-contain p-5 ${p.logo.invert ? "invert hue-rotate-180" : ""}`}
                  />
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-display text-xl font-medium text-ink">{p.name}</p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm-gray">
                    {p.body}
                  </p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
                  >
                    Visit {p.name}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-warm-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Downloads
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Take it with you
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((d, i) => (
              <Reveal
                as="li"
                key={d.file}
                delay={i * 80}
              >
                <a
                  href={d.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-cream p-6 no-underline transition-colors hover:border-ink/30"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-cream">
                    <Download className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[17px] font-medium leading-snug text-ink">
                      {d.title}
                    </span>
                    <span className="mt-1 text-xs uppercase tracking-[0.14em] text-warm-gray">
                      PDF
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
