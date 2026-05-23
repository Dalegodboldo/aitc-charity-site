import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { formatPostDate, getAllSlugs, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-cream">
      {/* Header */}
      <header className="pt-12 pb-10 sm:pt-20 sm:pb-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red no-underline transition-colors hover:text-red-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to All Ears
          </Link>
          <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold">
            {formatPostDate(post.date)}
            <span className="mx-2 text-warm-gray/50">·</span>
            <span className="text-warm-gray">{post.author}</span>
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[58px]">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-warm-gray sm:text-xl">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/[0.04]">
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              style={
                post.coverPosition
                  ? { objectPosition: post.coverPosition }
                  : undefined
              }
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="bg-cream pt-14 sm:pt-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div
            className="prose-aitc prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </div>

      {/* Subscribe CTA at the end of every post */}
      <div className="bg-cream pb-24 pt-12 sm:pb-32 sm:pt-16">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 rounded-2xl border border-border bg-warm-white px-7 py-6 shadow-soft-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-base leading-relaxed text-warm-gray">
            Keep up with All Ears — stories from the Club, straight to your
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
        </div>
      </div>
    </article>
  );
}
