import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow blog post images from the legacy Wix-hosted mickeymouseclubreunion.com
    // CDN. Used by the campaign-modal previews (content/campaigns/*.json).
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
