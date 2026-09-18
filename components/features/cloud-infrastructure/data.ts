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
