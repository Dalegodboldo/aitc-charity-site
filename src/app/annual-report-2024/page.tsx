/**
 * Always In The Club Foundation — FY 2024 Annual Report
 *
 * Source-of-truth: docs/AITCF_FY2024_Annual_Report.html
 *
 * Renders inside the standard site layout (header + footer come from
 * the root layout). A scoped CSS module preserves the editorial
 * typography from the source HTML without leaking it onto other
 * pages. Fraunces is loaded here via next/font and its variable is
 * applied only to the page wrapper so other pages don't pay the
 * font-loading cost.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { SubNav } from "./sub-nav";
import styles from "./page.module.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FY 2024 Annual Report",
  description:
    "Always In The Club Foundation — Fiscal Year 2024 Annual Report. DBA Create Impact Now. Education, Arts, Resources… Social Impact.",
  alternates: { canonical: "/annual-report-2024" },
  openGraph: {
    type: "article",
    title: "AITC Foundation — FY 2024 Annual Report",
    description:
      "A year of strengthening fundamentals, launching the book, and deepening our community of supporters.",
    images: [
      {
        url: "/images/disney-campus.png",
        width: 1200,
        height: 630,
        alt: "Always In The Club Foundation — FY 2024 Annual Report",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AITC Foundation — FY 2024 Annual Report",
    description:
      "A year of strengthening fundamentals, launching the book, and deepening our community of supporters.",
    images: ["/images/disney-campus.png"],
  },
};

export default function AnnualReport2024Page() {
  return (
    <div className={`${fraunces.variable} ${styles.report}`}>
      <SubNav />

      <article>
        {/* ============ HERO ============ */}
        <header id="hero" className={styles.hero}>
          {/* Subtle backdrop image, very low opacity. */}
          <Image
            src="/images/disney-campus.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBackdrop}
            aria-hidden
          />
          <div className={styles.heroEyebrow}>
            Always In The Club Foundation
          </div>
          <h1 className={styles.heroTitle}>
            Annual
            <br />
            <em>Report</em>
          </h1>
          <div className={styles.heroYear}>Fiscal Year 2024</div>
          <div className={styles.heroYearSub}>(FYE 2025)</div>
          <div className={styles.heroMeta}>
            Nov. 1, 2024 &ndash; Oct. 31, 2025
            <span>·</span>
            DBA Create Impact Now
          </div>
          <p className={styles.heroTagline}>
            Education, Arts, Resources… <em>Social Impact.</em>
            <br />
            Using our E.A.R.S. to make a difference.
          </p>
        </header>

        {/* ============ CEO LETTER ============ */}
        <section id="letter" className={styles.section}>
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              A Letter from the CEO
            </div>
            <h2 className={styles.sectionTitle}>
              What a <em>defining year</em> for Always In The Club Foundation.
            </h2>

            <p className={styles.lead}>
              Fiscal Year 2024 brought a <em>new way</em> to help us tell our
              story and fund our mission.
            </p>

            <p>
              After years of preparation, we launched{" "}
              <em>
                Always In The Club: The True Story of The All-New Mickey Mouse
                Club
              </em>{" "}
              — a three-volume history built on more than 60 interviews
              with cast members, crew, and executives who shaped the show.
              The book is more than a publishing project. It is a vehicle
              for preserving cultural legacy, deepening our community of
              supporters, and generating sustainable revenue to power our{" "}
              <strong>youth mentoring and arts education</strong> work. This work
              included new one-on-one mentee sessions led by Mouseketeer
              alumni Deedee Magno Hall and Tony Lucca, connecting young
              creatives with working entertainment professionals who have
              walked the path. We also built new partnerships to assist us in
              better codifying and scaling our program, and are excited to
              unveil those plans in the coming years.
            </p>

            <p>
              At the same time, we continued our community impact through
              MMC&rsquo;89, our overarching initiative for community service.
              This included sponsoring an event that raised $7,000 for AIDS
              research and our environmental commitment by funding
              tree-planting through every merchandise purchased (including
              items from our newly launched{" "}
              <em>Mickey &amp; Friends Collection by Disney</em>). Thanks to
              the generosity of our supporters, we have now proudly planted
              more than <strong>2,500 trees</strong>{" "}around the world — a
              &ldquo;forest&rdquo; equivalent to the size of a football field
              to help fight global carbon emissions.
            </p>

            <p>
              We also made the strategic decision to temporarily pause our{" "}
              <em>Destination: Disney Imagination Campus</em> program in order
              to broaden the partnerships and infrastructure that will let us
              serve more young creatives in the years ahead. Although we have
              many children on our waiting list, this was the right call for
              the long-term health of the program.
            </p>

            <p>
              Financially, this was a year of strengthening fundamentals. Net
              assets more than doubled, our program spending ratio reached
              87%, and we entered FY 2025 in our strongest position since
              incorporation, with clearer focus and a marketable asset
              actively generating revenue for the mission. The Foundation
              closed FY 2024 with a small remaining balance of $595 on a
              Shopify Capital merchant advance — a 62% reduction from the
              prior year — and has since fully retired that obligation.
            </p>

            <p>
              None of this would be possible without our board, our
              volunteers, our Mouseketeer family, and the donors who believe
              in what we are building. Thank you for being part of this story.
            </p>

            <div className={styles.signature}>
              <div className={styles.signatureName}>Chasen Hampton</div>
              <div className={styles.signatureTitle}>
                Chief Executive Officer
              </div>
            </div>
          </div>
        </section>

        {/* ============ PULL QUOTE ============ */}
        <div className={styles.pullQuote}>
          Together, we are <em>always</em> in the club.
        </div>

        {/* ============ MISSION ============ */}
        <section id="mission" className={styles.section}>
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              Our Mission
            </div>
            <h2 className={styles.sectionTitle}>
              Transforming young lives through <em>mentorship</em> and{" "}
              <em>arts education.</em>
            </h2>
            <p className={styles.lead}>
              Guided by all 17 United Nations Sustainable Development Goals,
              we work to address global challenges related to education,
              hunger, mental health, poverty, inequality, and climate change.
            </p>
            <p>
              Our primary focuses are youth mentoring, arts education, and
              supporting entrepreneurs committed to empowering their
              communities.
            </p>
          </div>
        </section>

        {/* ============ AT A GLANCE ============ */}
        <section
          id="glance"
          className={`${styles.section} ${styles.paperWarm}`}
        >
          <div className={styles.container}>
            <div className={`${styles.sectionLabel} ${styles.center}`}>
              Impact at a glance
            </div>
            <h2 className={`${styles.sectionTitle} ${styles.center}`}>
              Real <em>numbers</em> behind the work.
            </h2>

            <div className={styles.statGrid}>
              <div className={styles.stat}>
                <div className={styles.statNum}>$138K</div>
                <div className={styles.statLabel}>Total Revenue</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>87%</div>
                <div className={styles.statLabel}>Program Spending</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>+$7,907</div>
                <div className={styles.statLabel}>Net Surplus</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>+110%</div>
                <div className={styles.statLabel}>Net Asset Growth</div>
              </div>
            </div>

            <div className={styles.reading} style={{ padding: 0 }}>
              <h4 className={styles.minorTitle}>
                Additional Year-in-Review Highlights
              </h4>
              <ul className={styles.bullets}>
                <li>
                  <strong>
                    Cast, crew, and executive interviews completed for the
                    book series:
                  </strong>{" "}
                  60+
                </li>
                <li>
                  <strong>New alumni mentors added to program:</strong> 2
                  (Deedee Magno Hall, Tony Lucca)
                </li>
                <li>
                  <strong>Volunteers engaged across all programs:</strong> 35
                </li>
                <li>
                  <strong>
                    In-kind support received (Google Ad Grant + donated
                    services):
                  </strong>{" "}
                  $44,868
                </li>
                <li>
                  <strong>Outstanding obligations at year-end:</strong> $595
                  on a Shopify Capital merchant advance (a 62% reduction from
                  prior year; since fully retired)
                </li>
                <li>
                  <strong>Trees planted around the world (lifetime):</strong>{" "}
                  2,500+
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============ THE BOOK ============ */}
        <section id="book" className={styles.section}>
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              A Defining Year
            </div>
            <h2 className={styles.sectionTitle}>
              The <em>Book</em> Project.
            </h2>

            <div className={styles.bookCard}>
              <div className={styles.bookCardImage}>
                <Image
                  src="/images/3-e35fc5c.png"
                  alt="Cover of Always In The Club: The True Story of The All-New Mickey Mouse Club"
                  fill
                  sizes="(min-width: 720px) 260px, 320px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className={styles.lead}>
                  This year, we launched{" "}
                  <em>
                    Always In The Club: The True Story of The All-New Mickey
                    Mouse Club
                  </em>{" "}
                  — a three-volume history of one of the most influential
                  youth-focused programs in modern entertainment.
                </p>
              </div>
            </div>

            <p>
              Built on more than 60 interviews with cast members, crew, and
              executives, the series is the definitive account of the
              era — capturing the people, the moments, and the lasting
              cultural footprint of MMC. Substantially complete in design and
              manuscript by year-end, the book is both a cultural preservation
              effort and a sustainable revenue vehicle for our youth mentoring
              and arts education mission.
            </p>

            <h3 className={styles.subTitle}>
              Why this matters for our <em>mission.</em>
            </h3>
            <p>
              Every book sold powers our coaching, mentoring, and service
              programs. The book is also a vehicle for storytelling about
              mentorship itself — the alumni network at the heart of the MMC
              story is, in many ways, a living illustration of what we strive
              to build for the young creatives we serve today. Readers
              don&rsquo;t just learn the history; they meet the kind of
              intergenerational support system we work to extend to the next
              generation.
            </p>

            <h4 className={styles.minorTitle}>FY 2024 – FYE 2025 Milestones</h4>
            <ul className={styles.bullets}>
              <li>
                Manuscripts and designs for all three volumes (and both Trade
                and Limited Editions) substantially complete
              </li>
              <li>Limited Edition Pre-orders secured</li>
              <li>
                Limited Edition &ldquo;Master Digital Archive&rdquo; launched
                for collectors and dedicated patrons
              </li>
              <li>
                Active marketing through the newsletter, Facebook/Instagram,
                and the Google Ad Grant
              </li>
              <li>
                Outreach underway to potential partners for the Trade Edition
                launch anticipated in 2026/2027
              </li>
            </ul>
          </div>
        </section>

        {/* ============ MMC'89 ============ */}
        <section
          id="mmc89"
          className={`${styles.section} ${styles.paperWarm}`}
        >
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              MMC&rsquo;89
            </div>
            <h2 className={styles.sectionTitle}>
              Community <em>Impact</em> in Action.
            </h2>

            <p className={styles.lead}>
              Our MMC&rsquo;89 program continued to deliver mentorship,
              service, and support across the country.
            </p>
            <p>Three program initiatives operated under this umbrella in FY 2024:</p>

            <h3 className={styles.subTitle}>
              Coaching &amp; <em>Mentoring</em>
            </h3>
            <figure className={styles.sectionFigure}>
              <div className={styles.sectionPhoto}>
                <Image
                  src="/images/yaffa-3.JPG"
                  alt="CEO Chasen Hampton with spotlight student Yaffa Botier"
                  fill
                  sizes="(min-width: 720px) 720px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
              </div>
              <figcaption className={styles.sectionCaption}>
                CEO Chasen Hampton with spotlight student:{" "}
                <Link href="/blog/student-spotlight-yaffa-botier-shares-the-stage-with-yungblud">
                  Yaffa Botier
                </Link>{" "}
                (Rock Guitarist)
              </figcaption>
            </figure>
            <p>
              One-on-one guidance for young creatives seeking to grow in
              their craft. Our coaches are working entertainment
              professionals who understand the path because they have
              walked it themselves.
            </p>
            <p>
              In FY 2024, we launched new alumni-led mentee sessions with
              Mouseketeers <strong>Deedee Magno Hall</strong> and{" "}
              <strong>Tony Lucca</strong> — giving young creatives direct,
              recurring access to two artists whose own careers map the
              journey our students hope to make.
            </p>

            {/* Three lifestyle photos of the alumni mentors at work:
                Tony on stage, Deedee mentoring on stage, Deedee with
                mentee Jullianna. 3-up row on desktop, stacked on
                mobile. Photos use object-cover with portrait frames to
                fit performance shots without awkward letterboxing. */}
            {/* Each tile links out to the Mentorship & Coaching
                page on this site. The anchor IS the grid item so the
                whole tile is the click target. All three use
                object-cover in matched 3:4 portrait frames so the trio
                reads as a clean line of three. Order L→R on desktop:
                Deedee-stage · Deedee-Jullianna · Tony. */}
            <div className={styles.photoGrid3}>
              <Link
                href="/mentorship-coaching"
                className={styles.photoGridItemPortrait}
                aria-label="Mentorship & Coaching"
              >
                <Image
                  src="/images/deedee-mentor-stage.jpg"
                  alt="Deedee Magno Hall mentoring a young performer on stage"
                  fill
                  sizes="(min-width: 720px) 240px, 100vw"
                  className="object-cover"
                />
              </Link>
              <Link
                href="/mentorship-coaching"
                className={styles.photoGridItemPortrait}
                aria-label="Mentorship & Coaching"
              >
                <Image
                  src="/images/deedee-jullianna.jpg"
                  alt="Deedee Magno Hall with her mentee Jullianna"
                  fill
                  sizes="(min-width: 720px) 240px, 100vw"
                  className="object-cover"
                />
              </Link>
              <Link
                href="/mentorship-coaching"
                className={styles.photoGridItemPortrait}
                aria-label="Mentorship & Coaching"
              >
                <Image
                  src="/images/tony-stage.png"
                  alt="Tony Lucca performing on stage"
                  fill
                  sizes="(min-width: 720px) 240px, 100vw"
                  className="object-cover"
                />
              </Link>
            </div>

            {/* Student Spotlights — TEMPORARILY HIDDEN.
                Restore this block once Chasen provides the three
                student names, programs/locations, and brief quotes.
                The matching .spotlight / .spotlightName /
                .spotlightDetail / .placeholder CSS classes in
                page.module.css are intentionally left in place so
                this can be re-enabled without a CSS change.
            <h4 className={styles.minorTitle}>Student Spotlights</h4>
            <p>
              Three students whose growth this year reflects what the program
              is built to do:
            </p>

            <div className={styles.spotlight}>
              <div className={styles.spotlightName}>
                <span className={styles.placeholder}>[Student Name 1]</span>{" "}
                — <span className={styles.placeholder}>[Program / Location]</span>
              </div>
              <p className={`${styles.spotlightDetail} ${styles.placeholder}`}>
                [One brief sentence about their experience, growth, or a short
                quote.]
              </p>
            </div>
            <div className={styles.spotlight}>
              <div className={styles.spotlightName}>
                <span className={styles.placeholder}>[Student Name 2]</span>{" "}
                — <span className={styles.placeholder}>[Program / Location]</span>
              </div>
              <p className={`${styles.spotlightDetail} ${styles.placeholder}`}>
                [One brief sentence about their experience, growth, or a short
                quote.]
              </p>
            </div>
            <div className={styles.spotlight}>
              <div className={styles.spotlightName}>
                <span className={styles.placeholder}>[Student Name 3]</span>{" "}
                — <span className={styles.placeholder}>[Program / Location]</span>
              </div>
              <p className={`${styles.spotlightDetail} ${styles.placeholder}`}>
                [One brief sentence about their experience, growth, or a short
                quote.]
              </p>
            </div>
            */}

            <h3 className={styles.subTitle}>
              Day of <em>Service</em>
            </h3>
            <div className={styles.sectionPhoto}>
              <Image
                src="/images/whatever-baby-j.avif"
                alt="Cast of the Whatever Happened to Baby J live table read"
                fill
                sizes="(min-width: 720px) 720px, 100vw"
                className="object-cover"
              />
            </div>
            <p>
              We sponsored an evening supporting{" "}
              <a
                href="https://aidsresource.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AIDS Resource Foundation for Children
              </a>{" "}
              with a Live Table Read of{" "}
              <em>&ldquo;Whatever Happened to Baby J&rdquo;</em> — a new Y2K
              boyband-obsessed film written by award-winning screenwriter
              Victoria Male, and featuring actors Jodie Sweetin, Drew Seeley,
              and Dale Godboldo. The event raised{" "}
              <strong>$7,000 for AIDS research</strong>.
            </p>

            <h3 className={styles.subTitle}>
              Business <em>Management</em> Services
            </h3>
            <p>
              Through our DBA Create Impact Now, we provided operational
              guidance and resources to several companies, helping
              mission-driven leaders build sustainable infrastructure for
              their own work.
            </p>
          </div>
        </section>

        {/* ============ ENVIRONMENTAL ============ */}
        <section id="environmental" className={styles.section}>
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              Global Goals
            </div>
            <h2 className={styles.sectionTitle}>
              Reforesting the <em>world,</em> one purchase at a time.
            </h2>

            <p>
              Sustainability is built into the way we sell. For every piece of
              merchandise purchased through our online store, we fund a
              tree-planting initiative in partnership with reforestation
              platforms. The result: consumer activity becomes ecological
              restoration, and supporters help us advance the UN Sustainable
              Development Goals on responsible consumption, climate action,
              and protecting terrestrial ecosystems.
            </p>

            <p>
              This program connects directly to three of the 17 Sustainable
              Development Goals that guide our work:
            </p>
            {/* Official UN SDG icons (in public/images/sdg/) replace
                the old text bullets. Each row is one clickable item:
                the icon plus the goal's short target text, linking to
                that goal's page on sdgs.un.org. */}
            <ul className={styles.sdgRow} aria-label="Sustainable Development Goals">
              <li>
                <a
                  href="https://sdgs.un.org/goals/goal12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sdgItem}
                >
                  <Image
                    src="/images/sdg/sdg-12.jpg"
                    alt="UN Sustainable Development Goal 12 — Responsible Consumption and Production"
                    width={240}
                    height={240}
                  />
                  <span className={styles.sdgItemText}>
                    Ensure sustainable consumption and production patterns
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://sdgs.un.org/goals/goal13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sdgItem}
                >
                  <Image
                    src="/images/sdg/sdg-13.jpg"
                    alt="UN Sustainable Development Goal 13 — Climate Action"
                    width={240}
                    height={240}
                  />
                  <span className={styles.sdgItemText}>
                    Take urgent action to combat climate change and its impacts
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://sdgs.un.org/goals/goal15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sdgItem}
                >
                  <Image
                    src="/images/sdg/sdg-15.jpg"
                    alt="UN Sustainable Development Goal 15 — Life on Land"
                    width={240}
                    height={240}
                  />
                  <span className={styles.sdgItemText}>
                    Protect, restore, and promote sustainable use of terrestrial
                    ecosystems
                  </span>
                </a>
              </li>
            </ul>

            <p>
              To help our reforestation efforts and support our youth
              mentoring programs, we launched our <em>Mickey &amp; Friends</em>{" "}
              collection of licensed T-shirts by Disney.
            </p>

            {/* Asymmetric collage of the Mickey & Friends collection.
                Top row: product flat-lay (with padded matting) +
                family lifestyle shot (full-bleed). Bottom row: two
                portraits in matched 3:4 frames. Each tile uses an
                aspect ratio that fits its image so nothing letterboxes
                awkwardly. Stacks to a single column on phones. */}
            <div className={styles.collage}>
              <div className={`${styles.collageTile} ${styles.collageTileShop}`}>
                <Image
                  src="/images/shop-bundle-2.png"
                  alt="Mickey & Friends Collection product bundle"
                  fill
                  sizes="(min-width: 720px) 380px, 100vw"
                  className="object-contain"
                />
              </div>
              <div className={`${styles.collageTile} ${styles.collageTileFamily}`}>
                <Image
                  src="/images/mickey-merch-family.JPG"
                  alt="A family wearing the Mickey & Friends Collection together"
                  fill
                  sizes="(min-width: 720px) 380px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className={`${styles.collageTile} ${styles.collageTilePortrait}`}>
                <Image
                  src="/images/tony-mickey.png"
                  alt="Tony Lucca wearing a Mickey & Friends Collection tee"
                  fill
                  sizes="(min-width: 720px) 380px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className={`${styles.collageTile} ${styles.collageTilePortrait}`}>
                <Image
                  src="/images/jenn-mickey.jpg"
                  alt="Jennifer Kramer wearing a Mickey & Friends Collection tee"
                  fill
                  sizes="(min-width: 720px) 380px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============ TRANSITIONS ============ */}
        <section
          id="transitions"
          className={`${styles.section} ${styles.paperWarm}`}
        >
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              Strategy
            </div>
            <h2 className={styles.sectionTitle}>
              A year of <em>strategic</em> transitions.
            </h2>

            <p className={styles.lead}>
              The pause is not a retreat — it is a <em>setup.</em>
            </p>

            <p>
              To position the organization for the next phase of growth, we
              made the deliberate decision to temporarily pause{" "}
              <em>Destination: Disney Imagination Campus</em> during FY 2024.
              We are using this period to broaden our partnerships, deepen
              our infrastructure, and increase the capacity needed to serve
              more young people. We anticipate resuming the program in FY
              2026 or FY 2027 with substantially expanded reach.
            </p>

            <p>
              This kind of disciplined, intentional pause is what allows a
              young organization to grow into the next chapter on solid
              footing rather than overextending.
            </p>
          </div>
        </section>

        {/* ============ FINANCIALS ============ */}
        <section id="financials" className={styles.section}>
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              Financial Overview
            </div>
            <h2 className={styles.sectionTitle}>
              Where the money <em>came from</em> and where it <em>went.</em>
            </h2>

            <h3 className={styles.subTitle}>Revenue</h3>
            <table className={styles.finTable}>
              <tbody>
                <tr>
                  <td>Contributions and grants — cash</td>
                  <td className="num">$30,438</td>
                </tr>
                <tr className="alt">
                  <td>Contributions and grants — noncash (in-kind)</td>
                  <td className="num">$44,868</td>
                </tr>
                <tr>
                  <td>Book sales (Always In The Club series)</td>
                  <td className="num">$45,386</td>
                </tr>
                <tr className="alt">
                  <td>MMC&rsquo;89 program service revenue</td>
                  <td className="num">$12,210</td>
                </tr>
                <tr>
                  <td>Environmental program revenue</td>
                  <td className="num">$5,314</td>
                </tr>
                <tr className="alt">
                  <td>Other revenue</td>
                  <td className="num">$181</td>
                </tr>
                <tr className="total">
                  <td>Total revenue</td>
                  <td className="num">$138,397</td>
                </tr>
              </tbody>
            </table>
            <p className={styles.tableNote}>
              In-kind contributions reflect our Google Ad Grant ($23,200 in
              donated advertising) and the donated time and expertise of our
              volunteer leadership team ($21,668).
            </p>

            <h3 className={styles.subTitle}>
              How <em>every dollar</em> is spent.
            </h3>
            <table className={styles.finTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th className="num">Amount</th>
                  <th className="num">Share</th>
                </tr>
              </thead>
              <tbody>
                <tr className="alt">
                  <td>Program services</td>
                  <td className="num">$114,112</td>
                  <td className="num">87%</td>
                </tr>
                <tr>
                  <td>Management &amp; general</td>
                  <td className="num">$14,304</td>
                  <td className="num">11%</td>
                </tr>
                <tr className="alt">
                  <td>Fundraising</td>
                  <td className="num">$2,074</td>
                  <td className="num">2%</td>
                </tr>
                <tr className="total">
                  <td>Total expenses</td>
                  <td className="num">$130,490</td>
                  <td className="num">100%</td>
                </tr>
              </tbody>
            </table>
            <p className={styles.tableNote}>
              Eighty-seven cents of every dollar spent went directly to
              programs — well above sector benchmarks for organizations at
              our scale.
            </p>

            <h3 className={styles.subTitle}>
              Net <em>Result</em>
            </h3>
            <table className={styles.finTable}>
              <tbody>
                <tr>
                  <td>Revenue less expenses</td>
                  <td className="num">+$7,907</td>
                </tr>
                <tr className="alt">
                  <td>Beginning net assets</td>
                  <td className="num">$7,197</td>
                </tr>
                <tr>
                  <td>Ending net assets</td>
                  <td className="num">$15,104</td>
                </tr>
                <tr className="total">
                  <td>Net asset growth</td>
                  <td className="num">+110%</td>
                </tr>
              </tbody>
            </table>
            <p>
              The Foundation closed FY 2024 with a small remaining balance
              of $595 on a Shopify Capital merchant advance — a 62%
              reduction from the prior year — and has since fully retired
              that obligation. Even with that obligation, Always In The Club
              Foundation entered FY 2025 with a stronger financial
              foundation than at any point since incorporation.
            </p>
          </div>
        </section>

        {/* ============ TRANSPARENCY ============ */}
        <section
          id="transparency"
          className={`${styles.section} ${styles.paperWarm}`}
        >
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              Recognition &amp; Transparency
            </div>
            <h2 className={styles.sectionTitle}>
              Platinum status with <em>Candid.</em>
            </h2>

            <p>
              Always In The Club Foundation holds Platinum status with Candid
              (GuideStar) — the highest recognition for nonprofit transparency
              and accountability. This designation confirms our commitment to
              responsible stewardship of every donor dollar.
            </p>

            <p>
              We maintain written conflict of interest, whistleblower, and
              document retention policies. Annual board compensation reviews
              are conducted by independent directors, and all related-party
              transactions are documented and reported in full on our annual
              IRS Form 990.
            </p>

            <p>
              Governing documents, financial statements, and our most recent
              Form 990 are available on our website and through
              GuideStar/Candid, and may be requested in writing at any time.
            </p>

            {/* Candid (GuideStar) transparency seal widget — SVG is
                served live from widgets.guidestar.org so we use a
                plain <img> rather than next/image (which would need
                widgets.guidestar.org allowlisted in remotePatterns).
                Same widget that's embedded in the site footer. */}
            <a
              aria-label="Always In The Club Foundation profile on Candid (GuideStar)"
              href="https://app.candid.org/profile/10968737/always-in-the-club-foundation-85-4015614/?pkId=81b26a3d-5c81-4893-a0b1-ba0087a03c14"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.candidSeal}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Candid transparency seal for Always In The Club Foundation"
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/10968737/svg"
              />
            </a>
          </div>
        </section>

        {/* ============ GOVERNANCE ============ */}
        <section id="governance" className={styles.section}>
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.left}`}>
              Leadership
            </div>
            <h2 className={styles.sectionTitle}>
              Board of <em>Directors</em>{" "}&amp; Advisors.
            </h2>

            <h4 className={styles.minorTitle}>Board of Directors</h4>
            <ul className={styles.bullets}>
              <li>
                <strong>Chasen Hampton</strong> — Chief Executive Officer
              </li>
              <li>
                <strong>Axel Tillmann</strong> — Secretary
              </li>
              <li>
                <strong>Jonathan Smith</strong> — Treasurer
              </li>
              <li>Patricia Chung Adams — Board Director</li>
              <li>Gloria Ayee — Board Director</li>
              <li>Bret Iwan — Board Director</li>
              <li>Jennifer Kramer — Board Director</li>
              <li>Anthony Lucca — Board Director</li>
              <li>Jennifer McGill — Board Director</li>
            </ul>

            <h4 className={styles.minorTitle}>Advisors</h4>
            <ul className={styles.bullets}>
              <li>Tasha Danner</li>
              <li>Rachel Carlsen</li>
            </ul>

            <p style={{ marginTop: 24 }}>
              Six of nine directors are independent. The board reviews CEO
              compensation annually through an independent committee process
              and maintains a written conflict of interest policy with annual
              disclosure requirements for all directors and officers.
            </p>
          </div>
        </section>

        {/* ============ LOOKING AHEAD ============ */}
        <section
          id="ahead"
          className={`${styles.section} ${styles.paperWarm}`}
        >
          <div className={styles.container}>
            <div className={`${styles.sectionLabel} ${styles.center}`}>
              Looking Ahead
            </div>
            <h2 className={`${styles.sectionTitle} ${styles.center}`}>
              FY 2025 is where we <em>build upward.</em>
            </h2>

            <div className={styles.numberedGrid}>
              <div className={styles.numberedItem}>
                <div className="num">
                  <small>Nº 01</small>Publishing
                </div>
                <div className="body">
                  <h3>Cultural impact at scale.</h3>
                  <ul className={styles.bullets}>
                    <li>
                      Active outreach to major marketing and press partners on{" "}
                      <em>Always In The Club</em>
                    </li>
                    <li>
                      Expanded book marketing through the newsletter, social
                      media, and the Google Ad Grant
                    </li>
                    <li>
                      Continued Master Digital Archive campaign for collectors
                      and dedicated supporters
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.numberedItem}>
                <div className="num">
                  <small>Nº 02</small>Partnerships
                </div>
                <div className="body">
                  <h3>New relationships in development.</h3>
                  <ul className={styles.bullets}>
                    <li>
                      Deepening our partnership with That&rsquo;s 4
                      Entertainment and 90s Con
                    </li>
                    <li>
                      New partnership in development with the California
                      ScholarShare Investment Board / CalKIDS, focused on
                      expanding access for underprivileged children —
                      including foster youth, homeless students, and English
                      learners
                    </li>
                    <li>Team building with established organizations in Tennessee</li>
                  </ul>
                </div>
              </div>
              <div className={styles.numberedItem}>
                <div className="num">
                  <small>Nº 03</small>Programs
                </div>
                <div className="body">
                  <h3>Returning and expanding.</h3>
                  <ul className={styles.bullets}>
                    <li>
                      Targeting FY 2026 or FY 2027 relaunch of{" "}
                      <em>Destination: Disney Imagination Campus</em> with
                      broader partnership infrastructure
                    </li>
                    <li>
                      Continued growth of MMC&rsquo;89 mentoring and service
                      initiatives
                    </li>
                    <li>
                      Environmental program expansion through merchandise
                      growth
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.numberedItem}>
                <div className="num">
                  <small>Nº 04</small>Events
                </div>
                <div className="body">
                  <h3>Signature gatherings on the horizon.</h3>
                  <ul className={styles.bullets}>
                    <li>
                      Planning underway for a book launch and MMC cast
                      reunion event
                    </li>
                    <li>
                      Planning underway for a mentorship program expansion
                      event
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ACKNOWLEDGMENTS ============ */}
        <section id="thanks" className={styles.section}>
          <div className={styles.reading}>
            <div className={`${styles.sectionLabel} ${styles.center}`}>
              Acknowledgments
            </div>
            <h2 className={`${styles.sectionTitle} ${styles.center}`}>
              <em>Thank you.</em>
            </h2>

            <p className={styles.lead}>
              To every donor, volunteer, Mouseketeer alumnus, board member,
              advisor, and community supporter who made this year possible.
            </p>

            <p>
              Your generosity fuels the mentoring, education, and creative
              opportunities that change young lives.
            </p>

            <p>
              To the alumni and friends of{" "}
              <em>The All-New Mickey Mouse Club</em> who sat for interviews,
              opened their stories, and trusted us to tell the history right —
              thank you.
            </p>

            <div
              className={styles.sectionPhoto}
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image
                src="/images/mmc89_mmc30.png"
                alt="Mouseketeers reunited on stage at the MMC30 reunion"
                fill
                sizes="(min-width: 720px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ============ CLOSING PULL QUOTE ============ */}
        <div className={styles.pullQuote}>
          Together, we are <em>always</em> in the club.
          <span className={styles.attrib}>
            — The AITC Foundation Family
          </span>
        </div>
      </article>
    </div>
  );
}
