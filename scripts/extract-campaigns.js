#!/usr/bin/env node
/**
 * Walk the Wix article body and emit ordered content blocks:
 *   [{ type: "p", html: "..." } | { type: "img", src, alt } | { type: "h2", text } | { type: "video", url, kind }]
 * Plus the JSON-LD summary fields (title, date, image, originalUrl).
 *
 * No external deps — regex-only, scoped to this one site's markup.
 */
const fs = require("fs");
const path = require("path");

const SOURCES = [
  { slug: "mmc36",         file: "/tmp/campaigns/mmc36.html",         url: "https://www.mickeymouseclubreunion.com/post/celebrate-mmc36-with-the-ultimate-tribute-to-the-all-new-mickey-mouse-club" },
  { slug: "disney-campus", file: "/tmp/campaigns/disney-campus.html", url: "https://www.mickeymouseclubreunion.com/post/destination-disney-imagination-campus-walt-disney-world" },
  { slug: "mmc35",         file: "/tmp/campaigns/mmc35.html",         url: "https://www.mickeymouseclubreunion.com/post/mmc35-90s-con-daytona-beach" },
  { slug: "baby-j",        file: "/tmp/campaigns/baby-j.html",        url: "https://www.mickeymouseclubreunion.com/post/whatever-happened-to-baby-j" },
  { slug: "day-of-hope",   file: "/tmp/campaigns/day-of-hope.html",   url: "https://www.mickeymouseclubreunion.com/post/en-vogue-s-rhona-bennett-hosts-changemakers-networking-night" },
  { slug: "lastrong",      file: "/tmp/campaigns/lastrong.html",      url: "https://www.mickeymouseclubreunion.com/post/doing-what-we-can-the-mmc-89-fire-relief-fund" },
  { slug: "where-it-all-began", file: "/tmp/campaigns/where-it-all-began.html", url: "https://www.mickeymouseclubreunion.com/post/where-it-all-began" },
];

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ")
    .replace(/&#010;/g, "\n")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
    // Wix sprinkles zero-width characters (BOM / ZWSP / ZWNJ / ZWJ / WJ)
    // inside words — they show up as small visual gaps like "M oe Rock".
    // U+200B-200D, U+2060 (word joiner), U+FEFF (BOM).
    .replace(/[​‌‍⁠﻿]/g, "");

function jsonLd(html) {
  const m = html.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>([^<]+)<\/script>/
  );
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

function extractArticleBody(html) {
  const m = html.match(/<article[^>]*data-hook="post"[^>]*>([\s\S]*?)<\/article>/);
  return m ? m[1] : "";
}

/**
 * Walk the article body, emit blocks in source order.
 * We only care about: <p> (paragraphs incl. inline <a>/<strong>/<em>),
 * <h2>/<h3> (headings), <img> (content images), and YouTube/Vimeo iframes.
 */
function blocksFromArticle(body) {
  const blocks = [];
  // Strip scripts/styles/nav/comments to reduce noise
  body = body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // Strip side-rail "share", "more from", "recent posts" — heuristic: cut at
  // the first <aside> or <ul data-hook="recent-post-list">
  const cutMatch = body.search(/<aside|data-hook="recent-post-list"|data-hook="related-posts"|data-hook="more-from-author"/);
  if (cutMatch > 0) body = body.slice(0, cutMatch);

  // Match in order: <p>...</p>, <h2>...</h2>, <h3>...</h3>, <img ...>, iframes
  const re =
    /<(p|h2|h3|h4|img|iframe|figure|wow-image)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/gi;
  let mm;
  while ((mm = re.exec(body)) !== null) {
    const tag = mm[1].toLowerCase();
    const attrs = mm[2] || "";
    const inner = mm[3] || "";
    if (tag === "p") {
      // Strip <span ...> wrappers and keep just inline <a>/<strong>/<em>/<br>
      let h = inner
        .replace(/<span[^>]*>/g, "")
        .replace(/<\/span>/g, "")
        .replace(/<font[^>]*>/g, "")
        .replace(/<\/font>/g, "")
        .replace(/\s+style="[^"]*"/g, "")
        .replace(/\s+class="[^"]*"/g, "")
        .replace(/\s+data-[a-z-]+="[^"]*"/g, "")
        // Strip zero-width characters BEFORE the whitespace collapse — V8's
        // \s class matches U+FEFF, which would otherwise turn the BOM into a
        // visible space mid-word ("M oe Rock").
        .replace(/[​‌‍⁠﻿]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      const text = h.replace(/<[^>]+>/g, "").trim();
      if (text.length > 0) blocks.push({ type: "p", html: decode(h) });
    } else if (tag === "h2" || tag === "h3" || tag === "h4") {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (text) blocks.push({ type: tag, text: decode(text) });
    } else if (tag === "img" || tag === "wow-image") {
      // Skip the author avatar (Wix wraps it in a wow-image with the
      // fluid-avatar-image class). We want article content images only.
      if (/fluid-avatar-image|avatar/i.test(attrs + inner)) continue;
      // Prefer the canonical data-pin-media URL, fall back to any URL-looking
      // src. Skips Wix's lazy-load src="true" flags.
      const all = attrs + inner;
      const pinM = all.match(/data-pin-media="(https?:[^"]+)"/);
      const srcM = all.match(/\bsrc="(https?:\/\/[^"]+)"/);
      const url = pinM ? pinM[1] : srcM ? srcM[1] : null;
      const altM = all.match(/alt="([^"]*)"/);
      if (url && /wixstatic|wsimg/.test(url)) {
        const src = url.replace(/&amp;/g, "&");
        if (!/avatar|profile|sm_v1|w_40|w_50|w_80|w_100/i.test(src)) {
          blocks.push({ type: "img", src, alt: altM ? decode(altM[1]) : "" });
        }
      }
    } else if (tag === "figure") {
      // Wix wraps inline media in <figure data-hook="figure-IMAGE|figure-VIDEO">.
      // Pull the underlying <img>/<iframe>/poster out of the figure body.
      if (/figure-IMAGE/i.test(attrs)) {
        // Prefer data-pin-media (Wix's canonical media URL for Pinterest),
        // fall back to the first URL-looking src in the figure body. Bare
        // src="true" attributes (Wix lazy-loading flags) get filtered out.
        const pinM = inner.match(/data-pin-media="(https?:[^"]+)"/);
        const srcM = inner.match(/\bsrc="(https?:\/\/[^"]+)"/);
        const url = pinM ? pinM[1] : srcM ? srcM[1] : null;
        const altM = inner.match(/alt="([^"]*)"/);
        if (url && /wixstatic|wsimg/.test(url)) {
          blocks.push({
            type: "img",
            src: url.replace(/&amp;/g, "&"),
            alt: altM ? decode(altM[1]) : "",
          });
        }
      } else if (/figure-VIDEO/i.test(attrs)) {
        // Check for YouTube/Vimeo embeds first, then fall back to Wix's
        // direct MP4 (used when the author uploads a video file).
        const ytM = inner.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{6,})/);
        const vmM = inner.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        const mp4M = inner.match(/<video[^>]*\bsrc="(https?:\/\/[^"]+\.mp4)"/);
        if (ytM) {
          blocks.push({ type: "video", kind: "youtube", videoId: ytM[1] });
        } else if (vmM) {
          blocks.push({ type: "video", kind: "vimeo", videoId: vmM[1] });
        } else if (mp4M) {
          blocks.push({ type: "video", kind: "mp4", src: mp4M[1] });
        }
      }
    } else if (tag === "iframe") {
      const srcM = attrs.match(/src="([^"]+)"/);
      if (srcM) {
        const src = srcM[1];
        if (/youtube\.com|youtu\.be/.test(src)) {
          const ytIdM = src.match(/(?:embed\/|v=|youtu\.be\/)([\w-]+)/);
          if (ytIdM) blocks.push({ type: "video", kind: "youtube", videoId: ytIdM[1] });
        } else if (/vimeo/.test(src)) {
          const vIdM = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
          if (vIdM) blocks.push({ type: "video", kind: "vimeo", videoId: vIdM[1] });
        }
      }
    }
  }

  // Normalize Wix CDN URLs: drop existing transforms (which often point to a
  // tiny blur_30 placeholder) and replace with one clean transform that
  // requests a real photo at a reasonable size.
  //
  //   https://static.wixstatic.com/media/<id>.<ext>/v1/fill/.../...<id>.<ext>
  //                                       ^^^^^^^^^^^^^^^^^^ stripped
  //
  // Then dedupe by the bare media path — Wix renders both an LQIP and the
  // real image in the same HTML; we want one entry per actual photo.
  const baseOf = (url) => {
    const m = url.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)/);
    return m ? m[1] : url;
  };
  const cleanWix = (url) => {
    const base = baseOf(url);
    if (base === url && !url.startsWith("https://static.wixstatic.com")) return url;
    // Square crop, 800px wide, quality 85 — good for the modal gallery
    return `${base}/v1/fill/w_800,h_800,al_c,q_85/file.jpg`;
  };

  const seenBase = new Set();
  let filtered = blocks.flatMap((b) => {
    if (b.type !== "img") return [b];
    const base = baseOf(b.src);
    if (seenBase.has(base)) return [];
    seenBase.add(base);
    return [{ ...b, src: cleanWix(b.src) }];
  });

  // Drop metadata-y "Updated: …" and "N min read" paragraphs
  filtered = filtered.filter((b) => {
    if (b.type !== "p") return true;
    const text = b.html.replace(/<[^>]+>/g, "").trim();
    if (/^Updated:\s/.test(text)) return false;
    if (/^\d+\s*min read$/.test(text)) return false;
    if (/^Apr |^May |^Jun |^Jul |^Aug |^Sep |^Oct |^Nov |^Dec |^Jan |^Feb |^Mar /.test(text) && text.length < 40) return false;
    return true;
  });

  // Mark each image as "inline" (a single image sandwiched between non-image
  // blocks — contextual to the surrounding text) vs "gallery" (one of a run
  // of 2+ consecutive images — they belong together in a grid).
  //
  // The render layer renders inline images at their position in the flow and
  // collects gallery-marked images into a single grid at the bottom.
  for (let i = 0; i < filtered.length; i++) {
    const b = filtered[i];
    if (b.type !== "img") continue;
    const prev = filtered[i - 1];
    const next = filtered[i + 1];
    const runWithNeighbor =
      (prev && prev.type === "img") || (next && next.type === "img");
    b.placement = runWithNeighbor ? "gallery" : "inline";
  }

  return filtered;
}

const outDir = path.join(process.cwd(), "content", "campaigns");
fs.mkdirSync(outDir, { recursive: true });

for (const { slug, file, url } of SOURCES) {
  const html = fs.readFileSync(file, "utf8");
  const ld = jsonLd(html) || {};
  const body = extractArticleBody(html);
  const blocks = blocksFromArticle(body);

  // Hero gets a wide, high-quality transform (the in-page hero is 16:9)
  const heroBase = (u) => {
    const m = u.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)/);
    return m ? `${m[1]}/v1/fill/w_1200,h_675,al_c,q_90/file.jpg` : u;
  };
  const out = {
    slug,
    originalUrl: url,
    title: decode(ld.headline || ""),
    date: ld.datePublished || null,
    description: ld.description ? decode(ld.description) : "",
    heroImage: ld.image && ld.image.url
      ? { src: heroBase(ld.image.url), alt: decode(ld.headline || "") }
      : null,
    blocks,
  };
  const outPath = path.join(outDir, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(
    `${slug.padEnd(15)} title="${out.title.slice(0, 40)}…" blocks=${blocks.length} (${blocks.filter(b => b.type === 'p').length}p, ${blocks.filter(b => b.type === 'img').length}img, ${blocks.filter(b => b.type === 'video').length}vid)`
  );
}
