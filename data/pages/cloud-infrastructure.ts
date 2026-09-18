import type { PageDocument } from "@/lib/cms/types";
import { 
  cloudInfrastructureHeroData,
  cloudInfrastructureSplitContentData,
  cloudInfrastructureCredentialsData,
  cloudInfrastructureApproachData,
  cloudInfrastructureWhyChooseData,
  cloudInfrastructureSpecialistsData,
  cloudInfrastructureWhereWeHelpData
} from "@/components/features/cloud-infrastructure/data";

export const cloudInfrastructurePage: PageDocument = {
  slug: "cloud-infrastructure",
  title: "Cloud Infrastructure",
  layout: "default",
  seo: {
    title: "Cloud Infrastructure | Cordinit",
    description: "Cloud infrastructure that enables confident change.",
  },
  sections: [
    { 
      _type: "cloudInfrastructureHero", 
      _key: "cloud-infrastructure-hero",
      data: cloudInfrastructureHeroData
    },
    {
      _type: "cloudInfrastructureSplitContent",
      _key: "cloud-infrastructure-split-content",
      data: cloudInfrastructureSplitContentData
    },
    {
      _type: "cloudInfrastructureCredentials",
      _key: "cloud-infrastructure-credentials",
      data: cloudInfrastructureCredentialsData
    },
    {
      _type: "cloudInfrastructureWhereWeHelp",
      _key: "cloud-infrastructure-where-we-help",
      data: cloudInfrastructureWhereWeHelpData
    },
    {
      _type: "cloudInfrastructureApproach",
      _key: "cloud-infrastructure-approach",
      data: cloudInfrastructureApproachData
    },
    {
      _type: "cloudInfrastructureSpecialists",
      _key: "cloud-infrastructure-specialists",
      data: cloudInfrastructureSpecialistsData
    },
    {
      _type: "cloudInfrastructureWhyChoose",
      _key: "cloud-infrastructure-why-choose",
      data: cloudInfrastructureWhyChooseData
    }
  ],
};
