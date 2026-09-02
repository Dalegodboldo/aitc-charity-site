import type { NextRequest } from "next/server";

/**
 * Same-origin proxy for sender.net Mouseketeer Roundup campaign
 * pages. We fetch the share URL, strip the literal personalization
 * placeholder ("Hi {{ firstname }},") that sender.net renders for
 * shared previews, and serve the cleaned HTML so the iframe in the
 * Roundup modal can show the issue without that leftover greeting.
 *
 * The original share URLs are still used for the modal's "Open in
 * new tab" escape hatch.
 */
const campaignUrls: Record<string, string> = {
  august:
    "https://share.sender.net/campaigns/hrOg/mouseketeer-roundup-august-special-edition",
  july: "https://share.sender.net/campaigns/gLgN/mouseketeer-roundup-july",
  june: "https://share.sender.net/campaigns/go3e/mouseketeer-roundup-june",
  may: "https://share.sender.net/campaigns/fXxG/mouseketeer-roundup-may",
  april: "https://share.sender.net/campaigns/fiqk/mouseketeer-roundup-april",
  march: "https://share.sender.net/campaigns/d7pe/mouseketeer-roundup-march",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = campaignUrls[slug];
  if (!url) return new Response("Not Found", { status: 404 });

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      // Cache the fetched HTML for an hour at the edge so we are not
      // hitting sender.net on every modal open.
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (AITCF roundup proxy)" },
    });
  } catch {
    return new Response("Upstream error", { status: 502 });
  }
  if (!upstream.ok) return new Response("Upstream error", { status: 502 });

  let html = await upstream.text();

  // Strip "Hi {{ firstname }}," (with tolerance for whitespace and
  // case variations) and any bare {{ firstname }} occurrences.
  html = html.replace(/Hi\s*\{\{\s*firstname\s*\}\}\s*,?/gi, "");
  html = html.replace(/\{\{\s*firstname\s*\}\}/gi, "");
  // sender.net's share-URL preview already substitutes
  // {{ firstname }} server-side with an empty <span></span>, leaving
  // a literal "Hi ," paragraph that the rules above can't catch.
  // Remove the whole greeting paragraph in that form.
  html = html.replace(
    /<p[^>]*>\s*Hi\s*(?:<span[^>]*>\s*<\/span>\s*)?,?\s*<\/p>/gi,
    "",
  );

  // Defensive: strip <script> tags. Email HTML almost never contains
  // them, but the iframe still gives us isolation either way.
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600",
    },
  });
}
