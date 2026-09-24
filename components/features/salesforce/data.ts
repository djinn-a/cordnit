import type { PageHeroData } from "@/components/ui/PageHero";

export const salesforceHeroData: PageHeroData = {
  eyebrow: "SALESFORCE",
  title: "Salesforce experience that connects your business.",
  description:
    "Create more useful, connected experiences for customers and the teams who serve them. Cordinit helps you turn Salesforce into a platform for better relationships, better decisions and measurable progress.",
  cta: {
    label: "Discuss your salesforce roadmap",
    href: "/contactus", // Assuming it goes to contactus, or we can just leave it as #
  },
  image: {
    src: "/salesforce/hero-image.webp",
    alt: "Salesforce Dashboard across multiple screens in a conference room",
  },
  quoteOverlay: {
    quote: "“Technology creates value when it makes every interaction more useful.”",
    author: "OUR APPROACH"
  },
};

import { SplitContentSectionData } from "@/components/ui/SplitContentSection";

export const salesforceSplitContentData: SplitContentSectionData = {
  eyebrow: "ABOUT SALESFORCE",
  title: "Make every interaction work harder.",
  paragraphs: [
    "Customers expect continuity. Teams need the context and workflows to respond well. Leaders need a clear view of performance and the confidence that their investment is creating value.",
    "We help bring together the strategy, experience design, implementation, integration and ongoing improvement needed to make Salesforce work across the customer lifecycle."
  ],
  image: {
    src: "/salesforce/split-content.webp",
    alt: "Salesforce connecting Marketing, Sales, Service, Commerce, and AI to Customer Experience and Business Value",
  }
};

import { CredentialsSectionData } from "@/components/ui/CredentialsSection";

export const salesforceCredentialsData: CredentialsSectionData = {
  eyebrow: "OUR CREDENTIALS",
  title: "Salesforce expertise built for better customer experiences",
  subtitle: "Cordinit brings together Salesforce expertise, practical delivery and business-focused thinking to help organisations connect customers, teams and data — and get more value from their Salesforce platform.",
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

import { CardGridSectionData } from "@/components/ui/CardGridSection";

export const salesforceCapabilitiesData: CardGridSectionData = {
  eyebrow: "OUR SALESFORCE CAPABILITIES",
  title: "From customer strategy to everyday experiences.",
  subtitle: "We bring together strategy, experience, implementation, integration and ongoing improvement to make Salesforce work across your business.",
  cards: [
    {
      id: "sfdc-01",
      code: "SFDC::01",
      category: "SALES",
      title: "Sales",
      description: "Help sellers focus on the right opportunities with clearer processes and better pipeline visibility.",
      href: "/salesforce/sales",
      ctaLabel: "Explore",
    },
    {
      id: "sfdc-02",
      code: "SFDC::02",
      category: "SERVICE",
      title: "Service",
      description: "Equip service teams to resolve issues efficiently and create better customer experiences across every channel.",
      href: "/salesforce/service",
      ctaLabel: "Explore",
    },
    {
      id: "sfdc-03",
      code: "SFDC::03",
      category: "MARKETING",
      title: "Marketing",
      description: "Create relevant engagement through connected data and effective customer journeys.",
      href: "/salesforce/marketing",
      ctaLabel: "Explore",
    },
    {
      id: "sfdc-04",
      code: "SFDC::04",
      category: "COMMERCE",
      title: "Commerce",
      description: "Build digital commerce experiences that connect products, orders and customer relationships.",
      href: "/salesforce/commerce",
      ctaLabel: "Explore",
    },
    {
      id: "sfdc-05",
      code: "SFDC::05",
      category: "AI",
      title: "AI",
      description: "Apply AI to high-value customer and employee workflows with the right data, oversight and measurement.",
      href: "/salesforce/ai",
      ctaLabel: "Explore",
    },
    {
      id: "sfdc-06",
      code: "SFDC::06",
      category: "integration",
      title: "Integrations",
      description: "Connect Salesforce to the systems, processes and information your teams rely on.",
      href: "/salesforce/integration",
      ctaLabel: "Explore",
    },
    {
      id: "sfdc-07",
      code: "SFDC::07",
      category: "managed service",
      title: "Managed Services",
      description: "Keep your platform moving after go-live through support, releases, optimisation and governance.",
      href: "/salesforce/managed-services",
      ctaLabel: "Explore",
    }
  ],
};

import { ProcessSectionData } from "@/components/ui/ProcessSection/ProcessSection";

export const salesforceApproachData: ProcessSectionData = {
  eyebrow: "OUR APPROACH",
  title: "From roadmap to adoption",
  subtitle: "We start with the experience and outcomes you want to improve, then shape the platform, data and processes to deliver them. Our focus is on making Salesforce useful in everyday work.",
  steps: [
    {
      id: "assess-align",
      title: "Assess & Align",
      description: "Understand your goals, customer journeys and current Salesforce environment.",
      iconSrc: "/cybersecurity/icons/Overlay.svg"
    },
    {
      id: "build-connect",
      title: "Build & Connect",
      description: "Understand your goals, customer journeys and current Salesforce environment.",
      iconSrc: "/cybersecurity/icons/Overlay (1).svg"
    },
    {
      id: "adopt-improve",
      title: "Adopt & Improve",
      description: "Drive adoption, measure value and continuously improve the experience.",
      iconSrc: "/cybersecurity/icons/Overlay (2).svg"
    }
  ]
};

import { SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

export const salesforceSpecialistsData: SplitActionCardsSectionData = {
  eyebrow: "SALESFORCE",
  title: "Make Salesforce work harder for your business.",
  subtitle: "Bring customer data, processes and teams together on Salesforce. We help you simplify complexity, improve adoption and build a platform that supports better experiences and sustainable growth.",
  cta: {
    label: "Start a salesforce conversation",
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
      label: "ADVISORY // 02",
      title: "James Harvey",
      description: "Security strategy, risk & resilience",
      metadata: "Governance • Posture • Board Risk",
    }
  ],
};

import { WhyChooseSectionData } from "@/components/ui/WhyChooseSection";

export const salesforceWhyChooseData: WhyChooseSectionData = {
  eyebrow: "WHY CHOOSE CORDINIT",
  title: "Salesforce that creates lasting value.",
  cards: [
    {
      id: "card-1",
      title: "Meet industry and regulatory requirements",
      description: "We help you navigate regulatory requirements with practical, right-sized Salesforce solutions.",
      image: "/cybersecurity/icons/SVG1.svg",
      imageAlt: "Industry requirements illustration"
    },
    {
      id: "card-2",
      title: "Faster response to market changes",
      description: "Our implementation and response capabilities help minimise disruption and speed up adoption.",
      image: "/cybersecurity/icons/SVG 2.svg",
      imageAlt: "Faster response illustration"
    },
    {
      id: "card-3",
      title: "Connect data before problems happen",
      description: "We identify silos and proactively protect your business with advanced workflows and real-time monitoring.",
      image: "/cybersecurity/icons/SVG 3.svg",
      imageAlt: "Stop attacks illustration"
    },
    {
      id: "card-4",
      title: "Certified expertise",
      description: "Work with experienced Salesforce professionals who bring recognised certifications and deep industry knowledge.",
      image: "/cybersecurity/icons/SVG 4.svg",
      imageAlt: "Certified expertise illustration"
    },
    {
      id: "card-5",
      title: "Tailored solutions",
      description: "We design Salesforce strategies around your specific industry, technology environment and business goals.",
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
