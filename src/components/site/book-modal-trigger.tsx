"use client";

import { BOOK_MODAL_OPEN_EVENT } from "@/components/site/book-modal";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Renders a button that opens the site-wide BookModal (the same modal
 *  that auto-greets new visitors). Swap-in replacement for the outbound
 *  "Get the MMC Book" anchor on the hero. */
export function BookModalTrigger({ children, className }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(BOOK_MODAL_OPEN_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}
