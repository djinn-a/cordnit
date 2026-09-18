import type { PageDocument } from "@/lib/cms/types";
import { aiAutomationHeroData, aiAutomationSplitContentData, aiAutomationCredentialsData, aiAutomationApproachData, aiAutomationSpecialistsData, aiAutomationWhyChooseData, aiAutomationWhereWeHelpData } from "@/components/features/ai-automation/data";

export const aiAutomationPage: PageDocument = {
  slug: "ai-automation",
  title: "AI & Automation | Cordinit",
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
      _type: "aiAutomationWhereWeHelp",
      _key: "ai-automation-where-we-help",
      data: aiAutomationWhereWeHelpData
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
