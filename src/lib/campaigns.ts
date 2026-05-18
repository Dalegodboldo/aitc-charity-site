/**
 * Static loader for the pre-extracted campaign blog posts.
 *
 * Each JSON file in content/campaigns/ is the result of running
 * scripts/extract-campaigns.js once: it pulls a story off the legacy
 * mickeymouseclubreunion.com blog and saves title/date/heroImage and
 * an ordered list of content blocks (p / h2 / img / video).
 */
import babyJ from "../../content/campaigns/baby-j.json";
import dayOfHope from "../../content/campaigns/day-of-hope.json";
import disneyCampus from "../../content/campaigns/disney-campus.json";
import laStrong from "../../content/campaigns/lastrong.json";
import mmc35 from "../../content/campaigns/mmc35.json";
import mmc36 from "../../content/campaigns/mmc36.json";
import whereItAllBegan from "../../content/campaigns/where-it-all-began.json";

export type CampaignBlock =
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | {
      type: "img";
      src: string;
      alt: string;
      placement?: "inline" | "gallery";
      /**
       * Optional display hint:
       *  - "logo" → render contained on a light, untinted tile (no
       *    square crop, no warm-white tile, no zoom hover) so brand
       *    marks with transparent backgrounds sit cleanly.
       */
      treatment?: "logo";
      /** Short text shown under the image (e.g. board-member name). */
      caption?: string;
    }
  | { type: "video"; kind: "youtube" | "vimeo"; videoId: string }
  | { type: "video"; kind: "mp4"; src: string }
  /** Featured document: full-size image (no crop, not expandable) + CTA. */
  | { type: "report"; src: string; alt: string; href: string; label: string };

export type CampaignPost = {
  slug: string;
  title: string;
  date: string | null;
  description: string;
  originalUrl: string;
  heroImage: { src: string; alt: string } | null;
  blocks: CampaignBlock[];
};

const all: Record<string, CampaignPost> = {
  mmc36: mmc36 as CampaignPost,
  "disney-campus": disneyCampus as CampaignPost,
  mmc35: mmc35 as CampaignPost,
  "baby-j": babyJ as CampaignPost,
  "day-of-hope": dayOfHope as CampaignPost,
  lastrong: laStrong as CampaignPost,
  "where-it-all-began": whereItAllBegan as CampaignPost,
};

export function getCampaign(slug: string): CampaignPost | null {
  return all[slug] ?? null;
}
