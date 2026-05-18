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
    newsletter: "https://stats.sender.net/forms/dwWNMd/view",
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
  href: string;
  label: string;
  external?: boolean;
  mobileOnly?: boolean;
};

export const primaryNav: readonly NavItem[] = [
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "All Ears" },
  { href: siteConfig.external.events, label: "Events", external: true, mobileOnly: true },
  {
    href: "https://www.createimpactnow.org/gallery",
    label: "Photo Gallery",
    external: true,
    mobileOnly: true,
  },
  { href: siteConfig.external.store, label: "Store", external: true },
  {
    href: siteConfig.external.linktree,
    label: "Linktree (Explore the Club)",
    external: true,
    mobileOnly: true,
  },
];
