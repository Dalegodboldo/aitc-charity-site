import type { Metadata } from "next";
import Image from "next/image";
import { Sprout, Target } from "lucide-react";
import { DonateTrigger } from "@/components/site/donate-trigger";
import { Reveal } from "@/components/site/reveal";
import { TrackedCta } from "@/components/mentorship/tracked-cta";
import { TrackedOutboundLink } from "@/components/site/tracked-outbound-link";
import { StudentSpotlightTrigger } from "@/components/site/student-spotlight";
import { COACHES } from "@/lib/mentorship/coaches";

/**
 * /mentorship-coaching — native rebuild of the legacy Wix landing
 * page at legacy.mickeymouseclubreunion.com/mentorship-coaching, so
 * Google Ads can target alwaysintheclub.org without a redirect.
 *
 * Conversion CTAs are wired to GA4 via <TrackedCta />. Each click
 * fires one `book_coach` / `apply_for_mentor` / `schedule_call` /
 * `book_speaker` event with a `cta` param identifying which surface
 * was clicked — splits cleanly in GA4 reporting (e.g. hero-strip
 * vs coach-card vs program-card).
 *
 * Design system: cream/red/ink/gold tokens + Newsreader display
 * + Public Sans body, matching the rest of this site. The reference
 * page on the legacy hub uses different tokens; we port the
 * structure and copy but render it in this site's voice.
 */

const APPLY_FOR_MENTOR_FORM = "https://forms.gle/WGWNzEf5KpX8Zmm17";
const FREE_CONSULT_CALL =
  "https://calendly.com/dale-createimpactnow/free-consultation";
const LEGACY_BROADWAY =
  "https://legacy.mickeymouseclubreunion.com/destination-broadway";
const LEGACY_DESTINATION_DISNEY =
  "https://legacy.mickeymouseclubreunion.com/destination-disney";
const HOW_TO_TALK_AMAZON =
  "https://www.amazon.com/How-Talk-People-Confidence-Authentically-ebook/dp/B0FFZV1QFB?dib=eyJ2IjoiMSJ9.O3kHamsUpuCqmfbb19Q2OY_YQvKLiJlkJdsJ1aKArNfbY1JUBzpR-UZaiXhe7ex1MnpqMDBGE_9C-c5PX1CUekYMNDSzdESEu-JT_khxtsCtHIAQSNLTEhRNxT7cY9XSxnsT0jKAZeD0kQ0X9ZJqJ5amg8zA7Fi4fRth70EWdWXtGis9Ngym-f0Ing2iv6G5czQPSMJyuLFWs-9WGTzI97dNLfcP3e1uBjWMclF-M2Ts2NghufgnQOBMExDvI4pypIhnzDPnZ7xrRFhBwL3w4Y2HsQ3y2rZnS40SUvaYfGE.JEI-NdQQagBTTvS-mv9Bhi5NF-OkkXjLfpdiU9x3UKU&dib_tag=se&keywords=zoe+chase&qid=1752993863&sr=8-1&linkCode=sl1&tag=zoechasemedia-20&linkId=8cbaf485cf33781f3130b55019c7008e&language=en_US&ref_=as_li_ss_tl";
const LIVESTREAM_REPORT =
  "https://www.canva.com/design/DAF7Zy0aTyU/ol6N5NmXAJena8N-trOswg/view?utm_content=DAF7Zy0aTyU&utm_campaign=designshare&utm_medium=link&utm_source#1";
// This site doesn't have a /contact route (the reference site does).
// CTAs that previously routed to /contact?subject=… now smooth-scroll
// down to the footer's Contact column, where the visitor can see the
// org's email, phones, and addresses and pick how they want to reach
// out. #contact is the id on the footer's Contact <div> (with
// scroll-mt-24 so the header doesn't cover the heading).
const FOOTER_CONTACT_ANCHOR = "#contact";

export const metadata: Metadata = {
  title: "Coaching & Mentorship",
  description:
    "Disney Alumni and entertainment industry pros empowering young creators through expert coaching, mentoring, and workshops. Apply for a mentor, book a coach, or schedule a call with Always In The Club Foundation.",
  alternates: { canonical: "/mentorship-coaching" },
};

const STATS = [
  {
    n: "3,500+",
    label: "students",
    body: "Our team of coaches and mentors have impacted more than 3,500 students, helping them realize their potential and achieve their dreams.",
  },
  {
    n: "30+ years",
    label: "industry experience",
    body: "Our coaches each bring 30+ years of entertainment industry experience (more than 300 years combined), providing invaluable insights and guidance.",
  },
  {
    n: "5 core values",
    label: "guiding our work",
    body: "Our core values include Creativity, Empowerment, Integrity, Collaboration, and Excellence, which shape our approach to education and mentorship.",
  },
];

type ProgramCta = {
  label: string;
  href: string;
  event:
    | { event: "book_coach" }
    | { event: "apply_for_mentor" }
    | { event: "schedule_call" }
    | { event: "book_speaker" };
  ctaId: string;
  external?: boolean;
  variant?: "pill" | "inline";
};

type Program = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  /** object-position class for the card image (e.g. "object-top"). */
  imagePos?: string;
  /** Serve the image as-is (skip /_next/image). Used while we're over the
   *  Vercel optimization quota so a new card image doesn't 402. */
  unoptimized?: boolean;
  /** Render the "Student Spotlight: Yaffa Botier" trigger as the first
   *  button on the card. */
  spotlight?: boolean;
  ctas: ProgramCta[];
};

const PROGRAMS: Program[] = [
  {
    eyebrow: "Empowering Youth",
    title: "Through Coaching Sessions",
    body: "One-on-one sessions with Mouseketeers such as Rhona Bennett (formerly of En Vogue). Sessions are designed to motivate and inspire the next generation of creatives.",
    image: "/images/mentorship-coaching/Cards/empowering-youth.avif",
    ctas: [
      {
        label: "Book a coach",
        href: "#need-a-coach",
        event: { event: "book_coach" },
        ctaId: "program-card:book-coach",
        external: false,
      },
    ],
  },
  {
    eyebrow: "Guiding Youth",
    title: "Through Mentoring & Arts Education",
    body: "Benefits include: healthier lifestyle choices, higher college enrollment rates, and enhanced self-esteem and self-confidence.",
    image: "/images/yaffa-chasen.jpg",
    // Faces (Yaffa + Chasen) sit at the top; the overlay text is at the
    // bottom — anchor the 16:9 crop to the top to keep the faces and drop
    // the text. Served unoptimized (web-sized copy) while over quota.
    imagePos: "object-top",
    unoptimized: true,
    spotlight: true,
    ctas: [
      {
        label: "Apply for mentor",
        href: APPLY_FOR_MENTOR_FORM,
        event: { event: "apply_for_mentor" },
        ctaId: "program-card:apply-for-mentor",
        external: true,
      },
    ],
  },
  {
    eyebrow: "Inspiring Youth",
    title:
      "Through Experiential Learning Adventures on Broadway & Disney Parks",
    body: "Mouseketeers are hosting Experiential Learning trips to New York City (Broadway) and to Disney Imagination Campus. Many of the 'Teers are Broadway veterans and grew up at Walt Disney World during the taping of the 'All New' Mickey Mouse Club.",
    image: "/images/mentorship-coaching/Cards/Inspiring-youth.avif",
    ctas: [
      {
        label: "Learn more",
        href: LEGACY_BROADWAY,
        event: { event: "schedule_call" },
        ctaId: "program-card:experiential-learning",
        external: true,
      },
    ],
  },
  {
    eyebrow: "Equipping Youth",
    title: "Through Speaker Sessions & Workshops",
    body: "Our speakers have impacted 3,500+ students while sharing stages alongside icons like Jack Canfield, John Travolta, Halle Berry, Quincy Jones, Matthew McConaughey, Les Brown, Demi Moore, and Shark Tank's Robert Herjavec.",
    image: "/images/mentorship-coaching/Cards/equiping-youth.avif",
    ctas: [
      {
        label: "Book a speaker",
        href: FOOTER_CONTACT_ANCHOR,
        event: { event: "book_speaker" },
        ctaId: "program-card:book-speaker",
        external: false,
      },
    ],
  },
  {
    eyebrow: "Educating Youth",
    title: "Through Training & Activations",
    body: "Covering topics from entrepreneurship to leadership. Activations feature leaders in business and the arts, including former Senior Disney Executives Dan & Lee Cockerell. Our global livestream from Walt Disney World reached over 2,000 youth delegates.",
    image: "/images/mentorship-coaching/Cards/educating-youth.avif",
    ctas: [
      {
        label: "Partner with us",
        href: FOOTER_CONTACT_ANCHOR,
        event: { event: "schedule_call" },
        ctaId: "program-card:partner-with-us",
        external: false,
      },
      {
        label: "Livestream impact report",
        href: LIVESTREAM_REPORT,
        event: { event: "schedule_call" },
        ctaId: "program-card:livestream-impact-report",
        external: true,
        variant: "inline",
      },
    ],
  },
];

const MENTOR_CARDS = [
  {
    image: "/images/mentorship-coaching/mentors/lindsey-mentor.avif",
    eyebrow: "Our experience",
    body: "Mouseketeers each have more than 30 years of experience operating at the highest levels of the entertainment industry. They've seen it all, managed the pitfalls, and achieved both career success and personal growth.",
  },
  {
    image: "/images/mentorship-coaching/mentors/rhona-mentor-2.webp",
    eyebrow: "What drives our work",
    body: "We believe young people today need a well-rounded education with mentoring that includes training in the arts, entrepreneurship, and life-skills, as well as guidance in innovation, leadership, personal growth, and managing mental health.",
  },
  {
    image: "/images/mentorship-coaching/mentors/tony-mentor.avif",
    eyebrow: "Our method",
    body: "Safe space for virtual and in-person meet-ups; collaboration with parents is mandated for children under 18. The program supports young people aged 14–25; mentor/mentee relationships can last from one month to one year based on your needs.",
    // Tony's photo crops his head off when centered in the 16:9 frame
    // — anchor to top so the headshot lands inside the visible area.
    imagePos: "object-top",
  },
];

const TEAM = [
  { name: "Chasen Hampton", role: "Executive Director & Chairman" },
  {
    name: "Gloria Ayee",
    role: "Board Member · Lecturer, Harvard University",
  },
  { name: "Tony Lucca", role: "Board Member" },
  { name: "Carrie Mulderink", role: "Diversity Manager · PhD / MA" },
  {
    name: "Lisa Cannata",
    role: "Production Management · Entrepreneur",
  },
  {
    name: "Patty Chung Adams, PGA",
    role: "Board Member · Disney Creative Dev, Inclusive Strategies",
  },
  { name: "Tasha Danner", role: "Advisor" },
  { name: "Rachel Carlsen, CPA", role: "Advisor" },
  { name: "Yvette Cherkala", role: "Member Management & Events" },
];

// Tailwind class constants used in multiple sections, hoisted so the
// JSX stays scannable. `eyebrow`/`h2Display` match the rest of the
// site's section eyebrow + display-h2 pattern.
const eyebrow =
  "text-[12px] font-semibold uppercase tracking-[0.22em] text-gold";
const h2Display =
  "mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-ink";
const lead = "mt-5 text-lg leading-relaxed text-warm-gray sm:text-xl";
const cardBase =
  "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream shadow-soft-sm";

export default function MentorshipCoachingPage() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="bg-cream pt-12 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <Image
              src="/images/wix/AITCF-CREATE20IMPACT20NOW20-202.webp"
              alt="Always In The Club Foundation — Create Impact Now"
              width={280}
              height={280}
              priority
              className="mx-auto h-auto w-[100px] sm:w-[120px] lg:w-[140px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className={`mt-6 ${eyebrow}`}>learn. grow. thrive.</p>
            <h1 className="mt-5 font-display text-[40px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[56px] lg:text-[64px]">
              Unlock Your Creative Potential
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 font-display text-xl italic leading-snug text-warm-gray sm:text-2xl">
              Learn from Disney Alumni &amp; Entertainment Industry Pros.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ EMPOWERING — stats + CTA strip ============ */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          {/* Trio of brand-red illustration icons: coaching · mentoring
              · workshops. Mirrors the legacy header. */}
          <Reveal>
            <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16">
              {[
                "need-a-coach-1.avif",
                "are-you-looking-for-a-mentor.avif",
                "need-a-coach-3.avif",
              ].map((file) => (
                <Image
                  key={file}
                  src={`/images/mentorship-coaching/icons/${file}`}
                  alt=""
                  width={140}
                  height={140}
                  // Small decorative icon (~8–18KB) rendered tiny — serve
                  // as-is so it doesn't burn an optimization transformation.
                  unoptimized
                  className="h-16 w-auto object-contain sm:h-20 md:h-24"
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className={`mt-10 ${eyebrow}`}>We empower young creators</p>
            <h2 className={`${h2Display} max-w-3xl mx-auto`}>
              Through expert coaching, mentoring, and workshops
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} as="article" delay={i * 100}>
                <div className={`${cardBase} p-7 text-left`}>
                  <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-none text-red">
                    {s.n}
                  </p>
                  <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-warm-gray">
                    {s.label}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-warm-gray">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Coaching vs. mentoring — two call-out boxes */}
          <Reveal delay={100} className="mt-16">
            <p className={eyebrow}>Coaching or mentoring?</p>
            <h3 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-medium leading-snug text-ink sm:text-[28px]">
              Know the difference
            </h3>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 text-left sm:grid-cols-2">
              {/* Coaching — goal-driven, paid */}
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream p-7 shadow-soft-sm sm:p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Target className="h-6 w-6" aria-hidden />
                </span>
                <h4 className="mt-5 font-display text-xl font-medium text-ink">
                  Coaching
                </h4>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
                  For a specific goal
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-warm-gray">
                  Short-term, goal-driven sessions with a working professional
                  to get you ready for a specific moment or milestone.
                </p>
                <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-warm-gray">
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    Prepare for a show or audition
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    Land an interview or opportunity
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    Focused craft or skill training
                  </li>
                </ul>
                <p className="mt-6 self-start inline-flex items-center rounded-full border border-border px-4 py-1.5 text-[13px] font-semibold text-warm-gray">
                  Hourly fee
                </p>
              </article>
              {/* Mentoring — holistic, free */}
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream p-7 shadow-soft-sm sm:p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-red" />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red/10 text-red">
                  <Sprout className="h-6 w-6" aria-hidden />
                </span>
                <h4 className="mt-5 font-display text-xl font-medium text-ink">
                  Mentoring
                </h4>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-red">
                  Holistic development
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-warm-gray">
                  A longer-term relationship focused on the whole person,
                  guiding growth well beyond any single goal.
                </p>
                <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-warm-gray">
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    Social-emotional learning
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    Long-term planning and direction
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    Whole-person growth and well-being
                  </li>
                </ul>
                <p className="mt-6 self-start inline-flex items-center rounded-full bg-red px-4 py-1.5 text-[13px] font-semibold text-cream">
                  Always free
                </p>
              </article>
            </div>
          </Reveal>

          {/* Mentorship vs. coaching video — from AITCF Mentor Tony Lucca */}
          <Reveal delay={120} className="mt-14">
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-ink/5 shadow-soft-sm">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/DOda5pzqP5c"
                  title="Mentorship vs. coaching, by AITCF Mentor Tony Lucca"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-warm-gray sm:text-xl">
                Learn the difference between mentorship and coaching to
                accelerate your career growth. Stop mixing these two essential
                development tools.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-warm-gray">
                Many professionals use these terms interchangeably, but
                mentorship and coaching serve very different purposes in your
                professional journey. Understanding how each approach functions
                is a critical step in building a successful career strategy.
                This breakdown by AITCF Mentor Tony Lucca clarifies the unique
                roles both play and how to leverage them effectively.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ OUR PROGRAMS — lead + CTA strip (light-grey) ============ */}
      <section className="bg-cream pb-16 pt-4 sm:pb-24 sm:pt-8">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          {/* 3D-cube icon solo above the "Our programs are designed…"
              lead — mirrors legacy placement between stats and CTAs. */}
          <Reveal delay={120} className="mt-14 flex justify-center">
            <Image
              src="/images/mentorship-coaching/icons/need-a-coach-2.avif"
              alt=""
              width={160}
              height={160}
              unoptimized
              className="h-24 w-auto object-contain md:h-32"
            />
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-warm-gray sm:text-xl">
              Our programs are designed to not only train artists in their
              craft, but also empower them with leadership training and
              life-skills needed for entrepreneurship and personal growth.
            </p>
          </Reveal>

          {/* Conversion strip — pair of red pills, then outline solo,
              then the foundation lead paragraph, then minor links. */}
          <Reveal delay={220}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <TrackedCta
                href="#need-a-coach"
                event={{ event: "book_coach" }}
                ctaId="hero-strip:need-a-coach"
                external={false}
              >
                Need a coach?
              </TrackedCta>
              <TrackedCta
                href="#mentor"
                event={{ event: "apply_for_mentor" }}
                ctaId="hero-strip:looking-for-mentor"
                external={false}
              >
                Looking for a mentor?
              </TrackedCta>
            </div>
            <div className="mt-3 flex justify-center">
              <TrackedCta
                href={FREE_CONSULT_CALL}
                event={{ event: "schedule_call" }}
                ctaId="hero-strip:schedule-a-call"
                variant="outline"
              >
                Schedule a call to learn more
              </TrackedCta>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="mx-auto mt-12 max-w-3xl text-base leading-relaxed text-ink/85">
              Building on Disney&rsquo;s investment in their youth,
              &rsquo;90s Mickey Mouse Club cast members now create
              opportunities for the next generation of dreamers, empowering
              young creatives to learn, grow, and thrive.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <TrackedCta
                href={FOOTER_CONTACT_ANCHOR}
                event={{ event: "book_speaker" }}
                ctaId="hero-strip:book-speaker"
                variant="inline"
                external={false}
              >
                Book a speaker / workshop
              </TrackedCta>
              <TrackedCta
                href={FOOTER_CONTACT_ANCHOR}
                event={{ event: "schedule_call" }}
                ctaId="hero-strip:get-involved"
                variant="inline"
                external={false}
              >
                Contact us to get involved
              </TrackedCta>
            </div>
            <div className="mt-4 flex justify-center">
              <DonateTrigger className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-sm font-semibold uppercase tracking-[0.04em] text-cream no-underline transition-all duration-200 hover:bg-red-deep hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                Donate
              </DonateTrigger>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ A LEGACY OF MENTORSHIP — Keri Russell quote ============ */}
      <section className="bg-ink py-16 text-cream sm:py-24">
        <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
            A Legacy of Mentorship
          </p>
          <blockquote className="mx-auto mt-6 max-w-3xl font-display text-[clamp(1.25rem,2.5vw,1.75rem)] italic leading-snug text-cream">
            &ldquo;Asked how she avoided some of the all too typical pitfalls
            of child stardom to become a serious, two-time Emmy-nominated
            actor,{" "}
            <strong className="font-semibold not-italic">
              [Keri] Russell
            </strong>{" "}
            chalked it up to the unique environment of The All-New Mickey
            Mouse Club.&rdquo;
          </blockquote>
          <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-cream/60">
            PEOPLE · July 10, 2024
          </p>
        </Reveal>
      </section>

      {/* ============ FIVE PROGRAM CARDS ============ */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} as="article" delay={i * 80}>
                <div className={cardBase}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-warm-white">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 540px, 100vw"
                      unoptimized={p.unoptimized}
                      className={`object-cover ${p.imagePos ?? ""}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <p className={eyebrow}>{p.eyebrow}</p>
                    <h3 className="mt-3 font-display text-xl font-medium leading-snug text-ink sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 flex-1 text-base leading-relaxed text-warm-gray">
                      {p.body}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                      {p.spotlight && (
                        <StudentSpotlightTrigger
                          className=""
                          cta={{
                            text: "Learn how we supported Yaffa’s journey",
                            href: "/blog/student-spotlight-yaffa-botier-shares-the-stage-with-yungblud",
                          }}
                        />
                      )}
                      {p.ctas.map((cta) => (
                        <TrackedCta
                          key={cta.ctaId}
                          href={cta.href}
                          event={cta.event}
                          ctaId={cta.ctaId}
                          external={cta.external}
                          variant={cta.variant ?? "pill"}
                        >
                          {cta.label}
                        </TrackedCta>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW TO TALK TO PEOPLE BOOK ============ */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 md:grid-cols-12">
          {/* On mobile, book cover sits above the copy via order-first.
              On md+, the grid puts text-col on the left, cover on the
              right. */}
          <Reveal className="md:col-span-7 md:order-none">
            <p className={eyebrow}>
              Connect authentically · Network powerfully
            </p>
            <h2 className={h2Display}>How to Talk to People</h2>
            <p className={lead}>
              Build Confidence, Connect Authentically, and Thrive in Every
              Social and Business Setting.
            </p>
            <p className="mt-5 text-base leading-relaxed text-warm-gray">
              All too often, youth arts training overlooks the critical
              importance of emotional intelligence, confidence, and
              networking skills. They&rsquo;re at least as important as
              actual talent in building successful careers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-warm-gray">
              Every student receives a copy of{" "}
              <em>How to Talk to People</em>, that draws on the wisdom of
              thought leaders like Brené Brown, Jack Canfield, Dale
              Carnegie, Adam Grant, and Tony Robbins. We distill the latest
              research into actionable, real-life strategies that young
              artists will need in pursuing their careers and navigating
              the waters of their chosen industry.
            </p>
            <p className={`mt-6 ${eyebrow}`}>#1 Amazon Best Seller!</p>
            <div className="mt-3">
              <TrackedCta
                href={HOW_TO_TALK_AMAZON}
                event={{ event: "schedule_call" }}
                ctaId="how-to-talk:learn-more-amazon"
              >
                Learn more
              </TrackedCta>
            </div>
          </Reveal>
          {/* Cover sits directly on the bg — no card frame. drop-shadow
              keeps the original "lift" feel. order-first puts the
              cover above on mobile; md+ uses the natural grid order. */}
          <Reveal delay={120} className="order-first md:col-span-5 md:order-none">
            <div className="relative mx-auto aspect-[3/4] max-w-[280px] md:max-w-none">
              <Image
                src="/images/mentorship-coaching/Cards/connect-authentically.avif"
                alt="How to Talk to People — book cover"
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.18)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ ARE YOU LOOKING FOR A MENTOR? ============ */}
      <section id="mentor" className="scroll-mt-24 bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="flex justify-center">
            <Image
              src="/images/mentorship-coaching/icons/are-you-looking-for-a-mentor.avif"
              alt=""
              width={160}
              height={160}
              unoptimized
              className="h-24 w-auto object-contain md:h-32"
            />
          </Reveal>
          <Reveal delay={80} className="mt-6 text-center">
            <p className={eyebrow}>Star-Powered Mentors</p>
            <h2 className={`${h2Display} max-w-3xl mx-auto`}>
              Are you looking for a mentor?
            </h2>
            <p className={`${lead} mx-auto max-w-3xl`}>
              Apply to be paired with a mentor that&rsquo;s right for you,
              your child, or someone you love.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-warm-gray">
              Our mentoring program matches young adults and children
              pursuing a career in the arts and humanities with a
              professional volunteer mentor based on common interests,
              career goals, experiences, and life challenges.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MENTOR_CARDS.map((c, i) => (
              <Reveal key={c.eyebrow} as="article" delay={i * 100}>
                <div className={cardBase}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-warm-white">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className={`object-cover ${c.imagePos ?? ""}`}
                    />
                  </div>
                  <div className="flex-1 p-7">
                    <p className={eyebrow}>{c.eyebrow}</p>
                    <p className="mt-3 text-base leading-relaxed text-warm-gray">
                      {c.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <TrackedCta
              href={APPLY_FOR_MENTOR_FORM}
              event={{ event: "apply_for_mentor" }}
              ctaId="mentor-section:apply"
            >
              Apply for mentor
            </TrackedCta>
            <TrackedCta
              href="#coaches"
              event={{ event: "book_coach" }}
              ctaId="mentor-section:book-coaching"
              variant="outline"
              external={false}
            >
              Book a coaching session
            </TrackedCta>
          </Reveal>
        </div>
      </section>

      {/* ============ NEED A COACH? ============ */}
      <section id="need-a-coach" className="scroll-mt-24 bg-warm-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16">
              {[1, 2, 3].map((n) => (
                <Image
                  key={n}
                  src={`/images/mentorship-coaching/icons/need-a-coach-${n}.avif`}
                  alt=""
                  width={140}
                  height={140}
                  // Small decorative icon rendered tiny — skip optimization.
                  unoptimized
                  className="h-16 w-auto object-contain sm:h-20 md:h-24"
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className={`mt-8 ${eyebrow}`}>
              Whether it&rsquo;s a one-off project or ongoing self-improvement
            </p>
            <h2 className={`${h2Display} max-w-3xl mx-auto`}>
              Need a coach?
            </h2>
            <p className={`${lead} mx-auto max-w-3xl`}>
              By making a donation you can book time with experienced
              artists, entrepreneurs, educators, and empowerment coaches
              who will help you or your child learn, grow, and thrive.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-warm-gray">
              Your contribution helps provide young people in underserved
              communities scholarships to our programs including our
              Experiential Learning trips to Disney Imagination Campus.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-xs italic leading-relaxed text-warm-gray">
              A parent or guardian must be present at all coaching sessions
              for children under 18.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-8 flex justify-center">
            <TrackedCta
              href="#coaches"
              event={{ event: "book_coach" }}
              ctaId="need-coach-section:book"
              external={false}
            >
              Book sessions with our coaches
            </TrackedCta>
          </Reveal>
        </div>
      </section>

      {/* ============ MEET OUR COACHES ============ */}
      <section id="coaches" className="scroll-mt-24 bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Section header — two-column on md+: group photo of the
              Mouseketeer mentors on the LEFT, eyebrow + h2 + lead + the
              coaching-vs-mentoring callout on the RIGHT. On mobile the
              image stacks above the copy via the natural grid order. */}
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              {/* Group photo is nearly square (862×860). aspect-square +
                  object-contain keeps everyone visible — nobody's head
                  or feet get cropped. The bg-warm-white frame fills any
                  pixel-rounding gaps around the image. */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-warm-white shadow-soft-sm">
                <Image
                  src="/images/mentorship-coaching/mentors/mouseketeer-group-mentors.avif"
                  alt="Mouseketeer mentors gathered together"
                  fill
                  sizes="(min-width: 768px) 540px, 100vw"
                  className="object-contain"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className={eyebrow}>learn. grow. thrive.</p>
              <h2 className={h2Display}>Meet our coaches</h2>
              <p className={lead}>
                Each of our coaches brings 30+ years of entertainment
                industry excellence, trained by Disney in their youth.
                They&rsquo;ve shared stages alongside icons in
                entertainment, business, and government — from Jack
                Canfield and Quincy Jones to Matthew McConaughey, Shark
                Tank&rsquo;s Robert Herjavec, and Presidents Bill Clinton
                and George W. Bush.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-warm-gray">
                1:1 Coaching Sessions are booked with a donation to Always
                In The Club Foundation below. Our 3-month Mentoring
                Program requires no contribution with your approved
                application.{" "}
                <TrackedOutboundLink
                  href={APPLY_FOR_MENTOR_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm font-semibold text-red underline underline-offset-2 decoration-red/40 transition-colors hover:text-red-deep hover:decoration-red-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  Apply here
                </TrackedOutboundLink>
                .
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COACHES.map((c, i) => (
              <Reveal key={c.slug} as="article" delay={(i % 3) * 80}>
                <div id={c.slug} className={`${cardBase} scroll-mt-24`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-warm-white">
                    <Image
                      src={c.image}
                      alt={`Portrait of ${c.name}`}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                      {c.role}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-medium leading-snug text-ink sm:text-xl">
                      {c.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-warm-gray">
                      {c.highlight}
                    </p>
                    <div className="mt-5">
                      <TrackedCta
                        href={c.bookUrl}
                        event={{ event: "book_coach", coach: c.slug }}
                        ctaId={`coach-card:${c.slug}`}
                      >
                        Book {c.name.split(" ")[0]}
                      </TrackedCta>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-10 max-w-2xl text-center text-xs italic text-warm-gray">
            Email us to book a speaker for your event, company retreat, or
            school program.
          </Reveal>
        </div>
      </section>

      {/* ============ DESTINATION: DISNEY IMAGINATION CAMPUS ============ */}
      <section className="bg-ink py-16 text-cream sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-8 md:grid-cols-2 md:gap-14">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-warm-gray/40 shadow-soft">
              <Image
                src="/images/wix/gallery/deedee-jenn-student-disney-campus.webp"
                alt="Mouseketeers Deedee Magno Hall and Jennifer McGill with a student at Disney's Imagination Campus"
                fill
                sizes="(min-width: 768px) 540px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Destination: Disney
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-cream">
              Imagination Campus
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/85 sm:text-xl">
              Mouseketeers are hosting once-in-a-lifetime Experiential
              Learning trips to Disneyland and Walt Disney World. Join us!
            </p>
            <div className="mt-8">
              <TrackedCta
                href={LEGACY_DESTINATION_DISNEY}
                event={{ event: "schedule_call" }}
                ctaId="destination-disney:learn-more"
              >
                Learn more
              </TrackedCta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MEET THE TEAM ============ */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className={eyebrow}>Meet the team</p>
            <h2 className={`${h2Display} max-w-3xl mx-auto`}>
              The board and staff making it happen
            </h2>
            <p className={`${lead} mx-auto max-w-3xl`}>
              Our board and staff is comprised of accomplished individuals
              across a wide range of skills uniquely suited to our mission,
              and have raised more than $50 million for outstanding
              nonprofit efforts. Most importantly, they&rsquo;re committed
              to helping Always In The Club Foundation make a difference in
              the lives of those who need it most.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} as="article" delay={(i % 3) * 80}>
                <div
                  className={`${cardBase} p-5 text-center sm:p-6`}
                >
                  <p className="font-display text-base font-medium text-ink">
                    {m.name}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-warm-gray">
                    {m.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* The full team page is on this same site (alwaysintheclub.org/team)
              so this is an internal link, not a new-tab outbound. */}
          <Reveal className="mt-10 flex justify-center">
            <TrackedCta
              href="/team"
              event={{ event: "schedule_call" }}
              ctaId="team-section:visit-team-page"
              variant="outline"
              external={false}
            >
              Meet the full team
            </TrackedCta>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
