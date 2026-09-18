import type { PageDocument } from "@/lib/cms/types";
import { aiAutomationHeroData, aiAutomationSplitContentData, aiAutomationCredentialsData, aiAutomationApproachData, aiAutomationSpecialistsData, aiAutomationWhyChooseData } from "@/components/features/ai-automation/data";

export const aiAutomationPage: PageDocument = {
  slug: "ai-automation",
  layout: "default",
  seo: {
    title: "AI & Automation | Cordinit",
    description: "Make AI and automation useful where it matters most.",
  },
  sections: [
    { 
      _type: "aiAutomationHero", 
      _key: "ai-automation-hero",
      data: aiAutomationHeroData
    },
    {
      _type: "aiAutomationSplitContent",
      _key: "ai-automation-split-content",
      data: aiAutomationSplitContentData
    },
    {
      _type: "aiAutomationCredentials",
      _key: "ai-automation-credentials",
      data: aiAutomationCredentialsData
    },
    {
      _type: "aiAutomationApproach",
      _key: "ai-automation-approach",
      data: aiAutomationApproachData
    },
    {
      _type: "aiAutomationSpecialists",
      _key: "ai-automation-specialists",
      data: aiAutomationSpecialistsData
    },
    {
      _type: "aiAutomationWhyChoose",
      _key: "ai-automation-why-choose",
      data: aiAutomationWhyChooseData
    }
  ],
};
