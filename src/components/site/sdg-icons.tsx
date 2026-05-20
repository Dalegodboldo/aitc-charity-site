import Image from "next/image";

/** "Global Goals 1–17" → "all" (renders the multicolour SDG wheel).
 *  "Global Goals 3, 4 & 8" → [3, 4, 8] (renders individual tiles). */
function parseGoals(goals: string): "all" | number[] {
  if (/1\s*[–-]\s*17/.test(goals)) return "all";
  return Array.from(goals.matchAll(/\b(1[0-7]|[1-9])\b/g)).map((m) =>
    Number(m[1])
  );
}

/** Human-readable goal string covering every Global Goal as individual
 *  tiles (the "1–17" en-dash form would collapse to the SDG wheel). */
export const ALL_GLOBAL_GOALS =
  "Global Goals " +
  Array.from({ length: 17 }, (_, i) => i + 1).join(", ");

type Props = {
  goals: string;
  /** When false, icons render as plain images with no outbound link to
   *  the UN goal pages. Defaults to true (linked). */
  linked?: boolean;
};

/**
 * Renders a row of UN Sustainable Development Goal icons. Accepts the
 * human-readable goal string we already store on campaign/program data
 * ("Global Goals 3, 4 & 8" or "Global Goals 1–17"); the "1–17" form
 * renders the multicolour SDG wheel instead of all 17 tiles. By default
 * each icon links to its sdgs.un.org page; pass `linked={false}` for a
 * purely decorative icon row.
 */
export function GoalIcons({ goals, linked = true }: Props) {
  const parsed = parseGoals(goals);

  if (parsed === "all") {
    const wheel = (
      <Image
        src="/images/sdg/sdg-wheel.png"
        alt="All 17 UN Global Goals"
        width={44}
        height={44}
        className="h-10 w-10 sm:h-11 sm:w-11"
        unoptimized
      />
    );
    return (
      <div className="mt-2.5">
        {linked ? (
          <a
            href="https://sdgs.un.org/goals"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Learn about all 17 UN Global Goals on sdgs.un.org"
            className="inline-block rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            {wheel}
          </a>
        ) : (
          wheel
        )}
      </div>
    );
  }

  if (parsed.length === 0) return null;

  return (
    <ul
      aria-label="UN Global Goals addressed by this program"
      className="mt-2.5 flex flex-wrap items-center gap-1.5"
    >
      {parsed.map((n) => {
        const icon = (
          <Image
            src={`/images/sdg/sdg-${String(n).padStart(2, "0")}.jpg`}
            alt={`UN Global Goal ${n}`}
            width={44}
            height={44}
            className="h-10 w-10 rounded-sm sm:h-11 sm:w-11"
            unoptimized
          />
        );
        return (
          <li key={n}>
            {linked ? (
              <a
                href={`https://sdgs.un.org/goals/goal${n}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Learn about UN Global Goal ${n} on sdgs.un.org`}
                className="block rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                {icon}
              </a>
            ) : (
              icon
            )}
          </li>
        );
      })}
    </ul>
  );
}
