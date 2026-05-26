"use client";

/**
 * Floating chat bubble — bottom-right on every page.
 *
 * - Closed state: a round red FAB with a chat icon.
 * - Open state (desktop): a fixed-position panel just above the FAB.
 * - Open state (mobile): a near-full-height drawer anchored to the
 *   bottom of the viewport. The panel hosts the shared ChatInterface,
 *   so the conversation persists when the visitor opens it again or
 *   navigates to the dedicated /chat page.
 * - Hidden on the /chat page itself (the bubble would just duplicate
 *   the page surface).
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { ChatInterface } from "@/components/chat/chat-interface";

export function ChatBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  // Hide the bubble on the dedicated /chat page — the page is the
  // chat itself, so no bubble. We compute the flag here but render
  // an early return AFTER the hooks so hook order stays stable.
  const hideOnThisRoute = pathname?.startsWith("/chat") ?? false;

  // Focus management: when the panel opens, move focus into it; when
  // it closes, return focus to the launching button.
  useEffect(() => {
    if (hideOnThisRoute) return;
    if (open) {
      previouslyFocusedRef.current = document.activeElement;
      closeBtnRef.current?.focus();
    } else {
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    }
  }, [open, hideOnThisRoute]);

  // Esc to close.
  useEffect(() => {
    if (hideOnThisRoute || !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hideOnThisRoute]);

  if (hideOnThisRoute) return null;

  return (
    <>
      {/* The FAB itself — always rendered so the open/close animation
          can play from its position. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        aria-controls="chat-bubble-panel"
        className={`fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-red text-cream shadow-soft transition-all duration-300 ease-out hover:bg-red-deep hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:bottom-6 sm:right-6 motion-reduce:transition-none motion-reduce:hover:scale-100 ${
          open ? "rotate-90 opacity-0 pointer-events-none" : "rotate-0"
        }`}
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
      </button>

      {/* Panel — mounted only while open so it stays out of the
          accessibility tree the rest of the time. */}
      {open && (
        <div
          id="chat-bubble-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-bubble-title"
          className="fixed inset-x-0 bottom-0 z-[60] flex h-[85svh] max-h-[640px] flex-col overflow-hidden rounded-t-2xl border-x border-t border-border bg-cream shadow-soft animate-in slide-in-from-bottom duration-300 motion-reduce:animate-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[400px] sm:rounded-2xl sm:border"
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border bg-warm-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red/10 text-red">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p
                  id="chat-bubble-title"
                  className="font-display text-base font-medium leading-tight text-ink"
                >
                  Always In The Club
                </p>
                <p className="text-[11px] leading-tight text-warm-gray">
                  AI Assistant
                </p>
              </div>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </header>

          {/* Shared chat surface */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface variant="bubble" />
          </div>
        </div>
      )}
    </>
  );
}
