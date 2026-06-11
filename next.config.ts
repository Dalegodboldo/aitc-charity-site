import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ---- Image-optimization budget controls --------------------------
    // Vercel's free tier caps optimization "transformations" (one per
    // unique source-image + width + format). These settings minimize how
    // many we generate.
    //
    // Single output format: AVIF roughly DOUBLES transformations because
    // Next emits a separate optimized file per format. WebP-only halves
    // that while staying small and well-supported.
    formats: ["image/webp"],
    // Fewer responsive widths = fewer transformations per image.
    // deviceSizes drives fill / `sizes`-based responsive images;
    // imageSizes drives fixed width/height images.
    deviceSizes: [640, 1080, 1920],
    imageSizes: [64, 256],
    // Keep each optimized image cached as long as possible (31 days) so a
    // given asset is transformed once and reused, not re-generated.
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
