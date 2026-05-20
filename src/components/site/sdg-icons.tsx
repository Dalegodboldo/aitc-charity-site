import Image from "next/image";

/** "Global Goals 1–17" → "all" (renders the multicolour SDG wheel).
 *  "Global Goals 3, 4 & 8" → [3, 4, 8] (renders individual tiles). */
function parseGoals(goals: string): "all" | number[] {
  if (/1\s*[–-]\s*17/.test(goals)) return "all";
  return Array.from(goals.matchAll(/\b(1[0-7]|[1-9])\b/g)).map((m) =>
    Number(m[1])
  );
}

/**
 * Renders a row of UN Sustainable Development Goal icons, each linking
 * out to its description page on sdgs.un.org. Accepts the human-readable
 * goal string we already store on campaign/program data ("Global Goals
 * 3, 4 & 8" or "Global Goals 1–17"); the "1–17" form renders the
 * multicolour SDG wheel instead of all 17 tiles.
 */
export function GoalIcons({ goals }: { goals: string }) {
  const parsed = parseGoals(goals);
  if (parsed === "all") {
    return (
      <div className="mt-2.5">
        <a
          href="https://sdgs.un.org/goals"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Learn about all 17 UN Global Goals on sdgs.un.org"
          className="inline-block rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          <Image
            src="/images/sdg/sdg-wheel.png"
            alt="All 17 UN Global Goals"
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11"
            unoptimized
          />
        </a>
      </div>
    );
  }
  if (parsed.length === 0) return null;
  return (
    <ul
      aria-label="UN Global Goals addressed by this program"
      className="mt-2.5 flex flex-wrap items-center gap-1.5"
    >
      {parsed.map((n) => (
        <li key={n}>
          <a
            href={`https://sdgs.un.org/goals/goal${n}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Learn about UN Global Goal ${n} on sdgs.un.org`}
            className="block rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            <Image
              src={`/images/sdg/sdg-${String(n).padStart(2, "0")}.jpg`}
              alt={`UN Global Goal ${n}`}
              width={44}
              height={44}
              className="h-10 w-10 rounded-sm sm:h-11 sm:w-11"
              unoptimized
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
