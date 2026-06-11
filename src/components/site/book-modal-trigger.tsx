"use client";

import { BOOK_MODAL_OPEN_EVENT } from "@/components/site/book-modal";
import { trackEvent } from "@/lib/analytics/track";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Renders a button that opens the site-wide BookModal (the same modal
 *  that auto-greets new visitors). Swap-in replacement for the outbound
 *  "Get the MMC Book" anchor on the hero.
 *
 *  Fires `get_mmc_book` here (on the explicit CTA click) rather than in
 *  the modal, since the modal also auto-greets new visitors and an
 *  auto-greet is not a Get-the-MMC-Book click. */
export function BookModalTrigger({ children, className }: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("get_mmc_book");
        window.dispatchEvent(new Event(BOOK_MODAL_OPEN_EVENT));
      }}
      className={className}
    >
      {children}
    </button>
  );
}
