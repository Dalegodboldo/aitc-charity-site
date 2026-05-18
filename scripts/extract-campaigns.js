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
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));

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
        .replace(/\s+/g, " ")
        .trim();
      const text = h.replace(/<[^>]+>/g, "").trim();
      if (text.length > 0) blocks.push({ type: "p", html: decode(h) });
    } else if (tag === "h2" || tag === "h3" || tag === "h4") {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (text) blocks.push({ type: tag, text: decode(text) });
    } else if (tag === "img" || tag === "wow-image") {
      // Look for src in attrs or inner (Wix wow-image wraps an img)
      const all = attrs + inner;
      const srcM = all.match(/(?:data-pin-media|data-src|src)="([^"]+)"/);
      const altM = all.match(/alt="([^"]*)"/);
      if (srcM && /wixstatic|wsimg/.test(srcM[1])) {
        // Skip tiny avatars (heuristic: filter by url params or alt)
        const src = srcM[1].replace(/&amp;/g, "&");
        if (!/avatar|profile|sm_v1|w_40|w_50|w_80|w_100/i.test(src)) {
          blocks.push({ type: "img", src, alt: altM ? decode(altM[1]) : "" });
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

  // Dedupe consecutive identical image srcs (Wix often double-wraps)
  let filtered = blocks.filter((b, i) =>
    !(i > 0 && b.type === "img" && blocks[i - 1].type === "img" && blocks[i - 1].src === b.src)
  );

  // Drop metadata-y "Updated: …" and "N min read" paragraphs
  filtered = filtered.filter((b) => {
    if (b.type !== "p") return true;
    const text = b.html.replace(/<[^>]+>/g, "").trim();
    if (/^Updated:\s/.test(text)) return false;
    if (/^\d+\s*min read$/.test(text)) return false;
    if (/^Apr |^May |^Jun |^Jul |^Aug |^Sep |^Oct |^Nov |^Dec |^Jan |^Feb |^Mar /.test(text) && text.length < 40) return false;
    return true;
  });

  // Cap content images at 10 so the modal stays readable
  let imgsKept = 0;
  filtered = filtered.filter((b) => {
    if (b.type !== "img") return true;
    imgsKept += 1;
    return imgsKept <= 10;
  });

  return filtered;
}

const outDir = path.join(process.cwd(), "content", "campaigns");
fs.mkdirSync(outDir, { recursive: true });

for (const { slug, file, url } of SOURCES) {
  const html = fs.readFileSync(file, "utf8");
  const ld = jsonLd(html) || {};
  const body = extractArticleBody(html);
  const blocks = blocksFromArticle(body);

  const out = {
    slug,
    originalUrl: url,
    title: decode(ld.headline || ""),
    date: ld.datePublished || null,
    description: ld.description ? decode(ld.description) : "",
    heroImage: ld.image && ld.image.url
      ? { src: ld.image.url, alt: decode(ld.headline || "") }
      : null,
    blocks,
  };
  const outPath = path.join(outDir, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(
    `${slug.padEnd(15)} title="${out.title.slice(0, 40)}…" blocks=${blocks.length} (${blocks.filter(b => b.type === 'p').length}p, ${blocks.filter(b => b.type === 'img').length}img, ${blocks.filter(b => b.type === 'video').length}vid)`
  );
}
