import type { PageDocument } from "@/lib/cms/types";
import { cloudInfrastructureHeroData, cloudInfrastructureWhereWeHelpData } from "@/components/features/cloud-infrastructure/data";
import { cybersecurityCredentialsData } from "@/components/features/cybersecurity/data";

export const cloudInfrastructurePage: PageDocument = {
  slug: "cloud-infrastructure",
  title: "Cloud Infrastructure",
  layout: "default",
  seo: {
    title: "Cloud Infrastructure | Cordinit",
    description: "Cloud and infrastructure built for change.",
  },
  sections: [
    {
      _type: "cloudInfrastructureHero",
      _key: "cloud-infrastructure-hero",
      data: cloudInfrastructureHeroData,
    },
    {
      _type: "credentialsSection",
      _key: "cloud-infrastructure-credentials",
      data: cybersecurityCredentialsData
    },
    {
      _type: "aiAutomationWhereWeHelp",
      _key: "cloud-infrastructure-where-we-help",
      data: cloudInfrastructureWhereWeHelpData,
    }
  ],
};
