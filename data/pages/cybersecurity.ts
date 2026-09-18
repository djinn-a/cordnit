import type { PageDocument } from "@/lib/cms/types";
import { 
  cybersecurityHeroData, 
  cybersecuritySplitContentData,
  cybersecurityCapabilitiesData,
  cybersecurityCredentialsData,
  cybersecurityApproachData,
  cybersecuritySpecialistsData
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
    },
    {
      _type: "credentialsSection",
      _key: "cybersecurity-credentials",
      data: cybersecurityCredentialsData
    },
    {
      _type: "processSection",
      _key: "cybersecurity-approach",
      data: cybersecurityApproachData
    },
    {
      _type: "splitActionCards",
      _key: "cybersecurity-specialists",
      data: cybersecuritySpecialistsData
    },
    {
      _type: "whyChooseSection",
      _key: "section-why-choose",
    }
  ],
};
