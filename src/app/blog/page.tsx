import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Always In The Club Foundation",
  description:
    "Discover the magic of youth empowerment through arts and mentorship with the Always In The Club Foundation.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <>
      <PageIntro
        eyebrow="Stories from the Club"
        title="Blog"
        body="Discover the magic of youth empowerment through arts and mentorship with the Always In The Club Foundation."
      />

      <section className="bg-warm-white pb-24 pt-4 sm:pb-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
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
