"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

// TODO: Owner — once you create the Formspree form, set NEXT_PUBLIC_FORMSPREE_ID
// in .env.local (see .env.local.example). Until it's set, the form falls back
// to a plain mailto: link so the page still works.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const FORMSPREE_URL = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : null;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!FORMSPREE_URL) {
      setStatus({
        kind: "error",
        message:
          "The contact form isn't connected yet — please email us directly.",
      });
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { errors?: { message?: string }[] }
          | null;
        const message =
          body?.errors?.[0]?.message ??
          "Something went wrong sending your message. Please try again.";
        setStatus({ kind: "error", message });
        return;
      }
      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach our message service. Please email us directly.",
      });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-cream p-8 shadow-soft-sm sm:p-10"
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 block h-12 w-full rounded-xl border border-border bg-warm-white px-4 text-base text-ink shadow-inner outline-none transition-colors placeholder:text-warm-gray/60 focus:border-red focus:ring-2 focus:ring-red/30"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 block h-12 w-full rounded-xl border border-border bg-warm-white px-4 text-base text-ink shadow-inner outline-none transition-colors placeholder:text-warm-gray/60 focus:border-red focus:ring-2 focus:ring-red/30"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            className="mt-2 block w-full rounded-xl border border-border bg-warm-white px-4 py-3 text-base text-ink shadow-inner outline-none transition-colors placeholder:text-warm-gray/60 focus:border-red focus:ring-2 focus:ring-red/30"
            placeholder="Tell us what's on your mind."
          />
        </div>

        {/* Formspree honeypot — silently catches bots */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-semibold text-cream no-underline transition-colors hover:bg-red-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Sending…" : "Send message"}
          {!submitting && <Send className="h-4 w-4" aria-hidden />}
        </button>

        {/* Live status — read by screen readers when it changes */}
        <p
          role="status"
          aria-live="polite"
          className={
            status.kind === "success"
              ? "rounded-xl border border-gold/40 bg-gold/10 p-4 text-[15px] text-ink"
              : status.kind === "error"
                ? "rounded-xl border border-red/30 bg-red/5 p-4 text-[15px] text-red-deep"
                : "sr-only"
          }
        >
          {status.kind === "success" &&
            "Thanks — your message is on its way. We'll be in touch soon."}
          {status.kind === "error" && (
            <>
              {status.message}{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold underline"
              >
                {siteConfig.contact.email}
              </a>
            </>
          )}
        </p>

        {!FORMSPREE_URL && (
          <p className="text-[12px] text-warm-gray">
            <span className="font-semibold">Note:</span> the contact form is
            ready, but the Formspree form ID hasn&rsquo;t been added yet. Set{" "}
            <code className="rounded bg-warm-white px-1.5 py-0.5 font-mono text-[11px]">
              NEXT_PUBLIC_FORMSPREE_ID
            </code>{" "}
            in <code className="font-mono">.env.local</code> to enable
            submissions.
          </p>
        )}
      </div>
    </form>
  );
}
