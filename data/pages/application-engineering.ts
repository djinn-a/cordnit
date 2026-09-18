import type { PageDocument } from "@/lib/cms/types";
import { 
  applicationEngineeringHeroData,
  applicationEngineeringSplitContentData
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
    }
  ],
};
