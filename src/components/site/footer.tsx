"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DonateTrigger } from "@/components/site/donate-trigger";
import { cn } from "@/lib/utils";
import { primaryNav, siteConfig } from "@/lib/site-config";

/** True when the visitor is on `href` or any sub-route of it. */
function isActivePath(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(href + "/");
}

type IconProps = { className?: string };

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.72 3.72 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.84a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.876l-5.387-7.04L4.5 22H1.243l8.02-9.165L1 2h7.034l4.87 6.435L18.244 2zm-2.41 18h1.84L7.26 4H5.32l10.514 16z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3.02 3.02 0 0 0 2.12-2.13c.5-1.87.5-5.8.5-5.8s0-3.93-.5-5.8zM9.6 15.57V8.43L15.82 12 9.6 15.57z" />
    </svg>
  );
}

type FooterLink = { href: string; label: string; external: boolean };

const externalLinkGroups: { label: string; links: FooterLink[] }[] = [
  {
    label: "Get involved",
    links: [
      { href: siteConfig.external.donate, label: "Donate", external: true },
      { href: siteConfig.external.bookTeers, label: "Book the 'Teers", external: true },
      { href: siteConfig.external.newsletter, label: "Newsletter", external: true },
    ],
  },
  {
    label: "Get inspired",
    links: [
      {
        href: "/blog",
        label: "All Ears — Stories from the Club",
        external: false,
      },
      {
        href: "/mouseketeer-roundup",
        label: "Mouseketeer Roundup",
        external: false,
      },
      {
        href: siteConfig.external.mainSiteBlog,
        label: "MMC'89 Blog",
        external: true,
      },
      {
        href: "/annual-report-2024",
        label: "Annual Report (FY 2024 - FYE 2025)",
        external: false,
      },
      {
        href: siteConfig.external.annualReport,
        label: "Annual Report (FY 2023 - FYE 2024)",
        external: true,
      },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  return (
    <footer className="mt-20 border-t border-border bg-warm-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Top: brand + 4 column grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Image
              src="/images/changemaker-ears.png"
              alt="Changemaker"
              width={636}
              height={636}
              className="block h-auto w-[120px]"
            />
            <Link
              href="/"
              aria-label="Always In The Club Foundation — home"
              className="mt-4 inline-block no-underline"
            >
              <Image
                src="/images/aitc-logo-long.png"
                alt="Always In The Club"
                width={310}
                height={57}
                className="block h-9 w-auto"
              />
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                Foundation
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-display text-[15px] italic leading-relaxed text-warm-gray">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Site nav */}
          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {primaryNav
                .filter(
                  (item) =>
                    item.href !== "/blog" &&
                    item.href !== "/mouseketeer-roundup",
                )
                .map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warm-gray no-underline transition-colors hover:text-red"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                        className={cn(
                          "no-underline transition-colors hover:text-red",
                          isActivePath(pathname, item.href)
                            ? "text-gold hover:text-gold"
                            : "text-warm-gray",
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </nav>

          {/* External link groups (collapsed into one column) */}
          <div>
            {externalLinkGroups.map((group) => (
              <div key={group.label} className="mb-7 last:mb-0">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                  {group.label}
                </h2>
                <ul className="mt-5 space-y-3 text-[15px]">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {link.href === siteConfig.external.donate ? (
                        <DonateTrigger className="text-warm-gray no-underline transition-colors hover:text-red">
                          {link.label}
                        </DonateTrigger>
                      ) : (
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          aria-current={
                            !link.external && isActivePath(pathname, link.href)
                              ? "page"
                              : undefined
                          }
                          className={cn(
                            "no-underline transition-colors hover:text-red",
                            !link.external && isActivePath(pathname, link.href)
                              ? "text-gold hover:text-gold"
                              : "text-warm-gray",
                          )}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-[15px] text-warm-gray">
              {siteConfig.contact.addresses.map((addr) => (
                <li key={addr.label}>
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/70">
                    {addr.label}
                  </p>
                  {addr.lines.map((line) => (
                    <p key={line} className="leading-snug">
                      {line}
                    </p>
                  ))}
                </li>
              ))}
              <li>
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/70">
                  Phone
                </p>
                {siteConfig.contact.phones.map((phone) => (
                  <p key={phone} className="block text-warm-gray">
                    {phone}
                  </p>
                ))}
              </li>
              <li>
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/70">
                  Email
                </p>
                <p className="text-warm-gray">{siteConfig.contact.email}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials + 501(c)(3) line */}
        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex items-center gap-3">
            {[
              { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
              { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              { href: siteConfig.social.x, label: "X (formerly Twitter)", Icon: XIcon },
              { href: siteConfig.social.youtube, label: "YouTube", Icon: YoutubeIcon },
            ].map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-cream text-ink no-underline transition-colors hover:border-red hover:text-red"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            {/* Candid (GuideStar) transparency seal — widget SVG is
                served from widgets.guidestar.org so we use a plain
                <img>; next/image would require allowlisting that host
                in remotePatterns. */}
            <a
              href="https://app.candid.org/profile/10968737/always-in-the-club-foundation-85-4015614/?pkId=81b26a3d-5c81-4893-a0b1-ba0087a03c14"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Always In The Club Foundation profile on Candid (GuideStar)"
              className="inline-block rounded-md transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Candid transparency seal for Always In The Club Foundation"
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/10968737/svg"
                className="block h-24 w-auto sm:h-28"
              />
            </a>
            <p className="max-w-md text-[12px] leading-relaxed text-warm-gray sm:text-right">
              Always In The Club Foundation is an exempt organization as
              described under Section 501(c)(3) of the Internal Revenue Code,
              EIN #{siteConfig.ein}.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-[12px] text-warm-gray">
          © {year} Always In The Club Foundation. All rights reserved.
        </p>

        {/* Disney trademark disclaimer */}
        <p className="mt-4 max-w-3xl text-[12px] leading-relaxed text-warm-gray">
          Always In The Club is not affiliated with Disney®. The Mickey Mouse
          Club, Disney, and Disney Imagination Campus logos are registered
          trademarks of The Walt Disney Company. As to Disney artwork, logos
          and properties: ©Disney
        </p>
      </div>
    </footer>
  );
}
