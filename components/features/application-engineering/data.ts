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

import { CredentialsSectionData } from "@/components/ui/CredentialsSection";

export const applicationEngineeringCredentialsData: CredentialsSectionData = {
  eyebrow: "OUR CREDENTIALS",
  title: "Application engineering expertise built for confident change",
  subtitle: "Cordinit brings together engineering expertise, practical experience and a product-led approach to help organisations build what matters most. We help strengthen applications across cloud, web, mobile, and emerging technologies.",
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

import { AiAutomationWhereWeHelpData } from "@/components/features/ai-automation/data";

export const applicationEngineeringWhereWeHelpData: AiAutomationWhereWeHelpData = {
  eyebrow: "WHERE WE HELP",
  title: "From product thinking to dependable engineering.",
  subtitle: "We bring together product, design and engineering expertise to create applications that are useful today and ready to evolve tomorrow.",
  cards: [
    {
      number: "01",
      code: "APP:01",
      category: "OPPORTUNITY",
      title: "Shape the right product",
      description: "Understand user needs, clarify the problem, test assumptions and define a roadmap that balances value with practical delivery.",
      icon: "/ai-automation/icons/Icon.svg"
    },
    {
      number: "02",
      code: "APP:02",
      category: "WORKFLOWS",
      title: "Design experiences people can use",
      description: "Create simple, accessible journeys and interfaces that support adoption from the start.",
      icon: "/ai-automation/icons/Icon (1).svg"
    },
    {
      number: "03",
      code: "APP:03",
      category: "SCALE",
      title: "Engineer with confidence",
      description: "Build and integrate applications with quality, security, performance and maintainability in mind.",
      icon: "/ai-automation/icons/Icon (2).svg"
    },
    {
      number: "04",
      code: "APP:04",
      category: "IMPROVEMENT",
      title: "Modernise and improve",
      description: "Reduce the friction and risk of legacy applications through deliberate, incremental improvement.",
      icon: "/ai-automation/icons/Icon (3).svg"
    }
  ]
};

import { ProcessSectionData } from "@/components/ui/ProcessSection/ProcessSection";

export const applicationEngineeringApproachData: ProcessSectionData = {
  eyebrow: "OUR APPROACH",
  title: "From first idea to ongoing evolution",
  subtitle: "We work in close partnership with your teams, bringing the right mix of discovery, design, engineering and operational thinking to the work.",
  steps: [
    {
      id: "discover-define",
      title: "Discover & Define",
      description: "Understand the opportunity, users and outcomes that matter.",
      iconSrc: "/cybersecurity/icons/Overlay.svg"
    },
    {
      id: "design-build",
      title: "Design & Build",
      description: "Turn the idea into a useful, secure and dependable application.",
      iconSrc: "/cybersecurity/icons/Overlay (1).svg"
    },
    {
      id: "evolve-improve",
      title: "Evolve & Improve",
      description: "Support adoption, performance and continuous improvement over time.",
      iconSrc: "/cybersecurity/icons/Overlay (2).svg"
    }
  ]
};

import { SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

export const applicationEngineeringSpecialistsData: SplitActionCardsSectionData = {
  eyebrow: "APPLICATION ENGINEERING",
  title: "Talk to the right engineering specialist.",
  subtitle: "Tell us what you are trying to build or improve. Our specialists can help you understand the challenge, identify priorities and define the most useful next step.",
  cta: {
    label: "Start an engineering conversation",
    href: "/contactus",
  },
  supportingText: "No obligation. Just a useful first conversation.",
  listHeader: {
    leftText: "ENGINEERING SPECIALISTS",
    rightText: "DIRECT ARCHITECTURE ADVISORY",
  },
  cards: [
    {
      id: "specialist-1",
      imageSrc: "/cybersecurity/specialist-2.webp",
      category: "ENGINEERING SPECIALIST",
      label: "ADVISORY // 01",
      title: "James Harvey",
      description: "Engineering strategy, architecture & scale",
      metadata: "Product • Architecture • Delivery",
    },
    {
      id: "specialist-2",
      imageSrc: "/cybersecurity/specialist-2.webp",
      category: "ENGINEERING SPECIALIST",
      label: "ENG.OPS // 02",
      title: "Graham Spratt",
      description: "Application operations & managed support",
      metadata: "24/7 Operations • Reliability • Performance",
    }
  ],
};

import { WhyChooseSectionData } from "@/components/ui/WhyChooseSection";

export const applicationEngineeringWhyChooseData: WhyChooseSectionData = {
  eyebrow: "WHY CHOOSE CORDINIT",
  title: "Application engineering that creates lasting value.",
  cards: [
    {
      id: "scale-and-resilience",
      title: "Build for scale and resilience",
      description: "We design and build applications that can grow with your business and withstand unexpected challenges.",
      image: "/cybersecurity/icons/SVG1.svg",
      imageAlt: "Scale icon",
    },
    {
      id: "faster-time-to-market",
      title: "Faster time to market",
      description: "Our agile engineering practices help you launch products faster and iterate based on real user feedback.",
      image: "/cybersecurity/icons/SVG 2.svg",
      imageAlt: "Speed icon",
    },
    {
      id: "quality-and-maintainability",
      title: "Quality and maintainability",
      description: "We prioritize clean code, test coverage, and robust architecture to ensure long-term maintainability.",
      image: "/cybersecurity/icons/SVG 3.svg",
      imageAlt: "Quality icon",
    },
    {
      id: "engineering-excellence",
      title: "Engineering excellence",
      description: "Work with experienced software engineers who bring deep technical knowledge and a product mindset.",
      image: "/cybersecurity/icons/SVG 4.svg",
      imageAlt: "Excellence icon",
    },
    {
      id: "tailored-applications",
      title: "Tailored applications",
      description: "We build custom software around your specific industry, technology environment and business goals.",
      image: "/cybersecurity/icons/SVG 5.svg",
      imageAlt: "Tailored icon",
    },
    {
      id: "ongoing-support",
      title: "Ongoing support and partnership",
      description: "We work as an extension of your team, providing continuous support and guidance as your needs evolve.",
      image: "/cybersecurity/icons/SVG 6.svg",
      imageAlt: "Partnership icon",
    }
  ]
};
