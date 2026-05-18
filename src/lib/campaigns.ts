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

export type CampaignBlock =
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "img"; src: string; alt: string }
  | { type: "video"; kind: "youtube" | "vimeo"; videoId: string };

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
};

export function getCampaign(slug: string): CampaignPost | null {
  return all[slug] ?? null;
}
