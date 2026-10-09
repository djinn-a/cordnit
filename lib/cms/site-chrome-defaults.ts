import type { SectionContentMap } from "./registry";

/**
 * Seed content for the site Navbar and Footer Global Blocks, and the fallback the
 * layout renders when the CMS is unreachable. Every internal href must be a
 * published page or code-owned route; links without a page yet stay blank.
 */
export const NAVBAR_DEFAULTS: SectionContentMap["navbar"] = {
  logoAltText: "Cordinit",
  logoHref: "/",
  topBarBreachLabel: "Experiencing a Breach?",
  topBarBreachHref: "/breach",
  topBarNewsletterLabel: "Newsletter",
  solutionsMenu: {
    label: "Solutions",
    href: "/solutions",
    panelTitle: "Our Capabilities",
    panelDescription: "End-to-end digital transformation tailored to complex enterprise environments.",
    exploreAllLabel: "Explore All Solutions",
    exploreAllHref: "/solutions",
    items: [
      { _id: "cybersecurity", title: "Cybersecurity", description: "Comprehensive protection for digital assets and risk mitigation.", href: "/cybersecurity" },
      { _id: "cloud-infrastructure", title: "Cloud & Infrastructure", description: "Secure, scalable, high-performing architectures.", href: "/cloud-infrastructure" },
      { _id: "ai-automation", title: "AI & Automation", description: "Optimize operations and make smarter, faster decisions.", href: "/ai-automation" },
      { _id: "application-engineering", title: "Application Engineering", description: "Design and modernize applications for business agility.", href: "/application-engineering" },
      { _id: "data-integration", title: "Data & Integration", description: "Unify systems to drive actionable insights.", href: "/data-integration" },
      { _id: "salesforce", title: "Salesforce Solutions", description: "Transform customer experiences with the power of Salesforce.", href: "/salesforce" },
    ],
  },
  navLinks: [
    { _id: "about", label: "About", href: "/aboutus" },
    { _id: "industries", label: "Industries", href: "/industries" },
    { _id: "accelerators", label: "Accelerators", href: "/accelerators" },
    { _id: "insights", label: "Insights", href: "/insights" },
    { _id: "contact", label: "Contact", href: "/contactus" },
  ],
  getInTouchLabel: "Get in Touch",
  mobileMenuToggleAriaLabel: "Toggle menu",
};

const links = (prefix: string, items: [label: string, href: string][]) =>
  items.map(([label, href], i) => ({ _id: `${prefix}-${i}`, label, href }));

export const FOOTER_DEFAULTS: SectionContentMap["footer"] = {
  logoHref: "/",
  branding: {
    logoAlt: "Cordinit",
    tagline:
      "Cordinit partners with organisations to turn technology into meaningful, sustainable progress. By combining strategic insight, technical expertise and practical delivery, we help businesses navigate complexity, strengthen their digital foundations and build secure, resilient capabilities that support long-term growth",
    ctaText: "Book a call",
  },
  contact: { email: "", phone: "" },
  navColumns: [
    {
      _id: "solution",
      title: "SOLUTION",
      links: links("solution", [
        ["All Solutions", "/solutions"],
        ["AI & Automation", "/ai-automation"],
        ["Salesforce", "/salesforce"],
        ["Data & Integration", "/data-integration"],
        ["Application Engineering", "/application-engineering"],
        ["Cybersecurity", "/cybersecurity"],
        ["Cloud & Infrastructure", "/cloud-infrastructure"],
      ]),
    },
    {
      _id: "cybersecurity",
      title: "CYBERSECURITY",
      links: links("cybersecurity", [
        ["Cloud Security", "/cybersecurity/cloud-security"],
        ["Application Security", "/cybersecurity/application-security"],
        ["Identity Security", "/cybersecurity/identity-security"],
        ["Data Security", "/cybersecurity/data-security"],
        ["AI Security", "/cybersecurity/ai-security"],
        ["Exposure Management", "/cybersecurity/exposure-management"],
        ["Vulnerability Management", "/cybersecurity/vulnerability-management"],
        ["Managed Security", "/cybersecurity/managed-security"],
      ]),
    },
    {
      _id: "salesforce",
      title: "SALESFORCE",
      links: links("salesforce", [
        ["Sales Cloud", "/salesforce/sales"],
        ["Service Cloud", "/salesforce/service"],
        ["Marketing Cloud", "/salesforce/marketing"],
        ["Commerce Cloud", "/salesforce/commerce"],
        ["AI & Agentforce", "/salesforce/ai"],
        ["Integration", "/salesforce/integration"],
        ["Managed Services", "/salesforce/managed-services"],
      ]),
    },
    {
      _id: "explore",
      title: "EXPLORE",
      links: links("explore", [
        ["Industries", "/industries"],
        ["Accelerators", "/accelerators"],
        ["Insights", "/insights"],
        ["About", "/aboutus"],
        ["Contact", "/contactus"],
      ]),
    },
  ],
  socialLinks: [
    { _id: "linkedin", platform: "linkedin", href: "https://www.linkedin.com/company/143430041/" },
    { _id: "youtube", platform: "youtube", href: "https://www.youtube.com/@Cordinit" },
    { _id: "instagram", platform: "instagram", href: "https://www.instagram.com/cordinit_/" },
    { _id: "facebook", platform: "facebook", href: "https://www.facebook.com/cordinit" },
  ],
  newsletter: {
    heading: "Stay Ahead / Newsletter",
    description: "Receive occasional perspectives on the technology topics that matter to you.",
    placeholder: "Work email",
    emailLabel: "Work email address",
    formLabel: "Newsletter subscription form",
    consentText: "I agree to receive updates from Cordinit. See our",
    privacyLinkLabel: "Privacy Policy",
    privacyLinkHref: "/privacy",
    buttonText: "Subscribe",
    submittingText: "Subscribing...",
    successText: "Thanks for subscribing.",
  },
  media: {
    eyebrow: "LATEST FROM CORDINIT",
    heading: "Technology, security & transformation — in conversation.",
    description: "Insights from Cordinit's technology and security experts on building secure, intelligent organisations.",
    ctaText: "WATCH ON YOUTUBE",
    href: "https://www.youtube.com/@Cordinit",
  },
  copyright: "Copyright © 2026 Cordinit Private Limited. All rights reserved",
  legalLinks: links("legal", [["Privacy Policy", "/privacy"]]),
};
