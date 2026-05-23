import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, HeartHandshake, Target, TrendingUp } from "lucide-react";
import { CountUp } from "@/components/site/count-up";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Our Why",
  description:
    "The research behind our work: how arts education and mentorship protect young people's mental health, lift academic achievement, and open real futures.",
  alternates: { canonical: "/our-why" },
};

type Stat = {
  value: number;
  suffix: string;
  label: string;
  Icon: LucideIcon;
};

const stats: Stat[] = [
  {
    value: 73,
    suffix: "%",
    label:
      "of Gen Z report a stronger drive to work hard when they sense their boss cares about their well-being and offers guidance",
    Icon: HeartHandshake,
  },
  {
    value: 79,
    suffix: "%",
    label:
      "of millennials view mentoring as essential to their career success",
    Icon: TrendingUp,
  },
  {
    value: 63,
    suffix: "%",
    label:
      "of millennials report that their leadership skills are not being adequately developed",
    Icon: Target,
  },
];

const mentorshipBenefits = [
  "Improved motivation",
  "Healthier relationships and lifestyle choices",
  "Better attitude about school",
  "Higher college enrollment rates and higher educational aspirations",
  "Enhanced self-esteem and self-confidence",
  "Improved behavior, both at home and at school",
  "Stronger relationships with parents, teachers, and peers",
  "Improved interpersonal skills",
  "Decreased likelihood of initiating drug and alcohol use",
];

const theaterFindings = [
  "A study published in Champions of Change (1999) cites theatre arts, including performance, classes, and participation in a drama club, as a source for “gains in reading proficiency, gains in self-concept and motivation, and higher levels of empathy and tolerance towards others” among youth of low socio-economic status.",
  "Drama activities can improve and help to maintain social and language skills of students with learning disabilities and remedial readers.",
  "Improvisational drama contributes to improved reading achievement and attitude in disadvantaged students.",
];

type Finding = { text: string; cite: string };

const musicFindings: Finding[] = [
  {
    text: "Children who study music tend to have larger vocabularies and more advanced reading skills than their peers who do not participate in music lessons.",
    cite: "Arete Music Academy, “Statistical Benefits of Music in Education,” accessed July 17, 2014.",
  },
  {
    text: "Students in high-quality school music education programs score higher on standardized tests than students in schools with deficient music education programs, regardless of the socioeconomic level of the community.",
    cite: "Nature Neuroscience, April 2007.",
  },
  {
    text: "Students in all regions with lower-quality instrumental programs scored higher in English and mathematics than students who had no music at all.",
    cite: "Journal for Research in Music Education, June 2007; Dr. Christopher Johnson, Jenny Memmott.",
  },
  {
    text: "African-American and Hispanic parents generally believe more strongly in a wide array of potential benefits from music education, are more likely to have seen these positive impacts on their own child, and more strongly support expanding music education programs. Ironically, these parents are also more likely to report that there are no music programs in their schools (21 percent of African-American parents and 22 percent of Hispanic parents report this, compared to 15 percent of Caucasian parents).",
    cite: "NAMM Foundation and Grunwald Associates LLC, 2015. Striking a Chord: The Public’s Hopes and Beliefs for K-12 Music Education in the United States.",
  },
  {
    text: "Everyday listening skills are stronger in musically-trained children than in those without music training. Listening skills are closely tied to the ability to perceive speech in a noisy background, pay attention, and keep sounds in memory.",
    cite: "Strait, D.L. and N. Kraus, Biological impact of auditory expertise across the life span: musicians as a model of auditory learning. Hearing Research, 2013.",
  },
  {
    text: "Music training in childhood “fundamentally alters the nervous system such that neural changes persist in adulthood after auditory training has ceased.”",
    cite: "Skoe, E. & N. Kraus, 2012. A Little Goes a Long Way: How the Adult Brain Is Shaped by Musical Training in Childhood. The Journal of Neuroscience, 32(34):11507-11510.",
  },
  {
    text: "Young children who take keyboard lessons have greater abstract reasoning abilities than their peers, and those abilities improve over time with sustained training in music.",
    cite: "Rauscher, F.H. & Zupan, M., “Classroom keyboard instruction improves kindergarten children’s spatial-temporal performance: A field experiment.” Early Childhood Research Quarterly, 15, 215-228. 2000.",
  },
  {
    text: "Children with learning disabilities or dyslexia, who tend to lose focus with more noise, could benefit greatly from music lessons.",
    cite: "Arete Music Academy, “Statistical Benefits of Music in Education,” accessed July 17, 2014.",
  },
  {
    text: "Young children who take music lessons show different brain development and improved memory over the course of a year, compared to children who do not receive musical training.",
    cite: "National Association for Music Education, “The Benefits of the Study of Music,” accessed July 17, 2014.",
  },
  {
    text: "Young children who take music lessons show different brain development and improved memory over the course of a year, compared to children who do not receive musical training.",
    cite: "Dr. Laurel Trainor, Professor of Psychology, Neuroscience, and Behavior at McMaster University, 2006.",
  },
  {
    text: "Musically trained children performed better in a memory test correlated with general intelligence skills such as literacy, verbal memory, visuospatial processing, mathematics, and IQ.",
    cite: "Dr. Laurel Trainor, Professor of Psychology, Neuroscience, and Behavior at McMaster University, 2006.",
  },
  {
    text: "Music education sharpens student attentiveness.",
    cite: "Arts Education Partnership, 2011.",
  },
  {
    text: "Music education equips students to be creative.",
    cite: "Arts Education Partnership, 2011.",
  },
  {
    text: "Learning to play percussion instruments helps children develop coordination and motor skills, because they require movement of the hands, arms, and feet.",
    cite: "Kwan, A., 2013, “6 Benefits of Music Lessons,” Parents.",
  },
  {
    text: "Music and math are highly intertwined. By understanding beat, rhythm, and scales, children are learning how to divide, create fractions, and recognize patterns.",
    cite: "Lynn Kleiner, founder of Music Rhapsody in Redondo Beach, CA.",
  },
  {
    text: "Children who study a musical instrument are more likely to excel in all of their studies, work better in teams, have enhanced critical thinking skills, stay in school, and pursue further education.",
    cite: "Arete Music Academy, “Statistical Benefits of Music in Education,” accessed July 17, 2014.",
  },
  {
    text: "Majorities of both parents and teachers see a myriad of social-emotional, academic, 21st-century skill, community, and physical and health benefits from music education, especially social-emotional benefits.",
    cite: "NAMM Foundation and Grunwald Associates LLC, 2015. Striking a Chord: The Public’s Hopes and Beliefs for K-12 Music Education in the United States.",
  },
  {
    text: "Majorities of parents whose children are involved in music classes credit music education for making them happier, more focused, more self-disciplined, stronger academically, and more helpful.",
    cite: "NAMM Foundation and Grunwald Associates LLC, 2015. Striking a Chord: The Public’s Hopes and Beliefs for K-12 Music Education in the United States.",
  },
];

/** Small muted note for the literal "(SOURCE)" placeholders in the copy. */
function SourceTag() {
  return <span className="text-warm-gray/45"> (SOURCE)</span>;
}

function SectionImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-soft-sm ring-1 ring-ink/[0.04]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 960px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/** A 2-up image frame for the paired brand graphics (cropped 1080x974). */
function PairImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[1080/974] w-full overflow-hidden rounded-2xl shadow-soft-sm ring-1 ring-ink/[0.04]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 480px, 90vw"
        className="object-cover"
      />
    </div>
  );
}

export default function OurWhyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Why"
        title="Here's What We Know"
        body="We do not guess at this work. Decades of research show how arts education and mentorship protect young people, lift their achievement, and open real futures. Here is some of what that research makes plain."
      />

      {/* Hero banner */}
      <section className="bg-cream pb-14 sm:pb-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <SectionImage
              src="/images/disney-campus-kids-only.webp"
              alt="Young students exploring at Disney Imagination Campus"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Opening quote */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <figure className="border-l-4 border-red pl-6 sm:pl-8">
              <blockquote className="font-display text-2xl font-medium italic leading-snug tracking-tight text-ink sm:text-[30px]">
                &ldquo;Adolescence is a critical period of development
                characterized by numerous challenges and transitions. During
                this time, young individuals are susceptible to various mental
                health issues, such as depression, anxiety, and low
                self-esteem. Arts education can serve as a powerful preventive
                tool to mitigate potential negative mental health outcomes
                among adolescents.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-warm-gray">
                Renate Rohlfing, M.M., M.A., MT-BC
                <span className="mt-1 block font-normal normal-case tracking-normal text-warm-gray/75">
                  Arts Education and Youth Identity
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* What the evidence shows — stat band */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              What the evidence shows
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              The arts keep young people engaged
            </h2>
            <p className="mt-5 text-base leading-relaxed text-warm-gray">
              Studies show that students with arts classes tend to have
              superior attendance records and demonstrate a greater overall
              engagement in their educational pursuits compared to those who do
              not participate in the arts. Mentorship shows comparable
              outcomes.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((s, i) => {
              const Icon = s.Icon;
              return (
                <Reveal
                  as="li"
                  key={s.label}
                  delay={i * 80}
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-warm-white p-7 shadow-soft-sm transition-shadow duration-300 hover:shadow-soft"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red/10 text-red transition-colors duration-300 group-hover:bg-red group-hover:text-cream">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="font-display text-[44px] font-medium leading-none tracking-tight text-red">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[14px] leading-snug text-warm-gray">
                    {s.label}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Benefits of Mentorship */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              <PairImage
                src="/images/Red-mentorship.png"
                alt="Always In The Club Foundation mentorship"
              />
              <PairImage
                src="/images/Mentors-red.png"
                alt="Mentors at the Always In The Club Foundation"
              />
            </div>
          </Reveal>
          <Reveal className="mt-12 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              The case for mentorship
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Benefits of Mentorship
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-8 max-w-3xl">
            <div className="rounded-2xl border border-border bg-cream p-7 sm:p-8">
              <h3 className="font-display text-xl font-medium text-ink">
                Refining career objectives
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-warm-gray">
                Engaging in discussions with a mentor enables you to chart your
                career trajectory with greater clarity. Their guidance aids in
                identifying both immediate and distant professional
                aspirations, allowing you to collaboratively devise plans to
                fulfill these objectives. An effective mentor attentively
                considers your vocational ambitions, leverages their expertise
                to evaluate the feasibility of your plans, and assists in
                breaking down attainable targets into manageable, executable
                actions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-10 max-w-3xl">
            <p className="text-[15px] font-medium text-ink">
              Research also links mentorship to:
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {mentorshipBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-[15px] leading-snug text-warm-gray">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] italic leading-snug text-warm-gray/65">
              MENTOR, 2009; Cavell, DuBois, Karcher, Keller, &amp; Rhodes, 2009.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Theater and Drama Education */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <SectionImage
              src="/images/img_1593.jpg"
              alt="Young people in an Always In The Club Foundation program"
            />
          </Reveal>
          <Reveal className="mt-12 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              On the stage
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Theater and Drama Education
            </h2>
            <p className="mt-5 text-base leading-relaxed text-warm-gray">
              A multitude of research has established a link between
              participation in drama and enhanced academic performance.
              Students engaged in drama activities not only achieve higher
              scores on standardized tests than their peers who are not exposed
              to the arts, but they also exhibit improved reading
              comprehension. Moreover, these students tend to have superior
              attendance records and demonstrate a greater overall engagement
              in their educational pursuits compared to those who do not
              participate in the arts.
              <SourceTag />
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8 max-w-3xl">
            <ul className="space-y-5">
              {theaterFindings.map((f, i) => (
                <li key={i} className="border-l-2 border-gold/50 pl-5">
                  <p className="text-[15px] leading-relaxed text-warm-gray">
                    {f}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Music Education */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <SectionImage
              src="/images/red-mentorship-v2.png"
              alt="Always In The Club Foundation mentorship"
            />
          </Reveal>
          <Reveal className="mt-12 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              By ear and by heart
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Music Education
              <SourceTag />
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-8 max-w-3xl">
            <ul className="space-y-6">
              {musicFindings.map((f, i) => (
                <li key={i} className="border-l-2 border-gold/50 pl-5">
                  <p className="text-[15px] leading-relaxed text-warm-gray">
                    {f.text}
                  </p>
                  <p className="mt-1.5 text-[13px] italic leading-snug text-warm-gray/65">
                    {f.cite}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              This is our why
            </h2>
            <p className="mt-5 text-base leading-relaxed text-warm-gray">
              Every workshop, every coaching session, and every mentor we
              connect is built on what this research makes plain: the arts and
              a caring mentor can change the course of a young life.
            </p>
            <Link
              href="/programs"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-semibold text-cream no-underline shadow-[0_12px_28px_-12px_rgba(171,7,7,0.55)] transition-colors hover:bg-red-deep hover:text-cream"
            >
              Explore our programs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
