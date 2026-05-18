/**
 * Migrate the 12 listed posts off alwaysintheclub.org (GoDaddy site, JS-rendered)
 * into ../content/blog/*.md, downloading their images into ../public/images/blog/.
 *
 * Renders each page with Playwright, then walks the post container DOM
 * and emits Markdown so the body keeps its paragraphs, headings, links,
 * lists, blockquotes, bold/italic, and inline images.
 *
 * Run: node scripts/migrate-blog.mjs
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const URLS = [
  "https://alwaysintheclub.org/blog/f/our-mickey-friends-collection-feat-the-leader-of-the-club",
  "https://alwaysintheclub.org/blog/f/whatever-happened-to-baby-j-feat-jodie-sweetin-drew-seeley",
  "https://alwaysintheclub.org/blog/f/unlocking-creativity-at-disney-parks",
  "https://alwaysintheclub.org/blog/f/a-whole-new-world-of-possibilities-breaking-creative-barriers",
  "https://alwaysintheclub.org/blog/f/the-circle-of-mentorship-building-your-creative-pride",
  "https://alwaysintheclub.org/blog/f/launching-impact-academy-plus-free-book-giveaway",
  "https://alwaysintheclub.org/blog/f/mickey-mouse-club-a-legacy-of-stars-impact-youth-empowerment",
  "https://alwaysintheclub.org/blog/f/empowering-youth-through-mentoring-arts-education",
  "https://alwaysintheclub.org/blog/f/disney-imagination-campus---where-magic-meets-education",
  "https://alwaysintheclub.org/blog/f/zootopia-your-dream-role-in-entertainment-awaits",
  "https://alwaysintheclub.org/blog/f/inside-out-navigating-the-emotions-of-creative-growth",
  "https://alwaysintheclub.org/blog/f/beyond-your-reef-finding-your-creative-voice-with-aitcf",
];

const REPO = path.resolve(new URL("..", import.meta.url).pathname);
const BLOG_DIR = path.join(REPO, "content", "blog");
const IMG_DIR = path.join(REPO, "public", "images", "blog");

await mkdir(BLOG_DIR, { recursive: true });
await mkdir(IMG_DIR, { recursive: true });

const slugFromUrl = (u) => u.replace(/\/$/, "").split("/").pop();

// ---------- image helpers ----------

/** Strip GoDaddy isteam transforms (`/:/cr=...,rs=...`) to get the source. */
function originalImageUrl(src) {
  if (!src) return src;
  // wsimg URLs look like https://img1.wsimg.com/isteam/ip/<id>/<file>/:/cr=...
  const m = src.match(/^(https?:\/\/[^/]+\/isteam\/ip\/[^/]+\/[^/]+)/);
  if (m) return m[1];
  return src;
}

function imageFilename(srcUrl) {
  const original = originalImageUrl(srcUrl);
  // Pull the file name out and decode percent-encoding.
  let name = decodeURIComponent(original.split("/").pop() || "image");
  // Normalize to safe lowercase
  name = name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
  // Guarantee a stable, collision-free name by hashing the original URL.
  const hash = crypto.createHash("sha1").update(original).digest("hex").slice(0, 8);
  const ext = (name.match(/\.(png|jpe?g|webp|gif|svg)$/) || [, "jpg"])[1];
  const stem = name.replace(/\.(png|jpe?g|webp|gif|svg)$/, "") || "image";
  return `${stem}-${hash}.${ext}`;
}

const downloadedCache = new Map();
async function downloadImage(srcUrl) {
  if (!srcUrl) return null;
  if (downloadedCache.has(srcUrl)) return downloadedCache.get(srcUrl);
  const original = originalImageUrl(srcUrl);
  const filename = imageFilename(srcUrl);
  const outPath = path.join(IMG_DIR, filename);
  if (!existsSync(outPath)) {
    const res = await fetch(original);
    if (!res.ok) throw new Error(`fetch ${original} → ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
  }
  const publicPath = `/images/blog/${filename}`;
  downloadedCache.set(srcUrl, publicPath);
  return publicPath;
}

// ---------- DOM → Markdown ----------

/**
 * Convert a DOM node (passed across via page.evaluate as a normalized
 * JSON tree) into Markdown. We do extraction inside the browser first so
 * we get cheap access to computed text, then convert in Node.
 */
const TREE_EVAL = () => {
  // Walk the post container and emit a normalized JSON tree.
  // We collapse spans and strip empty wrappers so the markdown emitter
  // doesn't have to.
  function clean(node) {
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent || "");
      // Drop pure-whitespace text nodes between blocks; preserve content
      // whitespace.
      if (!t.trim()) return { type: "text", text: "" };
      return { type: "text", text: t };
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const tag = node.tagName.toLowerCase();
    if (tag === "script" || tag === "style") return null;

    const children = [...node.childNodes].map(clean).filter(Boolean);

    if (tag === "img") {
      // Prefer the resolved .src so protocol-relative URLs become absolute.
      return {
        type: "img",
        src: node.src || node.getAttribute("src") || "",
        alt: node.getAttribute("alt") || "",
      };
    }
    if (tag === "a") {
      return {
        type: "a",
        href: node.getAttribute("href") || "",
        children,
      };
    }
    if (tag === "br") return { type: "br" };
    if (tag === "hr") return { type: "hr" };

    return { type: "el", tag, children };
  }

  // Find the post inside <main>.
  const main = document.querySelector("main");
  if (!main) return { error: "no main" };

  // Title sits in an <h3> (post heading); the breadcrumb is an <a>All Posts</a>
  // immediately preceding it.
  const allPostsLink = [...main.querySelectorAll("a")].find(a =>
    /^all posts$/i.test((a.textContent || "").trim())
  );
  const titleEl = main.querySelector("h3");
  const title = titleEl?.textContent?.trim() || "";

  // The meta line (<div> with date | categories) is the sibling div right
  // after the title's parent block.
  let metaText = "";
  let dateText = "";
  let categoriesText = "";
  // Find the date by scanning spans that look like a US-formatted date.
  const dateRe = /^[A-Z][a-z]+ \d{1,2}, \d{4}$/;
  for (const span of main.querySelectorAll("span")) {
    const t = (span.textContent || "").trim();
    if (dateRe.test(t)) {
      dateText = t;
      const parent = span.parentElement;
      if (parent) {
        metaText = (parent.textContent || "").trim();
        const sibs = [...parent.querySelectorAll("span")];
        const after = sibs.slice(sibs.indexOf(span) + 1);
        const cats = after
          .map(s => (s.textContent || "").trim())
          .filter(s => s && s !== "|");
        categoriesText = cats.join(", ");
      }
      break;
    }
  }

  // Body container: the next sibling block after the meta line.
  // Heuristic: the meta div's parent has a sibling div containing the post.
  let bodyEl = null;
  if (dateText) {
    // Find the deepest ancestor of the date span that is a direct child of main.
    let cur = main.querySelector("span");
    cur = [...main.querySelectorAll("span")].find(s => (s.textContent || "").trim() === dateText) || null;
    if (cur) {
      let block = cur;
      while (block && block.parentElement && block.parentElement !== main) {
        block = block.parentElement;
      }
      // The next block is the body.
      bodyEl = block?.nextElementSibling || null;
    }
  }

  // Fallback: the largest child div of main, excluding the breadcrumb/title/meta.
  if (!bodyEl) {
    const candidates = [...main.children];
    bodyEl = candidates
      .filter(c => c.tagName === "DIV")
      .sort((a, b) => (b.textContent?.length || 0) - (a.textContent?.length || 0))[0];
  }

  const tree = bodyEl ? clean(bodyEl) : null;

  const ogImage = document.querySelector('meta[property="og:image"]')?.content || "";
  const metaAuthor = document.querySelector('meta[name="author"]')?.content || "";
  const metaDesc = document.querySelector('meta[name="description"]')?.content || "";

  return {
    title,
    dateText,
    categoriesText,
    metaText,
    tree,
    ogImage,
    metaAuthor,
    metaDesc,
  };
};

// ---------- node → markdown ----------

function textOf(node) {
  if (!node) return "";
  if (node.type === "text") return node.text;
  if (node.type === "br") return "\n";
  if (node.type === "a" || node.type === "el") {
    return (node.children || []).map(textOf).join("");
  }
  return "";
}

function inline(node, imageMap) {
  if (!node) return "";
  if (node.type === "text") {
    // Escape markdown specials only minimally; this content is plain prose.
    return node.text;
  }
  if (node.type === "br") return "  \n";
  if (node.type === "img") {
    const url = imageMap.get(node.src) || node.src;
    return `![${(node.alt || "").replace(/[\[\]]/g, "")}](${url})`;
  }
  if (node.type === "a") {
    const inner = (node.children || []).map(c => inline(c, imageMap)).join("");
    const href = node.href || "";
    if (!href || href === "#") return inner;
    return `[${inner}](${href})`;
  }
  if (node.type === "el") {
    const inner = (node.children || []).map(c => inline(c, imageMap)).join("");
    switch (node.tag) {
      case "strong":
      case "b":
        return inner.trim() ? `**${inner}**` : "";
      case "em":
      case "i":
        return inner.trim() ? `*${inner}*` : "";
      case "u":
      case "span":
      case "small":
      case "font":
        return inner;
      case "sup": return `^${inner}`;
      case "sub": return `~${inner}`;
      default:
        return inner;
    }
  }
  return "";
}

function collectImages(node, out = []) {
  if (!node) return out;
  if (node.type === "img") out.push(node.src);
  if (node.children) for (const c of node.children) collectImages(c, out);
  return out;
}

function block(node, imageMap, depth = 0) {
  if (!node) return "";
  if (node.type === "text") {
    const t = node.text.trim();
    return t ? t + "\n\n" : "";
  }
  if (node.type === "img") {
    const url = imageMap.get(node.src) || node.src;
    return `![${node.alt || ""}](${url})\n\n`;
  }
  if (node.type === "a") {
    // Standalone link → render as paragraph
    return inline(node, imageMap).trim() + "\n\n";
  }
  if (node.type === "br") return "";
  if (node.type === "hr") return "---\n\n";
  if (node.type !== "el") return "";

  const tag = node.tag;
  const renderChildren = () => (node.children || []).map(c => block(c, imageMap, depth + 1)).join("");

  switch (tag) {
    case "h1": return `# ${inline({ type: "el", tag: "span", children: node.children }, imageMap).trim()}\n\n`;
    case "h2": return `## ${inline({ type: "el", tag: "span", children: node.children }, imageMap).trim()}\n\n`;
    case "h3": return `### ${inline({ type: "el", tag: "span", children: node.children }, imageMap).trim()}\n\n`;
    case "h4": return `#### ${inline({ type: "el", tag: "span", children: node.children }, imageMap).trim()}\n\n`;
    case "h5": case "h6":
      return `##### ${inline({ type: "el", tag: "span", children: node.children }, imageMap).trim()}\n\n`;

    case "p": {
      // If a paragraph wraps only an image / figure, render the image directly.
      const text = inline(node, imageMap).trim();
      const innerImgs = collectImages(node);
      if (!text && innerImgs.length === 0) return "";
      // If text is empty but there is an img → emit image only.
      if (!text && innerImgs.length > 0) {
        return innerImgs.map(src => `![](${imageMap.get(src) || src})`).join("\n\n") + "\n\n";
      }
      return text + "\n\n";
    }

    case "blockquote": {
      const text = (node.children || []).map(c => block(c, imageMap, depth + 1)).join("").trim();
      return text.split("\n").map(l => l ? `> ${l}` : ">").join("\n") + "\n\n";
    }

    case "ul":
    case "ol": {
      const items = (node.children || []).filter(c => c.type === "el" && c.tag === "li");
      const out = items.map((li, i) => {
        const inner = inline(li, imageMap).trim().replace(/\n/g, " ");
        const marker = tag === "ul" ? "-" : `${i + 1}.`;
        return `${marker} ${inner}`;
      }).join("\n");
      return out + "\n\n";
    }

    case "figure":
    case "figcaption":
    case "picture":
      return renderChildren();

    case "div":
    case "section":
    case "article":
    case "main":
    case "header":
    case "footer":
    case "aside":
      // Generic wrappers: descend
      return renderChildren();

    default:
      return renderChildren();
  }
}

// ---------- date / excerpt / frontmatter ----------

function parseIsoDate(s) {
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.valueOf())) return null;
  return d.toISOString().slice(0, 10);
}

function decodeEntities(s) {
  if (!s) return s;
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function makeExcerpt(md) {
  // First non-empty paragraph (excluding image-only lines).
  const lines = md.split("\n");
  let para = "";
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (para) break;
      continue;
    }
    if (/^!\[/.test(t) || /^#/.test(t) || /^>/.test(t) || /^[-*\d]/.test(t)) {
      if (para) break;
      continue;
    }
    para += (para ? " " : "") + t;
  }
  // Strip markdown formatting
  const plain = para
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*?([^*]+)\*\*?/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 200) return plain;
  return plain.slice(0, 197).replace(/[\s,;:.]+$/, "") + "…";
}

function yamlString(s) {
  // Double-quote, escape backslash and double-quote.
  return `"${(s || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// ---------- main loop ----------

const results = [];
const missingDates = [];

const browser = await chromium.launch();
try {
  for (const url of URLS) {
    const slug = slugFromUrl(url);
    console.error(`\n→ ${slug}`);
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
      await page.waitForSelector("main h3", { timeout: 30_000 }).catch(() => {});
      // Scroll to bottom to trigger lazy images
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const data = await page.evaluate(TREE_EVAL);

      if (!data || !data.title) {
        console.error(`  ! could not extract title for ${url}`);
        continue;
      }

      // Download images: walk the tree, plus the og:image as cover.
      const srcs = new Set(collectImages(data.tree));
      const imageMap = new Map();
      for (const src of srcs) {
        try {
          const local = await downloadImage(src);
          if (local) imageMap.set(src, local);
        } catch (e) {
          console.error(`  ! image failed: ${src} :: ${e.message}`);
        }
      }
      // Cover: prefer the og:image; fall back to first inline image.
      let coverLocal = null;
      const coverSrc = data.ogImage || [...srcs][0] || null;
      if (coverSrc) {
        try {
          coverLocal = await downloadImage(coverSrc);
        } catch (e) {
          console.error(`  ! cover image failed: ${coverSrc} :: ${e.message}`);
        }
      }

      let markdown = block(data.tree, imageMap).replace(/\n{3,}/g, "\n\n").trim();

      // If the first inline image is the cover, drop it from the body — the
      // post template already renders coverImage above the body.
      if (coverLocal) {
        const firstImgRe = new RegExp(`^!\\[[^\\]]*\\]\\(${coverLocal.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\)\\n+`);
        markdown = markdown.replace(firstImgRe, "");
      }

      const dateIso = parseIsoDate(data.dateText);
      if (!dateIso) {
        missingDates.push({ slug, url, dateText: data.dateText });
      }

      const excerpt =
        decodeEntities(data.metaDesc?.trim() || "") || makeExcerpt(markdown);

      const frontmatter = [
        "---",
        `title: ${yamlString(data.title)}`,
        `date: ${yamlString(dateIso || "")}`,
        `excerpt: ${yamlString(excerpt)}`,
        ...(coverLocal ? [`coverImage: ${yamlString(coverLocal)}`] : []),
        `author: ${yamlString(data.metaAuthor || "Always In The Club Foundation")}`,
        "---",
        "",
      ].join("\n");

      const outPath = path.join(BLOG_DIR, `${slug}.md`);
      await writeFile(outPath, frontmatter + markdown + "\n", "utf8");
      console.error(`  ✓ wrote ${path.relative(REPO, outPath)} (${markdown.length} chars, ${srcs.size} imgs)`);
      results.push({ slug, dateText: data.dateText, dateIso, title: data.title });
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

console.error("\n=== summary ===");
console.error(JSON.stringify({ results, missingDates }, null, 2));
