import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ---- TEMPORARY: optimization disabled (over the Vercel quota) -----
    // We exceeded Vercel's free-tier image-optimization transformation
    // cap, so /_next/image returns HTTP 402 for any variant it hasn't
    // already cached — which shows up as broken images sitewide. Setting
    // `unoptimized: true` makes next/image serve the original files
    // directly (no optimizer, no transformations, nothing to 402), so
    // every image renders. Trade-off: larger downloads since images
    // aren't resized/recompressed.
    //
    // REVERT after the transformation quota resets (next Vercel billing
    // cycle): set `unoptimized: false` (or remove it) to restore the
    // optimized pipeline below. Resizing the heaviest source images
    // (esp. /public/images/gallery, avg ~2MB) first will keep bandwidth
    // reasonable while unoptimized.
    unoptimized: true,
    // The settings below only take effect once `unoptimized` is false
    // again. Single format (AVIF doubles transformations); a trimmed set
    // of responsive widths; and a long cache so each variant is built
    // once and reused.
    formats: ["image/webp"],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [64, 256],
    minimumCacheTTL: 2678400,
    // Allow blog post images from the legacy Wix-hosted mickeymouseclubreunion.com
    // CDN. Used by the campaign-modal previews (content/campaigns/*.json).
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  // The /photo-gallery page reads its file list via fs.readdirSync on
  // public/images/gallery/. Next.js's file tracer follows that and
  // bundles the entire folder into the serverless function for the
  // route — which pushed the function past Vercel's 300MB limit once
  // the gallery grew to ~500MB. The photos are served as static
  // assets from /public/ directly, so the function bundle does not
  // need them. This exclusion keeps the function lean.
  outputFileTracingExcludes: {
    "/photo-gallery": ["public/images/gallery/**/*"],
  },
  async redirects() {
    // Legacy URLs from the old GoDaddy blog. Every post was migrated
    // with its original slug intact (see scripts/migrate-blog.mjs and
    // content/blog/*.md), so a single catch-all per pattern routes any
    // bookmark or inbound link to its new home at /blog/<slug>.
    return [
      {
        source: "/blog/f/:slug",
        destination: "/blog/:slug",
        statusCode: 301,
      },
      {
        source: "/f/:slug",
        destination: "/blog/:slug",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
