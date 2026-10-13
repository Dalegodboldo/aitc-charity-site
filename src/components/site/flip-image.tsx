"use client";

import Image from "next/image";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

export type FlipImageData = {
  src: string;
  alt: string;
  objectPosition?: string;
  /** Extra inline style applied to the <Image>, e.g. for scale/origin. */
  imgStyle?: React.CSSProperties;
};

/**
 * Iris / spotlight reveal card. The front photo is the
 * always-visible base; the back photo is unmasked via an expanding
 * circular clip-path.
 *
 * Click (desktop) or tap (touch) toggles a `revealed` state that adds
 * `.is-revealed` to the card, which opens the iris; clicking again
 * flips back to the front photo. There is deliberately no hover
 * reveal: the cursor is still over the card when "Flip back" is
 * clicked, so a hover reveal would keep the back photo showing.
 * A flip icon badge tells visitors there is a second photo.
 */
export function FlipImage({
  front,
  back,
}: {
  front: FlipImageData;
  back: FlipImageData;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={revealed}
      aria-label={revealed ? "Hide the second photo" : "Reveal the second photo"}
      onClick={() => setRevealed((v) => !v)}
      className={`iris-card relative block aspect-[16/10] w-full overflow-hidden bg-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red ${
        revealed ? "is-revealed" : ""
      }`}
    >
      {/* Front (base, always visible) */}
      <div className="absolute inset-0">
        <Image
          src={front.src}
          alt={front.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          style={{
            ...(front.objectPosition
              ? { objectPosition: front.objectPosition }
              : {}),
            ...(front.imgStyle ?? {}),
          }}
          className="object-cover"
        />
      </div>
      {/* Back (spotlight reveal — clip-path lives in globals.css, driven
          by the .is-revealed class) */}
      <div className="iris-back absolute inset-0 motion-reduce:!transition-none">
        <Image
          src={back.src}
          alt={back.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          style={{
            ...(back.objectPosition
              ? { objectPosition: back.objectPosition }
              : {}),
            ...(back.imgStyle ?? {}),
          }}
          className="object-cover"
        />
      </div>
      {/* Flip badge — signals there's a back photo to see. Stays visible
          and spins half a turn when the back is showing. */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/65 py-1.5 pl-2 pr-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream shadow-soft-sm backdrop-blur-sm"
      >
        <RefreshCw
          className={`h-4 w-4 transition-transform duration-500 motion-reduce:transition-none ${
            revealed ? "rotate-180" : ""
          }`}
        />
        {revealed ? "Flip back" : "Flip"}
      </span>
    </button>
  );
}
