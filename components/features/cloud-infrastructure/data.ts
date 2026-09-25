import { ROUTES } from "@/lib/config/routes";
import { PageHeroData } from "@/components/ui/PageHero/PageHero";

export const cloudInfrastructureHeroData: PageHeroData = {
  eyebrow: "CLOUD INFRASTRUCTURE",
  title: "Cloud and infrastructure built for change",
  description: "Create a cloud foundation that helps you move faster without losing sight of security, resilience and cost.\nCordinit helps you modernise with a clear path from strategy to everyday operation.",
  cta: {
    label: "Discuss your cloud priorities",
    href: ROUTES.contact,
  },
  image: {
    src: "/Image-v2.webp",
    alt: "Cloud Infrastructure",
  },
};

import { SplitContentSectionData } from "@/components/ui/SplitContentSection";

export const cloudInfrastructureSplitContentData: SplitContentSectionData = {
  eyebrow: "ABOUT CLOUD INFRASTRUCTURE",
  title: "Make the cloud a platform for progress",
  paragraphs: [
    "Cloud transformation is more than moving workloads. It is an opportunity to improve how technology is designed, delivered, secured and managed while making sure the foundations are ready for what comes next.",
    "We help you make deliberate choices about architecture, platforms, operations and governance so that cloud investment supports real business change."
  ],
  image: {
    src: "/ai-automation/ai-business-value-diagram.webp",
    alt: "Cloud Infrastructure Business Value Diagram",
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

import { ProcessSectionData } from "@/components/ui/ProcessSection/ProcessSection";

export const cloudInfrastructureApproachData: ProcessSectionData = {
  eyebrow: "OUR APPROACH",
  title: "From roadmap to everyday operation",
  subtitle: "Start with the process, customer moment or decision you want to improve. We will help turn it into a focused, testable path to value.",
  steps: [
    {
      id: "assess-align",
      title: "Assess & Align",
      description: "Understand your goals, current environment and priorities to establish a clear cloud direction.",
      iconSrc: "/cybersecurity/icons/Overlay.svg"
    },
    {
      id: "build-connect",
      title: "Build & Connect",
      description: "Design and deliver secure, scalable cloud foundations connected to applications, data and security.",
      iconSrc: "/cybersecurity/icons/Overlay (1).svg"
    },
    {
      id: "adopt-improve",
      title: "Adopt & Improve",
      description: "Drive adoption, measure value and continuously improve reliability, performance and cost.",
      iconSrc: "/cybersecurity/icons/Overlay (2).svg"
    }
  ]
};

import { SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

export const cloudInfrastructureSpecialistsData: SplitActionCardsSectionData = {
  eyebrow: "AI & AUTOMATION",
  title: "Talk to the right security specialist.",
  subtitle: "Tell us where you need to strengthen security. Our specialists can help you understand the challenge, identify priorities and define the most useful next step.",
  cta: {
    label: "Start a security conversation",
    href: "/contactus",
  },
  supportingText: "No obligation. Just a useful first conversation.",
  listHeader: {
    leftText: "SECURITY SPECIALISTS",
    rightText: "DIRECT ARCHITECTURE ADVISORY",
  },
  cards: [
    {
      id: "specialist-1",
      imageSrc: "/cybersecurity/specialist-2.webp",
      category: "SECURITY SPECIALIST",
      label: "ADVISORY // 01",
      title: "James Harvey",
      description: "Security strategy, risk & resilience",
      metadata: "Governance • Posture • Board Risk",
    },
    {
      id: "specialist-2",
      imageSrc: "/cybersecurity/specialist-2.webp",
      category: "SECURITY SPECIALIST",
      label: "SEC.OPS // 02",
      title: "Graham Spratt",
      description: "Security operations & managed security",
      metadata: "24/7 Detection • Incident • Threat Surface",
    }
  ],
};
