"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackOutbound } from "@/lib/analytics/track";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * A plain <a> that fires the GA4 conversion event mapped to its href
 * (store_click / get_mmc_book / join_club_click / book_teers) on click,
 * then navigates normally. Use this in server components, where an inline
 * onClick handler isn't allowed.
 *
 * Fire-and-forget — the event call never blocks the navigation, and an
 * unmapped href simply navigates with no event.
 */
export function TrackedOutboundLink({
  href,
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        trackOutbound(href);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
