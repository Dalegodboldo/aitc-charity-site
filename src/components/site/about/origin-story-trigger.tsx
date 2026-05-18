"use client";

/**
 * Trigger + modal for the About page's "Where It All Began" section.
 *
 * Reuses the same CampaignModal pattern that the home page's Featured
 * Campaigns cards use — loads the pre-extracted blog post from
 * content/campaigns/where-it-all-began.json via getCampaign().
 */
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CampaignModal } from "@/components/site/campaign-modal";
import { getCampaign, type CampaignPost } from "@/lib/campaigns";

const SLUG = "where-it-all-began";

export function OriginStoryTrigger() {
  const [post, setPost] = useState<CampaignPost | null>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          const p = getCampaign(SLUG);
          if (p) setPost(p);
        }}
        aria-haspopup="dialog"
        className="group inline-flex items-center gap-1.5 text-base font-semibold text-red transition-colors hover:text-red-deep"
      >
        Read the full origin story
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
          aria-hidden
        />
      </button>
      <CampaignModal post={post} onClose={() => setPost(null)} />
    </>
  );
}
