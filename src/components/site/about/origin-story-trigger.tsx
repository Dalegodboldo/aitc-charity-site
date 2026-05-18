"use client";

/**
 * Trigger + modal for the About page's "Where It All Began" section.
 *
 * Reuses the same CampaignModal pattern that the home page's Featured
 * Campaigns cards use — loads the pre-extracted blog post from
 * content/campaigns/where-it-all-began.json via getCampaign().
 *
 * IMPORTANT: the modal is portalled to document.body. The trigger sits
 * inside the page's Reveal wrapper, and Reveal uses a CSS transform —
 * which creates a new stacking context that would otherwise trap the
 * modal's z-index below the sticky site header. Portalling guarantees
 * the modal escapes whatever parent stacking context it lives in.
 */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { CampaignModal } from "@/components/site/campaign-modal";
import { getCampaign, type CampaignPost } from "@/lib/campaigns";

const SLUG = "where-it-all-began";

export function OriginStoryTrigger() {
  const [post, setPost] = useState<CampaignPost | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
      {mounted &&
        createPortal(
          <CampaignModal post={post} onClose={() => setPost(null)} />,
          document.body
        )}
    </>
  );
}
