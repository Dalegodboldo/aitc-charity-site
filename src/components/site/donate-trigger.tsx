"use client";

import { DONATE_MODAL_OPEN_EVENT } from "@/components/site/donate-modal";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Optional accessibility label override for icon-only buttons. */
  ariaLabel?: string;
};

/** Renders a button that opens the site-wide DonateModal (the in-site
 *  Zeffy embed). Swap-in replacement for outbound donate anchors. */
export function DonateTrigger({ children, className, ariaLabel }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(DONATE_MODAL_OPEN_EVENT))}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
