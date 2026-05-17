export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-gold">
          Always In The Club Foundation
        </p>
        <h1 className="mt-6 text-5xl font-medium sm:text-6xl">
          Education, Arts, Resources… <em className="italic">Social Impact</em>
        </h1>
        <p className="mt-6 text-lg text-warm-gray">
          Using our E.A.R.S. to make a difference. The new site is under
          construction — phase 0 scaffold is live.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.zeffy.com/en-US/donation-form/12a9b4c5-4c0e-47b7-a70f-e2af2bb4d5e6"
            className="inline-flex h-12 items-center justify-center rounded-full bg-red px-7 text-base font-medium text-cream no-underline transition-colors hover:bg-red-deep hover:text-cream"
          >
            Donate
          </a>
          <a
            href="https://www.mickeymouseclubreunion.com/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-warm-white px-7 text-base font-medium text-ink no-underline transition-colors hover:border-ink/30 hover:text-ink"
          >
            Visit Main Site
          </a>
        </div>
      </div>
    </main>
  );
}
