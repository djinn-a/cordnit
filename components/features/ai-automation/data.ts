import type { PageHeroData } from "@/components/ui/PageHero";

export const aiAutomationHeroData: PageHeroData = {
  eyebrow: "AI & AUTOMATION",
  title: "AI and automation with clear purpose",
  description:
    "Make AI and automation useful where it matters most. Cordinit helps you identify the right opportunities, build them into real workflows and apply the governance needed to scale with confidence.",
  cta: {
    label: "Explore your AI opportunity",
    href: "/contactus",
  },
  image: {
    src: "/ai-automation/hero.jpg",
    alt: "AI and Automation Data Center",
  },
};

import { SplitContentSectionData } from "@/components/ui/SplitContentSection";

export const aiAutomationSplitContentData: SplitContentSectionData = {
  eyebrow: "ABOUT AI & AUTOMATION",
  title: "Move beyond experimentation",
  paragraphs: [
    "The question is not whether AI can do something. It is whether it can improve a meaningful outcome — for your customers, colleagues or operations — in a way that is responsible, reliable and ready to use.",
    "We help you focus on the opportunities worth pursuing, from practical automation of everyday work to AI-enabled experiences and decision support."
  ],
  image: {
    src: "/ai-automation/ai-business-value-diagram.jpg",
    alt: "AI Business Value Diagram",
  }
};
