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
    src: "/salesforce/hero-image.jpg",
    alt: "Salesforce Dashboard across multiple screens in a conference room",
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
    src: "/salesforce/split-content.jpg",
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
