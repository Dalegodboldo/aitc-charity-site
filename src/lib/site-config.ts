export const siteConfig = {
  name: "Always In The Club Foundation",
  shortName: "Always In The Club",
  tagline: "Using our E.A.R.S. to make a difference.",
  ein: "85-4015614",
  contact: {
    email: "Info@AlwaysInTheClub.org",
    phones: ["407.804.8737", "925.350.6448"],
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
    newsletter: "https://stats.sender.net/forms/dwWNMd/view",
    store: "https://mmcreunion.com",
    events: "https://www.mickeymouseclubreunion.com/events",
    bookTeers: "https://www.mickeymouseclubreunion.com/bookings",
    book: "https://www.mickeymouseclubreunion.com/books",
    mainSite: "https://www.mickeymouseclubreunion.com/",
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

export const primaryNav = [
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
] as const;
