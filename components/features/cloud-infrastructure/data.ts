import type { PageHeroData } from "@/components/ui/PageHero";

export const cloudInfrastructureHeroData: PageHeroData = {
  eyebrow: "CLOUD INFRASTRUCTURE",
  title: "Cloud infrastructure that enables confident change.",
  description:
    "Your cloud environment should help your organisation move with confidence. Cordinit helps you architect, migrate, and optimize your cloud infrastructure to build resilience and adapt in a changing technology landscape.",
  cta: {
    label: "Discuss your cloud priorities",
    href: "/contactus",
  },
  image: {
    src: "/cloud-infrastructure/hero.webp",
    alt: "Cloud Infrastructure Data Center",
  },
  quoteOverlay: {
    quote: "“Cloud infrastructure should enable progress, not stand in its way.”",
    author: "OUR APPROACH",
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
    src: "/InsightsSection/dummy.webp",
    alt: "Cloud Infrastructure Business Value",
  }
};

import { CredentialsSectionData } from "@/components/ui/CredentialsSection";

export const cloudInfrastructureCredentialsData: CredentialsSectionData = {
  eyebrow: "OUR CREDENTIALS",
  title: "Cloud infrastructure expertise built for confident change",
  subtitle: "Cordinit brings together cloud expertise, practical experience and a value-led approach to help organisations build what matters most. We help strengthen infrastructure across computing, storage, networking, and emerging technologies.",
  certificationHeading: "Company certification",
  backgroundImage: {
    src: "/cybersecurity/credentials-bg.webp",
    alt: "Abstract blue background",
  },
  certifications: [
    {
      id: "crest",
      src: "/cybersecurity/icons/CREST 1.svg",
      alt: "CREST",
      width: 140.609,
      height: 149.306,
      aspectRatio: "97/103",
    },
    {
      id: "iso-9000",
      src: "/cybersecurity/icons/ISO_9000 1.svg",
      alt: "ISO 9000",
      width: 142.058,
      height: 153.655,
      aspectRatio: "49/53",
    },
    {
      id: "iso-27001",
      src: "/cybersecurity/icons/ISO_27001 1.svg",
      alt: "ISO 27001",
      width: 163.802,
      height: 153.655,
      aspectRatio: "113/106",
    },
    {
      id: "nis2",
      src: "/cybersecurity/icons/NIS2_Accredited 1.svg",
      alt: "NIS2 Accredited",
      width: 223.234,
      height: 147.856,
      aspectRatio: "77/51",
    },
  ],
};

import { ProcessSectionData } from "@/components/ui/ProcessSection/ProcessSection";

export const cloudInfrastructureApproachData: ProcessSectionData = {
  eyebrow: "OUR APPROACH",
  title: "From roadmap to everyday operation",
  subtitle: "Start with the process, customer moment or decision you want to improve. We will help turn it into a focused, testable path to value.",
  steps: [
    {
      id: "assess",
      title: "Assess & Align",
      description: "Understand your goals, current environment and priorities to establish a clear cloud direction.",
      iconSrc: "/cybersecurity/icons/Overlay.svg"
    },
    {
      id: "build",
      title: "Build & Connect",
      description: "Design and deliver secure, scalable cloud foundations connected to applications, data and security.",
      iconSrc: "/cybersecurity/icons/Overlay (1).svg"
    },
    {
      id: "adopt",
      title: "Adopt & Improve",
      description: "Drive adoption, measure value and continuously improve reliability, performance and cost.",
      iconSrc: "/cybersecurity/icons/Overlay (2).svg"
    }
  ]
};

import { WhyChooseSectionData } from "@/components/ui/WhyChooseSection";

export const cloudInfrastructureWhyChooseData: WhyChooseSectionData = {
  eyebrow: "WHY CHOOSE CORDINIT",
  title: "Cloud infrastructure that creates lasting value.",
  cards: [
    {
      id: "card-1",
      title: "Meet industry and regulatory requirements",
      description: "We help you navigate regulatory requirements with practical, right-sized cloud infrastructure solutions.",
      image: "/cybersecurity/icons/SVG1.svg",
      imageAlt: "Industry requirements illustration"
    },
    {
      id: "card-2",
      title: "Faster time to value",
      description: "Our cloud architecture and migration capabilities help minimise disruption and speed up deployment.",
      image: "/cybersecurity/icons/SVG 2.svg",
      imageAlt: "Faster response illustration"
    },
    {
      id: "card-3",
      title: "Proactive optimization",
      description: "We identify bottlenecks and proactively optimize your infrastructure with advanced monitoring and real-time insights.",
      image: "/cybersecurity/icons/SVG 3.svg",
      imageAlt: "Stop attacks illustration"
    },
    {
      id: "card-4",
      title: "Certified expertise",
      description: "Work with experienced cloud professionals who bring recognised certifications and deep industry knowledge.",
      image: "/cybersecurity/icons/SVG 4.svg",
      imageAlt: "Certified expertise illustration"
    },
    {
      id: "card-5",
      title: "Tailored solutions",
      description: "We design cloud strategies around your specific industry, technology environment and business goals.",
      image: "/cybersecurity/icons/SVG 5.svg",
      imageAlt: "Tailored solutions illustration"
    },
    {
      id: "card-6",
      title: "Ongoing support and partnership",
      description: "We work as an extension of your team, providing continuous support and guidance as your needs evolve.",
      image: "/cybersecurity/icons/SVG 6.svg",
      imageAlt: "Ongoing support illustration"
    }
  ]
};

import { SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

export const cloudInfrastructureSpecialistsData: SplitActionCardsSectionData = {
  eyebrow: "CLOUD INFRASTRUCTURE",
  title: "Talk to the right cloud specialist.",
  subtitle: "Tell us where you need to strengthen your infrastructure. Our specialists can help you understand the challenge, identify priorities and define the most useful next step.",
  cta: {
    label: "Start a cloud conversation",
    href: "/contactus",
  },
  supportingText: "No obligation. Just a useful first conversation.",
  listHeader: {
    leftText: "CLOUD SPECIALISTS",
    rightText: "DIRECT ARCHITECTURE ADVISORY",
  },
  cards: [
    {
      id: "specialist-1",
      imageSrc: "/cybersecurity/specialist-2.webp",
      category: "CLOUD SPECIALIST",
      label: "ADVISORY // 01",
      title: "James Harvey",
      description: "Cloud strategy, architecture & migration",
      metadata: "Governance • Architecture • Cost Optimization",
    },
    {
      id: "specialist-2",
      imageSrc: "/cybersecurity/specialist-2.webp",
      category: "CLOUD SPECIALIST",
      label: "ADVISORY // 02",
      title: "Graham Spratt",
      description: "Cloud operations & managed services",
      metadata: "24/7 Operations • Reliability • Performance",
    }
  ],
};

import { AiAutomationWhereWeHelpData } from "@/components/features/ai-automation/data";

export const cloudInfrastructureWhereWeHelpData: AiAutomationWhereWeHelpData = {
  eyebrow: "WHERE WE HELP",
  title: "From cloud opportunity to everyday value.",
  subtitle: "We help turn promising ideas into useful, responsible solutions that work within the way your organisation operates.",
  cards: [
    {
      number: "01",
      code: "CLD:01",
      category: "OPPORTUNITY",
      title: "Set the direction",
      description: "Clarify your cloud strategy, priorities and roadmap around the needs of the organisation.",
      icon: "/ai-automation/icons/Icon.svg"
    },
    {
      number: "02",
      code: "CLD:02",
      category: "WORKFLOWS",
      title: "Build strong foundations",
      description: "Create secure, scalable platform capabilities with the controls and guardrails teams need to deliver confidently.",
      icon: "/ai-automation/icons/Icon (1).svg"
    },
    {
      number: "03",
      code: "CLD:03",
      category: "SCALE",
      title: "Modernise what matters",
      description: "Plan and deliver migrations, upgrades and application/platform improvements with a focus on resilience and continuity.",
      icon: "/ai-automation/icons/Icon (2).svg"
    },
    {
      number: "04",
      code: "CLD:04",
      category: "IMPROVEMENT",
      title: "Run and improve",
      description: "Strengthen observability, reliability, security and cost management through practical operating practices and managed support.",
      icon: "/ai-automation/icons/Icon (3).svg"
    }
  ]
};
