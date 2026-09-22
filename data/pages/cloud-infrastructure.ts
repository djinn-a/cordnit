import type { PageDocument } from "@/lib/cms/types";
import { cloudInfrastructureHeroData, cloudInfrastructureSplitContentData, cloudInfrastructureWhereWeHelpData, cloudInfrastructureApproachData, cloudInfrastructureSpecialistsData } from "@/components/features/cloud-infrastructure/data";
import { cybersecurityCredentialsData, cybersecurityWhyChooseData } from "@/components/features/cybersecurity/data";

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
      _type: "splitContent",
      _key: "cloud-infrastructure-split-content",
      data: cloudInfrastructureSplitContentData
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
    },
    {
      _type: "processSection",
      _key: "cloud-infrastructure-process",
      data: cloudInfrastructureApproachData
    },
    {
      _type: "splitActionCards",
      _key: "cloud-infrastructure-specialists",
      data: cloudInfrastructureSpecialistsData
    },
    {
      _type: "whyChoose",
      _key: "cloud-infrastructure-why-choose",
      data: cybersecurityWhyChooseData
    }
  ],
};
