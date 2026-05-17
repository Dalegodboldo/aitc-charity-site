# Build Brief — Always In The Club Foundation Website

**Project folder:** `~/Documents/aitc-charity-site` (already created, empty)
**Production domain:** alwaysintheclub.org
**Replaces:** the current GoDaddy Website Builder site at www.alwaysintheclub.org

---

## 0. How to use this brief (read first, Claude Code)

This is the full specification for rebuilding the Always In The Club Foundation
website. Work through it in the **phase order** in Section 8.

Important working rules:

- The site owner is a **non-developer**. Run every terminal/git/npm command
  yourself. Never ask them to open a terminal. Explain what you're doing in
  plain language.
- After each phase, **stop, summarize what you did, and let the owner look
  before continuing.**
- Commit to git frequently with clear messages.
- If any content, image, or fact is missing or unclear, **ask the owner** —
  do not invent copy, statistics, names, or quotes.
- Keep the provided copy (Section 9) almost verbatim. Typos have already been
  corrected in this brief — use the versions here.

---

## 1. Project overview

Always In The Club Foundation is a 501(c)(3) nonprofit (EIN #85-4015614)
focused on youth mentorship and arts education, inspired by Disney's 1989–1996
"All New" Mickey Mouse Club. Reunited cast members ("Mouseketeers") run its
programs.

This is a **content/marketing website** — no database, no user accounts, no
checkout. Donations, store, newsletter, and event bookings all live on
**external services** and are simply linked to.

The current site is one enormous single-page scroll built in GoDaddy. We are
rebuilding it as a clean, multi-page Next.js site and moving hosting to Vercel.

---

## 2. Tech stack

- **Framework:** Next.js (App Router) — accept the `create-next-app` defaults
  (TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, `@/*` alias).
- **Styling:** Tailwind CSS (whatever version `create-next-app` installs).
- **Components:** shadcn/ui as the base component library, plus **21st.dev**
  components where they add value (see Section 5).
- **Fonts:** `next/font/google` — Fraunces + Inter.
- **Content/blog:** local Markdown/MDX files (see Section 9, Blog).
- **Deploy target:** Vercel, via a connected GitHub repo. The owner is handling
  the GitHub + Vercel accounts separately; you just need to produce a clean
  repo and push it when Phase 7 is reached.
- **Scaffold command:** run `create-next-app` **inside** the existing empty
  `aitc-charity-site` folder (e.g. `npx create-next-app@latest .`).
- Before scaffolding, confirm Node.js and npm are available on the machine.
  If anything is missing, walk the owner through installing it in plain steps.

---

## 3. Design system — Direction 01: "Heartfelt & Editorial"

Calm, credible, photography-first. It should read like a foundation people
trust with millions of dollars — warm, but grown-up. Generous white space,
strong type hierarchy, red used as a confident accent rather than a flood.

### Color tokens

Define these as theme tokens (CSS variables + Tailwind theme):

| Token            | Hex       | Use |
|------------------|-----------|-----|
| `red` (primary)  | `#AB0707` | Brand red — primary CTAs, links, key accents |
| `red-deep`       | `#8A0606` | Hover/active state for red |
| `gold`           | `#C8922A` | Secondary accent — eyebrows, dividers, small flourishes |
| `cream`          | `#F7F2E8` | Primary page background |
| `warm-white`     | `#FBF7EF` | Card backgrounds, alternating section backgrounds |
| `ink`            | `#20140F` | Primary text, headings |
| `warm-gray`      | `#6F6253` | Secondary / body / muted text |
| `border`         | `#E4DAC6` | Hairlines, soft card borders |

Keep the existing brand red `#AB0707` (it's also the site's theme-color).

### Typography

- **Display / headings:** Fraunces (serif, variable, optical sizing on).
  Weights 400/500/600. Italic allowed for emphasizing one word in a heading.
- **Body / UI:** Inter. Weights 400/500/600/700.
- Body text ~16–18px, line-height ~1.6, color `ink` or `warm-gray`.
- Headings: Fraunces, tighter leading, clear size jumps between levels.

### Look & feel

- Rounded corners: cards/sections `rounded-2xl` (~16px); primary buttons may
  be pill-shaped (`rounded-full`).
- Shadows: soft, warm-tinted, diffuse — e.g. `0 18px 44px rgba(35,25,19,0.12)`.
  Avoid hard/black shadows.
- Section padding: generous (e.g. `py-20`+ on desktop).
- Photos: rounded corners, optional subtle warm overlay; let images breathe.
- Motion: subtle, tasteful — a gentle staggered fade-up as sections enter the
  viewport. Respect `prefers-reduced-motion`. No bouncing or flashy effects.
- Red is an accent. Don't fill large areas with it. Use cream/warm-white as the
  canvas, ink for text, gold for small details.

---

## 4. Information architecture

### Pages

| Route            | Page     | Notes |
|------------------|----------|-------|
| `/`              | Home     | Tightened — see Section 9 |
| `/programs`      | Programs | |
| `/impact`        | Impact   | |
| `/about`         | About    | **New** — consolidates the MMC history + Foundation origin currently buried on the homepage |
| `/team`          | Team     | Board, staff, and contact form |
| `/blog`          | Blog index | Lists Markdown posts |
| `/blog/[slug]`   | Blog post | |

### Header / navigation

- Logo (wordmark or logo image) links to `/`.
- Nav links: **Programs · Impact · About · Team · Blog**
- A prominent **Donate** button (red), always visible, links to the Zeffy form.
- A small secondary link: **Visit Main Site** → `https://www.mickeymouseclubreunion.com/`
- Mobile: hamburger menu.
- Drop entirely: the old GoDaddy "Sign In / My Account / filler@godaddy.com"
  account UI and the `cruise-pop-up-shop` cart link — these are not part of the
  new site.

### Footer

A single rich footer on every page:

- Short wordmark / tagline ("Using our E.A.R.S. to make a difference").
- Site nav: Programs, Impact, About, Team, Blog.
- External links group: Events, Store, Book the 'Teers, Newsletter, Annual
  Report, Main Website (URLs in Section 6).
- Contact block:
  - Orlando: 100 East Pine Street, Suite 110, Orlando, FL 32801
  - Los Angeles Offices: 1801 Century Park East, 24th & 25th Floors, Los Angeles, CA 90067
  - Mailing Address: 5042 Wilshire Blvd, #38285, Los Angeles, CA 90036
  - Phone: 407.804.8737 / 925.350.6448
  - Email: Info@AlwaysInTheClub.org
- Social icons: Facebook, Instagram, LinkedIn, X, YouTube (URLs in Section 6).
- 501(c)(3) line: "Always In The Club Foundation is an exempt organization as
  described under Section 501(c)(3) of the Internal Revenue Code, EIN #85-4015614."
- Copyright line with the **current year generated dynamically** (not hard-coded 2024).

> **Note for the owner to confirm:** the current site lists slightly different
> LA phone numbers and a couple of address variations across pages. Flag this
> and use the footer values above as canonical unless told otherwise.

---

## 5. Component guidance — shadcn/ui + 21st.dev

Use shadcn/ui for primitives (button, card, accordion, dialog, navigation
menu, input, etc.). Use **21st.dev** components where they elevate the design.

Good 21st.dev candidates for this site:

- **Hero** section (Home) — an editorial hero with image + headline.
- **Animated stat counters** — the "Impact at a glance" band on Home.
- **Marquee / logo strip** — the Partners section on Programs.
- **Testimonial** section — the quotes on Programs.
- **Bento or feature grid** — campaign cards, program cards, ways-to-help cards.
- **Card hover effects** — campaign and team cards.

Install 21st.dev components using the shadcn CLI registry method (the standard
`npx shadcn@latest add <component-url>` flow). Check 21st.dev for the current
install command for each component.

**Critical:** whatever components you pull in, restyle them to the Section 3
design tokens. A component's stock look (default fonts, default colors,
purple/indigo accents) must not override the Heartfelt & Editorial system.
Everything must feel like one cohesive site.

---

## 6. Images & media

### Harvesting existing images

The current site is image-heavy and the owner wants those images kept. The
GoDaddy builder **lazy-loads** images, so they won't all appear in a plain
page fetch.

Recommended approach, in order:

1. Fetch the raw HTML of each live page (`/`, `/programs`, `/impact`, `/team`,
   `/blog`) and search for image URLs on the `img1.wsimg.com` domain —
   GoDaddy often stores the real URL in `data-src` / `data-*` attributes.
2. If the real URLs aren't in the static HTML, use a headless browser
   (Playwright — install as a dev dependency) to render each page and collect
   all `<img>` sources and CSS background images from `img1.wsimg.com`.
3. Download everything into `public/images/` with sensible filenames, and
   write a short manifest (which image came from which page/section) so the
   owner can help match images to content.
4. For any image you can't recover automatically, list it for the owner so
   they can save it manually from the live site.

Two image URLs are already confirmed working:
- `https://img1.wsimg.com/isteam/ip/3f1a98d9-d451-4c0b-99db-7c78056a24a7/mmc89_mmc30.png`
- `https://img1.wsimg.com/isteam/ip/3f1a98d9-d451-4c0b-99db-7c78056a24a7/Book.png`

Use `next/image` for all images, with meaningful `alt` text. Prefer downloaded
local images in `public/`. If hotlinking GoDaddy URLs is used as a temporary
measure, add `img1.wsimg.com` (and `i.vimeocdn.com`) to `next.config`
`images.remotePatterns` — but downloading is the goal so nothing breaks if the
GoDaddy account is later closed.

### Video

- Homepage hero background video (Vimeo): ID **`1013461750`**.
- YouTube videos referenced across the site (embed where relevant):
  `L_mQZ-y_tFI`, `Cm3cnYSAV-w`, `jkBOrv-0asQ`, `AC9TizI4_Zw`, `-dMFTivVzFs`,
  `RpqVmvMCmp0`, `PUvTgVTm5iE`, `lOCFpsWaSrs`.
- For the Heartfelt & Editorial direction, prefer a calm photographic hero with
  the headline overlaid. The Vimeo video may be used as a subtle muted
  autoplay loop if it performs well, or featured behind a "Watch our story"
  play button — editorial restraint over a busy moving background.

### External links to preserve

- Donate (Zeffy): `https://www.zeffy.com/en-US/donation-form/12a9b4c5-4c0e-47b7-a70f-e2af2bb4d5e6`
- Newsletter (Sender): `https://stats.sender.net/forms/dwWNMd/view`
- Store (Shopify): `https://mmcreunion.com`
- Events: `https://www.mickeymouseclubreunion.com/events`
- Book the 'Teers: `https://www.mickeymouseclubreunion.com/bookings`
- The MMC Book: `https://www.mickeymouseclubreunion.com/books`
- Main website: `https://www.mickeymouseclubreunion.com/`
- Annual Report: `https://aitc-annual-report-2024.my.canva.site/aitcf-2024-digital-annual-report`
- Linktree: `https://linktr.ee/alwaysintheclub`
- Socials: Facebook `https://www.facebook.com/766633633355366`,
  Instagram `https://www.instagram.com/aitcfoundation/`,
  LinkedIn `https://www.linkedin.com/company/alwaysintheclubfoundation/`,
  X `https://www.x.com/AITCFoundation`,
  YouTube `https://www.youtube.com/c/AlwaysInTheClub`

---

## 7. Forms

- **Contact form** (Team page): build the UI (Name, Email, Message, Send).
  Submit to **Formspree** (free tier). Read the Formspree form ID from an env
  var `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local`. The owner will create the
  Formspree form and provide the ID — until then, build the form and leave a
  clear `TODO` note. No reCAPTCHA needed (Formspree handles spam).
- **Newsletter:** link or button to the Sender form URL above. Embedding the
  Sender form is fine if clean; a styled link/button is acceptable and simpler.
- **Donate:** every Donate button links to the Zeffy URL above.

---

## 8. Build order (phases)

**Phase 0 — Scaffold.** `create-next-app` into the existing folder. Set up the
Section 3 design tokens, Fraunces + Inter via `next/font`, base globals, and
shadcn/ui. Confirm `npm run dev` works.

**Phase 1 — Harvest images & media** from the live site into `public/images/`
(Section 6). Produce the manifest.

**Phase 2 — Shared layout.** Header/nav and footer (Section 4), reused on
every page. Responsive, with mobile menu.

**Phase 3 — Home page** (Section 9).

**Phase 4 — Programs, Impact, About, Team pages** (Section 9).

**Phase 5 — Blog.** Markdown/MDX blog system: `/blog` index + `/blog/[slug]`,
frontmatter (title, date, excerpt, coverImage, author). Create one example
"Welcome" post so the page isn't empty and the owner can see the pattern.

**Phase 6 — Forms, polish, SEO, QA.** Contact form + newsletter; SEO/meta
(Section 10); responsive checks on mobile/tablet/desktop; accessibility pass;
Lighthouse check.

**Phase 7 — Ship.** Initialize git (if not already), commit, and push to the
GitHub repo the owner created. The owner connects that repo to Vercel
themselves — see their separate setup checklist.

---

## 9. Page-by-page specification + copy

Keep this copy almost verbatim. It has been lightly cleaned (typos fixed). If
something reads as incomplete, ask the owner rather than guessing.

### HOME (`/`) — tightened single page

The current homepage crams ~13 campaign cards plus history sections into one
endless scroll. The new homepage is focused; depth moves to other pages.

**Section 1 — Hero**
- Eyebrow: "Always In The Club Foundation"
- Headline: "Education, Arts, Resources… Social Impact"
- Subhead: "Using our E.A.R.S. to make a difference"
- Buttons: **Donate** (Zeffy), **Get the MMC Book** (book URL)
- Visual: strong photo (or subtle Vimeo loop, see Section 6).

**Section 2 — Who We Are**
- Heading: "Who We Are"
- Subheading: "Inspired by the 'All New' Mickey Mouse Club"
- Body: "The 'All New' Mickey Mouse Club premiered in 1989 on the Disney
  Channel. Much more than a variety show, it tackled important social issues of
  the day. And as a performing arts academy, it trained some of the biggest
  stars in the world, including Keri Russell, Ryan Gosling, Justin Timberlake,
  Christina Aguilera, Britney Spears, Hallmark Channel's Nikki DeLoach, NSYNC's
  JC Chasez, and En Vogue's Rhona Bennett, among many others."
- Pull line: "Once in the Club… **#AlwaysInTheClub**" (link to Linktree)
- Body: "Reunited Mouseketeers and more than 10,000 long-time fans helped
  launch Always In The Club Foundation and our MMC'89 Initiative to support
  those who need it most through projects, programs and outreach campaigns led
  by cast members of the now iconic show."

**Section 3 — Impact at a glance** (stat band, animated counters)
- "$4.5M+ raised for charitable causes"
- "10,000+ Cast Members served"
- "2,000+ youth delegates reached worldwide"
- "1,400+ trees planted"
- Link: "See our impact" → `/impact`

**Section 4 — Our Mission** (two pillars)
- Heading: "Our Mission"
- Subheading: "Mentoring & Youth Arts Education"
- Pillar 1 — "Mentorship & Youth Arts Education": "We provide mentoring,
  workshops, coaching sessions and Experiential Learning opportunities with
  professional creatives and innovative companies across a wide range of
  industries. Our coaches' students have gone on to sign with Disney, Epitaph
  Records, Capitol, Sony Red, Universal Music Group, and been seen all over the
  world in festivals and on stages such as Coachella, Lollapalooza, GMA, Jimmy
  Kimmel, iHeart Music Awards, and many more."
- Pillar 2 — "MMC'89 Social Impact Initiative": "Through our programs and
  campaigns, we address global challenges related to education, hunger, mental
  health, poverty, inequality and climate change. We also provide marketing and
  business management services to nonprofit organizations and socially
  conscious entrepreneurs who want to create impact — guided by all 17 of the
  United Nations Global Goals for a better world by 2030."
- Button: "Our Programs & Initiatives" → `/programs`

**Section 5 — Featured Campaigns** (a curated selection, ~6 cards — NOT all 13)
Use these six; note at the bottom "See all of our work" → `/impact`:
1. *The True Story of the "All New" Mickey Mouse Club* — "Step into the world
   of the 'All New' Mickey Mouse Club with this stunning collector's book — a
   one-of-a-kind tribute to the show that defined a generation. Available as
   eBook/PDF, Hardcover, Paperback, and Coffee Table edition." → book URL
2. Destination: Disney Imagination Campus — "Mouseketeers are on a mission to
   host 1,000 students on once-in-a-lifetime Experiential Learning trips behind
   the scenes at Disney Parks with Imagineers, professional performers, and
   company leaders." → `https://www.mickeymouseclubreunion.com/post/destination-disney-imagination-campus-walt-disney-world`
3. #MMC35 @ 90s Con Daytona — "When twelve Mouseketeers reunited to celebrate
   the 35th anniversary of 'The All New' Mickey Mouse Club at 90s Con Daytona
   Beach, they launched our #MMC35 campaign and transformed nostalgia into
   impact — generating over $62,000 in contributions." → `https://www.mickeymouseclubreunion.com/post/mmc35-90s-con-daytona-beach`
4. Whatever Happened to Baby J — "We were honored to sponsor an evening
   supporting the AIDS Resource Foundation for Children with a live table read
   of 'Whatever Happened to Baby J,' featuring Jodie Sweetin, Drew Seeley, and
   a cast of fan favorites." → `https://www.mickeymouseclubreunion.com/post/whatever-happened-to-baby-j`
5. Day of Hope / Evening of Impact — "After our Day of Hope pampered and
   empowered survivors of domestic abuse, En Vogue's Rhona Bennett joined the
   women for an Evening of Impact." → `https://www.mickeymouseclubreunion.com/post/en-vogue-s-rhona-bennett-hosts-changemakers-networking-night`
6. #LAStrong Relief Fund — "As Los Angeles faced one of its most devastating
   wildfire seasons in history, the MMC'89 #LAStrong Relief Fund mobilized to
   provide immediate assistance to those affected." → `https://www.mickeymouseclubreunion.com/post/doing-what-we-can-the-mmc-89-fire-relief-fund`

**Section 6 — Ways to Help** (4 cards)
1. "Make a Donation" — "Your contribution helps the Mouseketeers continue our
   work to promote youth arts education." → Zeffy
2. "Become a Club Member" — "By joining the Club, you become an official member
   of our family — with exclusive opportunities to reunite with your favorite
   'Teers, exclusive media, and discounted merch and event tickets." →
   `https://www.mickeymouseclubreunion.com/club-membership`
3. "Shop Always In The Club" — "Shop exclusive and officially licensed items.
   Profits support our mission to empower young people through mentoring and
   arts education." → `https://mmcreunion.com`
4. "Book Mouseketeers or Sponsor an Event" — "The Mouseketeers support a wide
   range of causes through year-round events." → Book the 'Teers URL

**Section 7 — Plant a tree / Global Goals** (short)
- Heading: "Join Us to Reforest the World"
- Body: "When you make a purchase or donate in our Club Store, we plant a tree
  in your name to help offset global carbon emissions. Thanks to the generosity
  of our supporters, we have proudly planted more than 1,400 trees around the
  world." Link: "Visit Our Forest" → `https://tree-nation.com/profile/impact/always-in-the-club-foundation#co2`

**Section 8 — Newsletter**
- Heading: "Stay in the Club"
- Body: "Subscribe for inspiring stories, creative insights, and the latest
  updates on our initiatives." → Sender form.

---

### PROGRAMS (`/programs`)

**Intro**
- Heading: "Our Programs & Initiatives"
- Subheading: "Using our E.A.R.S. to make a difference — Education, Arts,
  Resources… Social Impact"
- Body: "Our MMC'89 Initiative uses the United Nations' Global Goals as a
  framework for identifying and supporting a wide range of causes — including
  those related to education, inequality and climate change. Although our
  primary focus is Mentoring & Youth Arts Education, our team has raised more
  than $50 million to support all 17 of the Goals."

**Section — Mentoring & Youth Arts Education**
- "More than a variety show, the 'All New' Mickey Mouse Club was a world-class
  performing arts academy."
- Quote: *"MMC was the most informative experience I've ever had as an
  entertainer."* — Justin Timberlake (Mouseketeer)
- "Inspired by the support they received from Disney, Mouseketeers are lending
  their unique insights to enhance the lives of young people through mentoring
  and arts education — essential for social and emotional well-being, and
  critical tools for establishing equity and access."
- *What We Aim To Solve:* "Adolescence is a critical period of development
  characterized by numerous challenges and transitions. Arts education can
  serve as a powerful preventive tool to mitigate potential negative mental
  health outcomes among adolescents. Traditional educational institutions
  prioritize preparing young people to obtain a diploma that leads to
  employment — but the era when a diploma guaranteed a stable 9-to-5 job has
  passed. Today's young people confront unique professional and emotional
  hurdles stemming, in part, from the pervasive influence of social media and
  the rise of the gig economy."
- *Our Solutions:* "To thrive in a modern, dynamic landscape, young people
  today require a well-rounded education with mentoring that includes training
  in the arts, entrepreneurship, and life skills, as well as guidance in
  innovation, leadership and managing mental health. Spearheaded by reunited
  Mouseketeers and others, we are working to fill the gaps left by traditional
  learning institutions with youth arts education and mentoring programs that
  include real-world learning opportunities."

**Section — Programs** (3 cards)
1. "Mentoring" — "We match young adults and children pursuing a career in the
   entertainment industry with a Mouseketeer Mentor or other accomplished
   veteran of the arts, based on common interests, career goals, experiences,
   and life challenges. Our mentorship service provides a safe space for both
   virtual and in-person meet-ups, and includes collaboration with parents for
   children under 18." → `https://www.mickeymouseclubreunion.com/mentorship-coaching#mentor`
2. "Experiential Learning" — "There's no education like real-world experience.
   Mouseketeers are leading experiential learning trips to Broadway and to
   Disney Imagination Campus for young people interested in performing arts,
   arts and humanities, science and technology, leadership, and innovation." →
   `https://createimpactnow.funnels.cx/experiential-learning-adventures`
3. "Workshops & Coaching" — "Mouseketeers are sharing their knowledge through
   workshops and one-on-one coaching sessions for personal growth and advancing
   students' careers — training young creatives on their craft while providing
   guidance on emotional well-being and the business of entertainment." →
   `https://www.mickeymouseclubreunion.com/mentorship-coaching#coaches`

**Section — MMC'89 Social Impact Initiative**
- "MMC'89 promotes the United Nations' Sustainable Development Goals (Global
  Goals) that address the global challenges we face. We support socially
  conscious efforts across a wide range of causes including climate action,
  feeding the hungry, critically ill children, victims of domestic abuse, music
  people in need, socially conscious entrepreneurship, quality education, job
  creation, veterans issues, and mental health."
- "Through events and awareness campaigns, we have helped raise more than $4.5
  million. MMC'89 is currently comprised of 12 programs and campaigns
  addressing all 17 of the UN's Global Goals for a better world by 2030."

**Section — MMC'89 Programs & Campaigns** (grid of cards)
- Business Launch & Growth Solutions — "We transform visions into impact,
  providing comprehensive for-profit and nonprofit launch and growth solutions."
  (Global Goals 8, 9, 10 & 17)
- Community Support & Resources — "A range of emergency services for cast
  members in need. Originally formed as Cast Member Pantry at the height of the
  COVID-19 pandemic, we have served more than 10,000 cast members with groceries
  and other food essentials." (Global Goals 2 & 17)
- Use Your Bottle, Change Our World — "With support from the United Nations
  Development Program, we launched a campaign promoting a solution-based
  approach to reducing single-use plastic." (Global Goals 6, 12 & 13)
- Veterans, First Responders & Healthcare Workers — "We support veterans and
  first responders in partnership with Victory Bridge and others, including a
  campaign with Orlando Bloom to reduce the stigma around mental health in
  veteran communities." (Global Goals 3, 8, 16 & 17)
- Day at Disney — "Merit-based trips with Mouseketeers to Disney World and
  Disneyland for outstanding youth." (Global Goals 4 & 17)
- Day of Service — "Mouseketeer-led volunteering — including sorting 4,000
  pounds of food at Nashville's Second Harvest Food Bank to provide more than
  3,000 meals to people in need." (Global Goals 1–17)
- Day of Hope / Evening of Impact — "Empowering days of pampering and evenings
  of impact for women who are victims of domestic abuse." (Global Goals 5 & 10)
- Hall of Fame / Be Great! Awards — "Like the Mouse Club's 'Hall of Fame Day,'
  we spotlight community leaders and provide grants to those in need."
  (Global Goals 1–17)
- Why? Because It's Christmas — "Mouseketeers reunited for music and events
  supporting MusiCares and music people in need." (Global Goals 1, 2 & 3)
- Shop the Club, We Plant a Tree — "With every purchase or donation in our Club
  Store, we plant a tree in your name to help offset carbon emissions."

**Section — Testimonials** (use a 21st.dev testimonial component)
- Pamela Landwirth, President & CEO, Give Kids The World: *"We are truly
  honored to be a part of this special reunion of the Mickey Mouse Club. The
  joy that participants bring to these precious families through their support
  is immeasurable."*
- Holly Welch Stubbing, President & CEO of E4E Relief (Brave of Heart Fund):
  *"We are grateful to Always in the Club for its efforts to raise awareness
  for the Brave of Heart Fund."*
- Laura Segura, Executive Director of MusiCares: *"Music has such a unique
  ability to heal and unify us. The direct impact we've been able to make on
  our music community would not be possible without the generosity of partners
  like Always In The Club."*

**Section — Our Partners** (use a 21st.dev marquee/logo strip)
- MusiCares — "We partnered with MusiCares on our holiday album Why? Because
  It's Christmas, which debuted at #21 on Billboard."
- Educational Destinations — "A Disney Parks Recognized Youth Travel Planner
  and Disney on Broadway's Preferred Travel Planner."
- That's 4 Entertainment — "We partner with their 90s Con and Christmas Con
  to raise awareness and funds for our programs."
- Entertainment For Change — "We work with EFC to amplify young voices and
  create a new kind of empowered leader."
- Be Great! — "A social impact-based production company. Together we produce
  awards, events and media that inspire people to Be Great!"

**Section — Downloads** (PDF links — harvest from live `/programs` page)
- Programs Overview — Youth Arts Education & Mentoring (PDF)
- Imagination Campus — Workshops and Performances Overview (PDF)
- Always In The Club Production Services Deck (PDF)

---

### IMPACT (`/impact`)

**Intro**
- Heading: "Our Impact"
- Body: "Guided by the Global Goals, our MMC'89 Social Impact Initiative
  supports a wide range of philanthropic efforts. Mouseketeers have helped
  raise more than $4.5 million to support youth education and mentoring,
  provide cost-free vacations to Disney World for critically ill children,
  groceries for families facing financial hardships, support victims of
  domestic abuse, and train socially conscious artists and entrepreneurs,
  among other important causes."

**Impact cards** (grid — each a result with a dollar figure):
- Youth Education & Mentorship — "We are particularly proud of our livestream
  from Walt Disney World Resort to more than 2,000 youth delegates around the
  world, featuring in-depth discussions with Disney icons, humanitarians, and
  business leaders."
- Cast Member Pantry — "We teamed with Cast Member Pantry to help the startup
  raise almost $300,000 and serve over 10,000 cast members."
- 90s Con / Alzheimer's Association — "We facilitated the reunion of
  Mouseketeers at the first-ever 90s Con, where more than $10,000 was raised
  for the Alzheimer's Association and an additional $30,000 for Always In The
  Club Foundation."
- Disney Imagination Campus — "We launched our experiential learning and
  mentoring program, sponsoring 11 children on a learning adventure behind the
  scenes at Walt Disney World Resort with Disney Imagineers and company
  leaders."
- The Party VIP Cruise 2023 — "The Party's summer-long fundraising campaign,
  including their 30th Anniversary Concert Film, helped raise more than $53,000
  in donations, sponsorships, and sales."
- Give Kids The World Village — "Mouseketeers reunited for the 30th anniversary
  of the show at Walt Disney World to raise $20,000 for Give Kids The World and
  diversity initiatives in Orlando."
- DIS Family Reunion — "We drove direct contributions of more than $7,000 to
  Give Kids The World, plus thousands in ticket sales, and activated 2,000
  youth delegates worldwide alongside The Party Reunion Concert and the Be
  Great! Humanitarian Awards."
- 2022 Humanitarian Awards — "We helped raise more than $60,000, with $12,500
  donated to Rose of Sharon, Cast Member Pantry, Canine Companions, and
  Entertainment For Change. The event launched the Use Your Bottle, Change Our
  World campaign with the United Nations Development Program."
- Day of Hope with Jenesse Center — "We teamed with the Jenesse Center, Create
  Impact, and Spice Salon to treat victims of domestic abuse with a special Day
  of Hope — pampering, sponsored gifts, lunch, and more."
- unite4:humanity — "AITCF provided marketing and fundraising support to help
  raise $4,000,000 for charity with the launch of unite4:humanity. Honorees and
  speakers included Robert De Niro, Martin Scorsese, Alicia Keys, Sean Penn,
  Selena Gomez, Forest Whitaker, and President Bill Clinton."
- Jenesse Center — "AITCF provided marketing and production support to help
  raise $100,000 for the Jenesse Center, supporting Ambassador Halle Berry's
  call to action."
- The Party 30th Anniversary Concert — "Cast members reunited as The Party for
  an epic 30th anniversary concert at House of Blues Orlando, grossing over
  $120,000 for charity."

---

### ABOUT (`/about`) — NEW PAGE

Consolidates the MMC history and Foundation origin currently buried at the
bottom of the homepage.

**Section — About the 'All New' Mickey Mouse Club**
- "Filmed at Hollywood Studios in Walt Disney World, The 'All New' Mickey
  Mouse Club debuted in 1989 on the Disney Channel. Mouseketeers were chosen by
  Disney from all over the country and represented a variety of races,
  religions and skill sets — each chosen because they individually represented
  something exceptional."
- "Cast members have gone on to play a pivotal role in shaping the last 30
  years of popular culture with critically acclaimed and wildly successful
  projects across music, film, television and theater — and they're still
  making an impact today. Recognizing their place as lifelong ambassadors of
  the Disney brand, many have leveraged their global influence to help raise
  millions of dollars for nonprofits around the world."
- Quote: *"What an incredible honor it has been representing one of Walt's
  passion projects. The show helped in raising us to be socially conscious and
  gave us the ultimate gift of the exposure to each other's beliefs, skills,
  and backgrounds to learn, grow and build upon."* — Chasen Hampton (Mouseketeer)

**Section — Where It All Began**
- "Always In The Club was founded in 2012 as a fan community and fiscally
  sponsored program. Since then, we have grown into a thriving 501(c)(3)
  nonprofit serving those in need. We have supported dozens of organizations
  and produced numerous events featuring global leaders in entertainment,
  business and government."

**Section — Get Involved**
- "Whether you're interested in volunteering, donating, or simply learning more
  about us, there are plenty of ways to get involved. We welcome individuals
  and groups of all backgrounds and experience levels."
- Callout: "Are you a Disney employee? We are an approved charity for the
  Disney Matching Gifts and VoluntEARS Grants programs."
- Button: "Email us to get involved" → `mailto:Info@AlwaysInTheClub.org`

---

### TEAM (`/team`)

**Intro**
- Heading: "Our Team"
- Body: "Always In The Club is dedicated to empowering young people through
  arts education and mentoring, and using our platform to support efforts
  across a wide range of causes. Our team is comprised of accomplished artists,
  educators, and entrepreneurs committed to making a difference in the lives of
  those who need it most."

**Section — Our Board** (card per person: name, role line, title, link)
- Chasen Hampton — Singer/Songwriter, Producer, Teacher & Mouseketeer —
  *Chairman of the Board* — LinkedIn `https://www.linkedin.com/in/chasenhampton/`
- Gloria Ayee, PhD — Lecturer in Extension, Harvard University — *Board Member*
  — `https://extension.harvard.edu/faculty/gloria-ayee/`
- Patty Chung Adams, MBA, PGA — Disney Creative Development, Inclusive
  Strategies (Walt Disney Imagineering) — *Board Member* —
  `https://www.linkedin.com/in/patty-chung-adams/`
- Bret Iwan — Artist and Voice of Mickey Mouse — *Board Member* —
  `https://disneyfineart.com/pages/bret-iwan`
- Jennifer Kramer, M.Ed. — Educator, Trainer, Curriculum Developer, Non-Profit
  Consultant — *Board Member* —
  `https://www.linkedin.com/in/jennifer-s-kramer-m-ed-40a15aa5/`
- Tony Lucca — Singer/Songwriter, Producer & Mouseketeer — *Board Member* —
  `https://www.tonylucca.com/`
- Jennifer McGill — Singer, Vocal Coach & Mouseketeer — *Board Member* —
  `https://www.jennifermcgill.com/`
- Axel Tillmann — Entrepreneur — *Board Member (Secretary)* —
  `https://alpha-consult.com/axel-tillmann/`
- Jonathan B. Smith, CPA — Certified Public Accountant — *Board Member
  (Treasurer)*
- Rachel Carlsen, CPA — Certified Public Accountant — *Advisor* —
  `https://rachelcarlsen.com/`
- Tasha Danner — Actress/Singer, Accounting Manager at Caldera Arts &
  Mouseketeer — *Advisor* — `https://www.linkedin.com/in/tasha-danner/`

> Owner to confirm spelling: "Kramer" vs "Krammer" appears inconsistently on
> the current site.

**Section — Our Leadership & Staff**
- Chasen Hampton — Singer/Songwriter, Producer, Teacher & Mouseketeer —
  *Executive Director & Chairman*
- Lisa Cannata — Entrepreneur — *Production Manager*
- Yvette Cherkala — VIP Hospitality — *Club Memberships & Event Coordination* —
  `https://www.linkedin.com/in/yvettecherkala`
- Axel Tillmann — Entrepreneur & Business Consultant — *Secretary & Vice
  President*
- Rhona Bennett — Former member of En Vogue, Life Coach & Mouseketeer —
  *Program: Personal Power University*
- Carrie Mulderink — Doctor of Philosophy / Master of Arts — *Diversity Manager*
- Jonathan B. Smith, CPA — Certified Public Accountant — *Treasurer*
- Albert JeunePierre Fields — Singer/Songwriter/Producer & Mouseketeer —
  *Program: Day of Hope*
- Anthony Donovan — Artist & Designer — *Social Media Manager*

**Section — Contact Us** (the Formspree contact form — Section 7)
- Heading: "Drop us a line!"
- Contact details: Always In The Club Foundation, 100 East Pine Street, Suite
  110, Orlando, FL 32801 — (407) 804-8737 — Info@AlwaysInTheClub.org

---

### BLOG (`/blog`)

- Markdown/MDX posts in `content/blog/`. Frontmatter: `title`, `date`,
  `excerpt`, `coverImage`, `author`.
- `/blog` lists posts (newest first) as cards with cover image, title, date,
  excerpt.
- `/blog/[slug]` renders a single post — clean editorial reading layout
  (Fraunces headings, Inter body, comfortable measure).
- Create one example post titled **"Welcome to the new Always In The Club blog"**
  so the page isn't empty and the owner sees the file pattern.
- Include a short note in the repo (e.g. `content/blog/README.md`) explaining
  that a new post = a new Markdown file, and the owner can just ask Claude Code
  to create one.
- Keep the existing blog intro line available: "Discover the magic of youth
  empowerment through arts and mentorship with the Always In The Club
  Foundation."

---

## 10. SEO, meta & misc

- Per-page `<title>` and meta descriptions (use the page intros as a basis).
- Open Graph + Twitter card metadata. Twitter handle: `@AITCFoundation`.
- `theme-color`: `#AB0707`.
- Favicon / app icons (use the Foundation logo once harvested).
- `sitemap.xml` and `robots.txt`.
- Carry over the Google Search Console verification if the owner wants it —
  current token: `6apbSKkzwndwjN4zuoTyevImTUGk93zvGSY6R0tyZjQ` (or the owner
  can re-verify in Search Console after launch).
- Semantic HTML, alt text on every image, keyboard-accessible nav and forms,
  good color contrast.
- Responsive: verify mobile, tablet, and desktop.

---

## 11. Out of scope / do not do

- **No e-commerce / checkout** — the store stays on Shopify (mmcreunion.com).
- **No user accounts or sign-in** — remove all the GoDaddy account UI.
- **No payment processing** — donations go to Zeffy.
- **Do not rebuild mickeymouseclubreunion.com pages** — link out to them.
- Drop the old GoDaddy `cruise-pop-up-shop` cart.
- **Do not invent** copy, statistics, names, quotes, or partner relationships.
  If something is missing, ask the owner.
- Do not let third-party component default styles override the design system.
