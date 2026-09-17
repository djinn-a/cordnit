export type CapabilityTheme = "blue" | "black";

export type CapabilityData = {
  title: string;
  description: string;
  iconPath: string;
  theme: CapabilityTheme;
  href: string;
};

export const capabilitiesData: CapabilityData[] = [
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets, identify risks, and build resilience.",
    iconPath: "/solutions/cybersecurity.svg",
    theme: "blue",
    href: "/solutions/cybersecurity",
  },
  {
    title: "Salesforce Solutions",
    description: "Transform customer experiences and unlock growth with the power of Salesforce.",
    iconPath: "/solutions/salesforce.svg",
    theme: "black",
    href: "/solutions/salesforce",
  },
  {
    title: "AI & Automation",
    description: "Leverage AI and automation to optimize operations and make smarter, faster decisions.",
    iconPath: "/solutions/ai-automation.svg",
    theme: "blue",
    href: "/solutions/ai-automation",
  },
  {
    title: "Application Engineering",
    description: "Design, build, and modernize applications that drive business agility and innovation.",
    iconPath: "/solutions/application-engineering.svg",
    theme: "black",
    href: "/solutions/application-engineering",
  },
  {
    title: "Cloud & Infrastructure",
    description: "Build secure, scalable, and high-performing cloud infrastructures.",
    iconPath: "/solutions/cloud-infrastructure.svg",
    theme: "blue",
    href: "/solutions/cloud-infrastructure",
  },
  {
    title: "Managed Services",
    description: "Design, build, and modernize applications that drive business agility and innovation.",
    iconPath: "/solutions/managed-services.svg",
    theme: "black",
    href: "/solutions/managed-services",
  },
  {
    title: "Data & Integration",
    description: "Unify your data and systems to drive insights and power better outcomes.",
    iconPath: "/solutions/data-integration.svg",
    theme: "black",
    href: "/solutions/data-integration",
  },
];
