import type { PageDocument } from "@/lib/cms/types";

export const dataSecurityPage: PageDocument = {
  slug: "data-security",
  title: "Data Security",
  layout: "default",
  seo: {
    title: "Data Security | Cordinit",
    description: "Protect sensitive data wherever it is created, used and stored.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "data-security-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Data Security", isCurrent: true },
      ],
    },
    {
      _type: "contentMedia",
      _key: "data-security-hero",
      eyebrow: "DATA SECURITY",
      title: "Protect your most valuable asset.",
      description: "Protect sensitive data wherever it is created, used and stored. We help you implement robust data security measures to ensure compliance, privacy, and protection against unauthorized access or breaches.",
      cta: {
        label: "Discuss your data security",
        href: "/contactus",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Data Security Infrastructure",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Technology abstract visualization",
      },
    },
    {
      _type: "dataSecurityOverview",
      _key: "data-security-overview",
      data: {
        header: {
          eyebrow: "DATA SECURITY OVERVIEW",
          title: "Protect data from discovery to everyday use.",
          description: "Effective data security starts with knowing what information you have, where it resides and how it is being used. We bring discovery, classification, access controls, protection and governance together to help keep sensitive information secure wherever it moves."
        },
        cardSection: {
          sectionTag: "SECURE APPS FASTER",
          sectionTitle: "APPLICATION IDENTITY SECURITY",
          footerText: "FROM CLOUD TO ENDPOINT, PROTECT DATA AT REST, IN TRANSIT AND IN USE.",
          footerHighlight: "Continuous Lifecycle Engine Active",
          cards: [
            {
              stepNumber: "01",
              title: "Discover",
              description: "Understand users, identities, applications and access across hybrid estates."
            },
            {
              stepNumber: "02",
              title: "Classify",
              description: "Strengthen how users and systems prove who they are with phishing- resistant MFA."
            },
            {
              stepNumber: "03",
              title: "Protect",
              description: "Give the right level of access based on role, real-time context and dynamic risk."
            },
            {
              stepNumber: "04",
              title: "Monitor",
              description: "Review, monitor and manage access throughout its complete operational lifecycle."
            },
            {
              stepNumber: "05",
              title: "Govern",
              description: "Continuously reduce unnecessary privilege and strengthen posture over time."
            }
          ]
        }
      }
    },
  ],
};
