import type { PageHeroData } from "@/components/ui/PageHero";

export const applicationEngineeringHeroData: PageHeroData = {
  eyebrow: "APPLICATION ENGINEERING",
  title: "Applications built around people and progress",
  description: "Create digital products and applications that are useful for the people who rely on them, robust for the teams who run them and ready to evolve as needs change.",
  cta: {
    label: "Discuss your application challenge",
    href: "/contactus",
  },
  image: {
    src: "/application-engineering/hero.png",
    alt: "Data center server racks with blue lighting",
  },
};

import { SplitContentSectionData } from "@/components/ui/SplitContentSection";

export const applicationEngineeringSplitContentData: SplitContentSectionData = {
  eyebrow: "ABOUT APPLICATION ENGINEERING",
  title: "Build what matters and make it last",
  paragraphs: [
    "Applications sit at the heart of many customer, colleague and operational experiences. Whether you are creating something new, improving a critical service or modernising an existing estate, success depends on combining clear product thinking with dependable engineering.",
    "Cordinit helps you move from opportunity to a usable, secure and maintainable application."
  ],
  image: {
    src: "/ai-automation/ai-business-value-diagram.webp",
    alt: "Application Business Value Diagram",
  },
};
