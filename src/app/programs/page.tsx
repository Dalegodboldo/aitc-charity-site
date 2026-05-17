import type { Metadata } from "next";
import { ArrowUpRight, Download, Quote } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Programs & Initiatives — Always In The Club Foundation",
  description:
    "Mentoring, Experiential Learning, Workshops & Coaching, and the MMC'89 Social Impact Initiative.",
};

const programs = [
  {
    title: "Mentoring",
    body: "We match young adults and children pursuing a career in the entertainment industry with a Mouseketeer Mentor or other accomplished veteran of the arts, based on common interests, career goals, experiences, and life challenges. Our mentorship service provides a safe space for both virtual and in-person meet-ups, and includes collaboration with parents for children under 18.",
    href: "https://www.mickeymouseclubreunion.com/mentorship-coaching#mentor",
  },
  {
    title: "Experiential Learning",
    body: "There’s no education like real-world experience. Mouseketeers are leading experiential learning trips to Broadway and to Disney Imagination Campus for young people interested in performing arts, arts and humanities, science and technology, leadership, and innovation.",
    href: "https://createimpactnow.funnels.cx/experiential-learning-adventures",
  },
  {
    title: "Workshops & Coaching",
    body: "Mouseketeers are sharing their knowledge through workshops and one-on-one coaching sessions for personal growth and advancing students’ careers — training young creatives on their craft while providing guidance on emotional well-being and the business of entertainment.",
    href: "https://www.mickeymouseclubreunion.com/mentorship-coaching#coaches",
  },
];

const campaigns = [
  {
    title: "Business Launch & Growth Solutions",
    body: "We transform visions into impact, providing comprehensive for-profit and nonprofit launch and growth solutions.",
    goals: "Global Goals 8, 9, 10 & 17",
  },
  {
    title: "Community Support & Resources",
    body: "A range of emergency services for cast members in need. Originally formed as Cast Member Pantry at the height of the COVID-19 pandemic, we have served more than 10,000 cast members with groceries and other food essentials.",
    goals: "Global Goals 2 & 17",
  },
  {
    title: "Use Your Bottle, Change Our World",
    body: "With support from the United Nations Development Program, we launched a campaign promoting a solution-based approach to reducing single-use plastic.",
    goals: "Global Goals 6, 12 & 13",
  },
  {
    title: "Veterans, First Responders & Healthcare Workers",
    body: "We support veterans and first responders in partnership with Victory Bridge and others, including a campaign with Orlando Bloom to reduce the stigma around mental health in veteran communities.",
    goals: "Global Goals 3, 8, 16 & 17",
  },
  {
    title: "Day at Disney",
    body: "Merit-based trips with Mouseketeers to Disney World and Disneyland for outstanding youth.",
    goals: "Global Goals 4 & 17",
  },
  {
    title: "Day of Service",
    body: "Mouseketeer-led volunteering — including sorting 4,000 pounds of food at Nashville’s Second Harvest Food Bank to provide more than 3,000 meals to people in need.",
    goals: "Global Goals 1–17",
  },
  {
    title: "Day of Hope / Evening of Impact",
    body: "Empowering days of pampering and evenings of impact for women who are victims of domestic abuse.",
    goals: "Global Goals 5 & 10",
  },
  {
    title: "Hall of Fame / Be Great! Awards",
    body: "Like the Mouse Club’s “Hall of Fame Day,” we spotlight community leaders and provide grants to those in need.",
    goals: "Global Goals 1–17",
  },
  {
    title: "Why? Because It’s Christmas",
    body: "Mouseketeers reunited for music and events supporting MusiCares and music people in need.",
    goals: "Global Goals 1, 2 & 3",
  },
  {
    title: "Shop the Club, We Plant a Tree",
    body: "With every purchase or donation in our Club Store, we plant a tree in your name to help offset carbon emissions.",
    goals: "",
  },
];

const testimonials = [
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
];

const partners = [
  {
    name: "MusiCares",
    body: "We partnered with MusiCares on our holiday album Why? Because It’s Christmas, which debuted at #21 on Billboard.",
  },
  {
    name: "Educational Destinations",
    body: "A Disney Parks Recognized Youth Travel Planner and Disney on Broadway’s Preferred Travel Planner.",
  },
  {
    name: "That’s 4 Entertainment",
    body: "We partner with their 90s Con and Christmas Con to raise awareness and funds for our programs.",
  },
  {
    name: "Entertainment For Change",
    body: "We work with EFC to amplify young voices and create a new kind of empowered leader.",
  },
  {
    name: "Be Great!",
    body: "A social impact-based production company. Together we produce awards, events and media that inspire people to Be Great!",
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
        body="Our MMC’89 Initiative uses the United Nations’ Global Goals as a framework for identifying and supporting a wide range of causes — including those related to education, inequality and climate change. Although our primary focus is Mentoring & Youth Arts Education, our team has raised more than $50 million to support all 17 of the Goals."
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

          <Reveal delay={80} className="mt-10 space-y-7 text-lg leading-relaxed text-warm-gray">
            <p>
              More than a variety show, the &ldquo;All New&rdquo; Mickey Mouse
              Club was a world-class performing arts academy.
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

          <Reveal delay={200} className="space-y-7 text-lg leading-relaxed text-warm-gray">
            <p>
              Inspired by the support they received from Disney, Mouseketeers
              are lending their unique insights to enhance the lives of young
              people through mentoring and arts education — essential for social
              and emotional well-being, and critical tools for establishing
              equity and access.
            </p>
          </Reveal>

          <Reveal delay={260} className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-cream p-7 sm:p-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red">
                What We Aim To Solve
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-warm-gray">
                Adolescence is a critical period of development characterized
                by numerous challenges and transitions. Arts education can
                serve as a powerful preventive tool to mitigate potential
                negative mental health outcomes among adolescents. Traditional
                educational institutions prioritize preparing young people to
                obtain a diploma that leads to employment — but the era when a
                diploma guaranteed a stable 9-to-5 job has passed. Today&rsquo;s
                young people confront unique professional and emotional hurdles
                stemming, in part, from the pervasive influence of social media
                and the rise of the gig economy.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-cream p-7 sm:p-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-red">
                Our Solutions
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-warm-gray">
                To thrive in a modern, dynamic landscape, young people today
                require a well-rounded education with mentoring that includes
                training in the arts, entrepreneurship, and life skills, as
                well as guidance in innovation, leadership and managing mental
                health. Spearheaded by reunited Mouseketeers and others, we are
                working to fill the gaps left by traditional learning
                institutions with youth arts education and mentoring programs
                that include real-world learning opportunities.
              </p>
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
            {programs.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 80}
                className="flex h-full flex-col rounded-2xl border border-border bg-warm-white p-7 shadow-soft-sm sm:p-8"
              >
                <h3 className="font-display text-xl font-medium leading-snug text-ink sm:text-[22px]">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-warm-gray">
                  {p.body}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* MMC'89 Social Impact Initiative */}
      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
              Social Impact
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              MMC&rsquo;89 Social Impact Initiative
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10 space-y-6 text-lg leading-relaxed text-warm-gray">
            <p>
              MMC&rsquo;89 promotes the United Nations&rsquo; Sustainable
              Development Goals (Global Goals) that address the global
              challenges we face. We support socially conscious efforts across
              a wide range of causes including climate action, feeding the
              hungry, critically ill children, victims of domestic abuse, music
              people in need, socially conscious entrepreneurship, quality
              education, job creation, veterans issues, and mental health.
            </p>
            <p>
              Through events and awareness campaigns, we have helped raise
              more than $4.5 million. MMC&rsquo;89 is currently comprised of 12
              programs and campaigns addressing all 17 of the UN&rsquo;s Global
              Goals for a better world by 2030.
            </p>
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
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={(i % 3) * 80}
                className="flex h-full flex-col rounded-2xl border border-border bg-warm-white p-7 shadow-soft-sm"
              >
                <h3 className="font-display text-lg font-medium leading-snug text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm-gray">
                  {c.body}
                </p>
                {c.goals && (
                  <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                    {c.goals}
                  </p>
                )}
              </Reveal>
            ))}
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
                className="rounded-2xl border border-border bg-warm-white p-7 shadow-soft-sm"
              >
                <p className="font-display text-xl font-medium text-ink">{p.name}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-warm-gray">
                  {p.body}
                </p>
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
