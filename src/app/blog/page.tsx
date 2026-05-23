import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "All Ears",
  description:
    "All Ears — ideas, stories, and resources from the Always In The Club Foundation's mission of youth mentorship and arts education.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <>
      <PageIntro
        eyebrow="Stories from the Club"
        title="All Ears"
        subtitle="Ideas, stories, and resources from our mission."
        body={"Every creative journey needs someone in its corner. The ‘All New’ Mickey Mouse Club proved what’s possible when young people get the arts, genuine mentorship, and a community that listens — and All Ears is where we keep that going. You’ll find ideas on mentorship and arts education, stories of the young people and Mouseketeers turning talent into possibility, and resources for anyone helping a young creative find their voice. We’re all ears here — we hope you are too."}
      />

      <section className="bg-warm-white pb-12 pt-4 sm:pb-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mb-12 flex flex-col items-start gap-3 rounded-2xl border border-border bg-cream px-7 py-6 shadow-soft-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-base leading-relaxed text-warm-gray">
              Like what you&rsquo;re reading? Get new All Ears posts in your
              inbox.
            </p>
            <a
              href={siteConfig.external.newsletter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-red px-6 text-sm font-semibold text-cream no-underline transition-colors hover:bg-red-deep hover:text-cream"
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
          {posts.length === 0 ? (
            <Reveal className="rounded-2xl border border-border bg-cream p-10 text-center text-warm-gray">
              <p>No posts yet — check back soon.</p>
            </Reveal>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.slug}
                  delay={(i % 3) * 80}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream shadow-soft-sm transition-shadow duration-300 hover:shadow-soft"
                >
                  <Link href={`/blog/${p.slug}`} className="flex h-full flex-col no-underline">
                    {p.coverImage && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-warm-white">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                          style={
                            p.coverPosition
                              ? { objectPosition: p.coverPosition }
                              : undefined
                          }
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">
                        {formatPostDate(p.date)}
                      </p>
                      <h2 className="mt-3 font-display text-[22px] font-medium leading-snug text-ink">
                        {p.title}
                      </h2>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-warm-gray">
                        {p.excerpt}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-colors group-hover:text-red-deep">
                        Read post
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
