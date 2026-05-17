"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Final numeric target. */
  to: number;
  /** Text shown before the number, e.g. "$". */
  prefix?: string;
  /** Text shown after the number, e.g. "M+", "+". */
  suffix?: string;
  /** Decimals to render. */
  decimals?: number;
  /** Format with comma separators. */
  thousands?: boolean;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
};

function format(n: number, decimals: number, thousands: boolean) {
  const fixed = n.toFixed(decimals);
  if (!thousands) return fixed;
  const [int, dec] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${grouped}.${dec}` : grouped;
}

/**
 * Counts up from 0 to `to` once the element scrolls into view.
 * Reduced motion users see the final value immediately.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  thousands = false,
  duration = 1600,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(to * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(to);
            };
            requestAnimationFrame(tick);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, decimals, thousands)}
      {suffix}
    </span>
  );
}
