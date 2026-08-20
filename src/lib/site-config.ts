export const siteConfig = {
  name: "Always In The Club Foundation",
  shortName: "Always In The Club",
  tagline: "Using our E.A.R.S. to make a difference.",
  ein: "85-4015614",
  contact: {
    email: "Info@AlwaysInTheClub.org",
    phones: ["407.804.8737"],
    addresses: [
      {
        label: "Orlando",
        lines: ["100 East Pine Street, Suite 110", "Orlando, FL 32801"],
      },
      {
        label: "Los Angeles Offices",
        lines: [
          "1801 Century Park East, 24th & 25th Floors",
          "Los Angeles, CA 90067",
        ],
      },
      {
        label: "Mailing Address",
        lines: ["5042 Wilshire Blvd, #38285", "Los Angeles, CA 90036"],
      },
    ],
  },
  external: {
    donate:
      "https://www.zeffy.com/en-US/donation-form/12a9b4c5-4c0e-47b7-a70f-e2af2bb4d5e6",
    /** Iframe-safe variant of the Zeffy donation form — used by the
     *  in-site DonateModal so visitors can give without leaving the site. */
    donateEmbed:
      "https://www.zeffy.com/embed/donation-form/12a9b4c5-4c0e-47b7-a70f-e2af2bb4d5e6",
    newsletter: "https://stats.sender.net/forms/dG6JK5/view",
    store: "https://mmcreunion.com",
    events: "https://www.mickeymouseclubreunion.com/events",
    gallery: "https://www.createimpactnow.org/gallery",
    bookTeers: "https://www.mickeymouseclubreunion.com/bookings",
    book: "https://www.mickeymouseclubreunion.com/books",
    mainSite: "https://www.mickeymouseclubreunion.com/",
    mainSiteBlog: "https://www.mickeymouseclubreunion.com/blog",
    annualReport:
      "https://aitc-annual-report-2024.my.canva.site/aitcf-2024-digital-annual-report",
    linktree: "https://linktr.ee/alwaysintheclub",
    clubMembership: "https://www.mickeymouseclubreunion.com/club-membership",
    pressRoom:
      "https://www.einpresswire.com/newsroom/mmc_89___always_in_the_club_foundation/",
  },
  social: {
    facebook: "https://www.facebook.com/766633633355366",
    instagram: "https://www.instagram.com/aitcfoundation/",
    linkedin: "https://www.linkedin.com/company/alwaysintheclubfoundation/",
    x: "https://www.x.com/AITCFoundation",
    youtube: "https://www.youtube.com/c/AlwaysInTheClub",
  },
} as const;

/** A nav item is either an internal route or an outbound link. The
 *  header and footer renderers branch on `external` to pick <Link>
 *  vs. <a target="_blank">. `mobileOnly` items are hidden from the
 *  desktop nav row but still appear in the mobile drawer (so we don't
 *  push the wide nav over its budget). */
export type NavItem = {
  /** Optional so a dropdown parent (with `children`) can omit its own link. */
  href?: string;
  label: string;
  /** Small muted source tag under a dropdown link, e.g. "People", "Deadline". */
  sublabel?: string;
  external?: boolean;
  mobileOnly?: boolean;
  /** When present, this item renders as a dropdown of these links. */
  children?: NavItem[];
};

export const primaryNav: readonly NavItem[] = [
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/our-why", label: "Our Why" },
  { href: "/team", label: "Team" },
  { href: siteConfig.external.store, label: "Store", external: true },
  { href: "/blog", label: "Blog" },
  {
    label: "Press",
    children: [
      {
        href: "https://www.societyartsandculture.com/article/935623106-after-ryan-gosling-s-mickey-mouse-club-tribute-at-d23-his-former-castmates-tell-the-full-story",
        label:
          "After Ryan Gosling's Mickey Mouse Club Tribute at D23, His Former Castmates Tell the Full Story",
        sublabel: "Society, Arts, Culture",
        external: true,
      },
      {
        href: "https://people.com/all-new-mickey-mouse-club-stars-where-are-they-now-12021267",
        label: "Stars of 'The All-New Mickey Mouse Club': Where Are They Now?",
        sublabel: "People",
        external: true,
      },
      {
        href: "https://people.com/former-mickey-mouse-club-mouseketeers-attending-90s-con-florida-exclusive-8676789",
        label:
          "Former Mickey Mouse Club Mouseketeers Are Set to Bring the Magic to 90s Con Florida",
        sublabel: "People Exclusive",
        external: true,
      },
      {
        href: "https://deadline.com/2026/07/the-mickey-mouse-club-disney-plus-pilot-1236983470/",
        label:
          "'The Mickey Mouse Club' Returns: Disney+ Orders Pilot For Reboot Of Kids Show That Made Britney Spears, Justin Timberlake & Ryan Gosling Famous",
        sublabel: "Deadline",
        external: true,
      },
      {
        href: "https://www.einpresswire.com/article/930808381/same-weekend-two-stages-mouseketeer-reunion-and-teen-theater-collide-in-central-florida",
        label:
          "Same Weekend, Two Stages: Mouseketeer Reunion and Teen Theater Collide in Central Florida",
        sublabel: "Press Release",
        external: true,
      },
      {
        href: "https://www.einpresswire.com/article/921773373/limited-edition-90s-mickey-mouse-club-history-sells-out-online-raising-support-for-youth-mentorship-and-arts-education",
        label:
          "Limited Edition '90s Mickey Mouse Club History Sells Out Online, Raising Support for Youth Mentorship and Arts Education",
        sublabel: "Press Release",
        external: true,
      },
      {
        href: siteConfig.external.pressRoom,
        label: "All press releases",
        external: true,
      },
    ],
  },
  { href: siteConfig.external.events, label: "Events", external: true, mobileOnly: true },
  {
    href: "/photo-gallery",
    label: "Photo Gallery",
    mobileOnly: true,
  },
  {
    href: siteConfig.external.book,
    label: "The MMC Book",
    external: true,
    mobileOnly: true,
  },
  {
    href: siteConfig.external.linktree,
    label: "Linktree (Explore the Club)",
    external: true,
    mobileOnly: true,
  },
  {
    href: "/mentorship-coaching",
    label: "Empower Young Creatives",
    mobileOnly: true,
  },
  {
    href: siteConfig.external.mainSite,
    label: "Celebrate the Legacy",
    external: true,
    mobileOnly: true,
  },
  {
    href: "/mouseketeer-roundup",
    label: "Mouseketeer Roundup",
    mobileOnly: true,
  },
];
