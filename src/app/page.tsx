import { Hero } from "@/components/site/home/hero";
import { WhoWeAre } from "@/components/site/home/who-we-are";
import { ImpactStats } from "@/components/site/home/impact-stats";
import { OurMission } from "@/components/site/home/our-mission";
import { FeaturedCampaigns } from "@/components/site/home/featured-campaigns";
import { WaysToHelp } from "@/components/site/home/ways-to-help";
import { PlantATree } from "@/components/site/home/plant-a-tree";
import { Newsletter } from "@/components/site/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <ImpactStats />
      <OurMission />
      <FeaturedCampaigns />
      <WaysToHelp />
      <PlantATree />
      <Newsletter />
    </>
  );
}
