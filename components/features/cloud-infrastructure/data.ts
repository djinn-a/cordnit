import { PageHeroData } from "@/components/ui/PageHero/PageHero";

export const cloudInfrastructureHeroData: PageHeroData = {
  eyebrow: "CLOUD INFRASTRUCTURE",
  title: "Cloud and infrastructure built for change",
  description: "Create a cloud foundation that helps you move faster without losing sight of security, resilience and cost.\nCordinit helps you modernise with a clear path from strategy to everyday operation.",
  cta: {
    label: "Discuss your cloud priorities",
    href: "/contact",
  },
  image: {
    src: "/Image-v2.webp",
    alt: "Cloud Infrastructure",
  },
};

import { AiAutomationWhereWeHelpData } from "@/components/features/ai-automation/data";

export const cloudInfrastructureWhereWeHelpData: AiAutomationWhereWeHelpData = {
  eyebrow: "WHERE WE HELP",
  title: "From AI opportunity to everyday value.",
  subtitle: "We help turn promising ideas into useful, responsible solutions that work within the way your organisation operates.",
  cards: [
    {
      number: "01",
      code: "AI:01",
      category: "OPPORTUNITY",
      title: "Set the direction",
      description: "Clarify your cloud strategy, priorities and roadmap around the needs of the organisation.",
      icon: "/ai-automation/icons/Icon.svg"
    },
    {
      number: "02",
      code: "AI:02",
      category: "WORKFLOWS",
      title: "Build strong foundations",
      description: "Create secure, scalable platform capabilities with the controls and guardrails teams need to deliver confidently.",
      icon: "/ai-automation/icons/Icon (1).svg"
    },
    {
      number: "03",
      code: "AI:03",
      category: "SCALE",
      title: "Modernise what matters",
      description: "Plan and deliver migrations, upgrades and application/platform improvements with a focus on resilience and continuity.",
      icon: "/ai-automation/icons/Icon (2).svg"
    },
    {
      number: "04",
      code: "AI:04",
      category: "IMPROVEMENT",
      title: "Run and improve",
      description: "Strengthen observability, reliability, security and cost management through practical operating practices and managed support.",
      icon: "/ai-automation/icons/Icon (3).svg"
    }
  ]
};
