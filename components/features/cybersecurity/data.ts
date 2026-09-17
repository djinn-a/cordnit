import type { PageHeroData } from "@/components/ui/PageHero";

export const cybersecurityHeroData: PageHeroData = {
  eyebrow: "CYBERSECURITY",
  title: "Cybersecurity that enables confident change.",
  description:
    "Security should help your organisation move with confidence. Cordinit helps you understand your exposure, protect critical assets and build the resilience to adapt in a changing threat landscape.",
  cta: {
    label: "Discuss your security priorities",
    href: "/contactus",
  },
  image: {
    src: "/hero-image.webp",
    alt: "Cybersecurity Data Center",
  },
};

import { SplitContentSectionData } from "@/components/ui/SplitContentSection";

export const cybersecuritySplitContentData: SplitContentSectionData = {
  eyebrow: "ABOUT CYBERSECURITY",
  title: "Turn security complexity into practical progress",
  paragraphs: [
    "As digital estates expand, the attack surface grows exponentially. Organizations struggle to maintain visibility across fragmented environments, leading to accumulated technical debt and unchecked risk.",
    "We bridge the gap between technical vulnerability and business risk, translating complex threat landscapes into actionable, prioritized roadmaps that defend what matters most."
  ],
  image: {
    src: "/InsightsSection/dummy.webp",
    alt: "Cybersecurity Business Risk",
  }
};
import { CardGridSectionData } from "@/components/ui/CardGridSection";

export const cybersecurityCapabilitiesData: CardGridSectionData = {
  eyebrow: "OUR CYBERSECURITY CAPABILITIES",
  title: "From transformation strategy to everyday operations.",
  subtitle: "From cloud and application security to identity, data, AI and ongoing security operations, we help strengthen the capabilities that matter most.",
  cards: [
    {
      id: "cyb-01",
      code: "CYB:01",
      category: "CLOUD",
      title: "Cloud Security",
      description: "Stronger controls, visibility and confidence across your cloud environment.",
      href: "/cybersecurity/cloud-security",
      ctaLabel: "Explore",
    },
    {
      id: "cyb-02",
      code: "CYB:02",
      category: "APPLICATION",
      title: "Application Security",
      description: "Build security into applications from design and development through to deployment.",
      href: "/cybersecurity/application-security",
      ctaLabel: "Explore",
    },
    {
      id: "cyb-03",
      code: "CYB:03",
      category: "IDENTITY",
      title: "Identity Security",
      description: "Give the right people the right access while maintaining control as needs change.",
      href: "/cybersecurity/identity-security",
      ctaLabel: "Explore",
    },
    {
      id: "cyb-04",
      code: "CYB:04",
      category: "DATA",
      title: "Data Security",
      description: "Protect sensitive data wherever it is created, used and stored.",
      href: "/cybersecurity/data-security",
      ctaLabel: "Explore",
    },
    {
      id: "cyb-05",
      code: "CYB:05",
      category: "AI",
      title: "AI Security",
      description: "Adopt AI with practical guardrails for data, models, people and processes.",
      href: "/cybersecurity/ai-security",
      ctaLabel: "Explore",
    },
    {
      id: "cyb-06",
      code: "CYB:06",
      category: "EXPOSURE",
      title: "Exposure Management",
      description: "Identify and prioritise the exposures creating the greatest business risk.",
      href: "/cybersecurity/exposure-management",
      ctaLabel: "Explore",
    },
    {
      id: "cyb-07",
      code: "CYB:07",
      category: "VULNERABILITY",
      title: "Vulnerability Management",
      description: "Discover, prioritise and reduce vulnerability risk with greater consistency.",
      href: "/cybersecurity/vulnerability-management",
      ctaLabel: "Explore",
    },
    {
      id: "cyb-08",
      code: "CYB:07",
      category: "OPERATIONS",
      title: "Managed Security",
      description: "Extend your security capacity with ongoing operations, governance and improvement.",
      href: "/cybersecurity/managed-security",
      ctaLabel: "Explore",
    },
  ],
};
import { CredentialsSectionData } from "@/components/ui/CredentialsSection";

export const cybersecurityCredentialsData: CredentialsSectionData = {
  eyebrow: "OUR CREDENTIALS",
  title: "Cybersecurity expertise built for confident change",
  subtitle: "Cordinit brings together security expertise, practical experience and a risk-led approach to help organisations protect what matters most. We help strengthen security across cloud, applications, identity, data and emerging technologies.",
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
