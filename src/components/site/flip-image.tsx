"use client";

import Image from "next/image";
import { useState } from "react";

export type FlipImageData = {
  src: string;
  alt: string;
  objectPosition?: string;
  /** Extra inline style applied to the <Image>, e.g. for scale/origin. */
  imgStyle?: React.CSSProperties;
};

/**
 * Iris / spotlight reveal card. The front photo (red-tinted) is the
 * always-visible base; the back photo is unmasked via an expanding
 * circular clip-path.
 *
 * Desktop reveals on hover (CSS `:hover`). Touch devices reveal on
 * tap: the click toggles a `revealed` state that adds `.is-revealed`
 * to the card (CSS opens the iris) and hides the "Hover" hint badge.
 * A click toggle is used rather than `:focus-within` because mobile
 * browsers — iOS Safari especially — don't reliably keep a <button>
 * focused after a tap, so a focus-driven reveal flickers or never
 * sticks.
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
      className={`iris-card group relative block aspect-[16/10] w-full overflow-hidden bg-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red ${
        revealed ? "is-revealed" : ""
      }`}
    >
      {/* Front (base, always visible) — tinted with a red film that the
          iris reveal "uncovers" to show the back image in true colour */}
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-red mix-blend-multiply opacity-55"
        />
      </div>
      {/* Back (spotlight reveal — clip-path lives in globals.css, driven
          by :hover and the .is-revealed class) */}
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
      {/* Subtle hint that there's a second image — fades out once the
          back photo is revealed (hover on desktop, tap on touch). */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0 ${
          revealed ? "opacity-0" : ""
        }`}
      >
        Hover
      </span>
    </button>
  );
}
