import type { PageDocument } from "@/lib/cms/types";
import { 
  cybersecurityHeroData, 
  cybersecuritySplitContentData,
  cybersecurityCapabilitiesData
} from "@/components/features/cybersecurity/data";

export const cybersecurityPage: PageDocument = {
  slug: "cybersecurity",
  title: "Cybersecurity",
  layout: "default",
  seo: {
    title: "Cybersecurity | Cordinit",
    description: "Cybersecurity that enables confident change.",
  },
  sections: [
    { 
      _type: "cybersecurityHero", 
      _key: "cybersecurity-hero",
      data: cybersecurityHeroData
    },
    { 
      _type: "cybersecuritySplitContent",
      _key: "cybersecurity-split-content",
      data: cybersecuritySplitContentData
    },
    {
      _type: "cardGridSection",
      _key: "cybersecurity-capabilities",
      data: cybersecurityCapabilitiesData
    }
  ],
};
