import type { PageDocument } from "@/lib/cms/types";
import { 
  applicationEngineeringHeroData,
  applicationEngineeringSplitContentData,
  applicationEngineeringCredentialsData,
  applicationEngineeringWhereWeHelpData,
  applicationEngineeringApproachData,
  applicationEngineeringSpecialistsData,
  applicationEngineeringWhyChooseData
} from "@/components/features/application-engineering/data";

export const applicationEngineeringPage: PageDocument = {
  slug: "application-engineering",
  title: "Application Engineering",
  layout: "default",
  seo: {
    title: "Application Engineering | Cordinit",
    description: "Applications built around people and progress.",
  },
  sections: [
    {
      _type: "applicationEngineeringHero",
      _key: "application-engineering-hero",
      data: applicationEngineeringHeroData
    },
    {
      _type: "applicationEngineeringSplitContent",
      _key: "application-engineering-split-content",
      data: applicationEngineeringSplitContentData
    },
    {
      _type: "applicationEngineeringCredentials",
      _key: "application-engineering-credentials",
      data: applicationEngineeringCredentialsData
    },
    {
      _type: "applicationEngineeringWhereWeHelp",
      _key: "application-engineering-where-we-help",
      data: applicationEngineeringWhereWeHelpData
    },
    {
      _type: "applicationEngineeringApproach",
      _key: "application-engineering-approach",
      data: applicationEngineeringApproachData
    },
    {
      _type: "applicationEngineeringSpecialists",
      _key: "application-engineering-specialists",
      data: applicationEngineeringSpecialistsData
    },
    {
      _type: "applicationEngineeringWhyChoose",
      _key: "application-engineering-why-choose",
      data: applicationEngineeringWhyChooseData
    }
  ],
};
