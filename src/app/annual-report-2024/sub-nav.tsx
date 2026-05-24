"use client";

/**
 * Sticky secondary nav for the FY 2024 Annual Report.
 *
 * Sits directly below the main site header (which is h-16 on mobile
 * and h-20 on sm+), so its top offset matches in the stylesheet. An
 * IntersectionObserver tracks which section is in view and highlights
 * the matching link. Smooth-scroll comes from the global CSS rule on
 * the report wrapper plus per-section `scroll-margin-top` so the
 * scroll lands below both bars.
 */

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const sections = [
  { id: "letter", label: "Letter" },
  { id: "glance", label: "At a Glance" },
  { id: "book", label: "The Book" },
  { id: "mmc89", label: "MMC'89" },
  { id: "financials", label: "Financials" },
  { id: "ahead", label: "Looking Ahead" },
];

export function SubNav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Track which sections are currently inside the "active band"
    // (140px from top down to 45% from top). The IntersectionObserver
    // only fires on enter/exit transitions, so we keep a running Set
    // and pick the topmost still-intersecting section. If the set
    // empties (e.g., user scrolls back above the first section), we
    // clear the active state instead of leaving the last link stuck.
    const visibleIds = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }
        if (visibleIds.size === 0) {
          setActive("");
          return;
        }
        const topmost = sections
          .map((s) => document.getElementById(s.id))
          .filter((el): el is HTMLElement => el !== null && visibleIds.has(el.id))
          .sort(
            (a, b) =>
              a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          )[0];
        if (topmost) setActive(topmost.id);
      },
      {
        rootMargin: "-140px 0px -55% 0px",
        threshold: 0,
      },
    );

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Annual report sections" className={styles.subNav}>
      <div className={styles.subNavInner}>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            className={
              active === s.id
                ? `${styles.subNavLink} ${styles.subNavLinkActive}`
                : styles.subNavLink
            }
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
