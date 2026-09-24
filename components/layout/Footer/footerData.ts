// export const FOOTER_NAV_COLUMNS = [
//   {
//     id: "solution",
//     title: "SOLUTION",
//     orderClasses: "order-1 lg:order-1",
//     links: [
//       { label: "All Solution", href: "#" },
//       { label: "Cybersecurity", href: "#" },
//       { label: "Salesforce", href: "#" },
//       { label: "AI & Automation", href: "#" },
//       { label: "Cloud & Infrastructure", href: "#" },
//       { label: "Application Engineering", href: "#" },
//       { label: "Data & Integration", href: "#" },
//       { label: "Managed Services", href: "#" }
//     ]
//   },
//   {
//     id: "cybersecurity",
//     title: "CYBERSECURITY",
//     orderClasses: "order-3 lg:order-2",
//     links: [
//       { label: "Cloud Security", href: "#" },
//       { label: "Application Security", href: "#" },
//       { label: "Identity Security", href: "#" },
//       { label: "Data Security", href: "#" },
//       { label: "Exposure Management", href: "#" },
//       { label: "Vulnerability Management", href: "#" },
//       { label: "Managed Security", href: "#" }
//     ]
//   },
//   {
//     id: "salesforce",
//     title: "SALESFORCE",
//     orderClasses: "order-2 lg:order-3",
//     links: [
//       { label: "Sales", href: "#" },
//       { label: "Service", href: "#" },
//       { label: "Marketing", href: "#" },
//       { label: "Commerce", href: "#" },
//       { label: "AI", href: "#" },
//       { label: "Integrations", href: "#" },
//       { label: "Managed Services", href: "#" }
//     ]
//   },
//   {
//     id: "explore",
//     title: "EXPLORE",
//     orderClasses: "order-4 lg:order-4",
//     links: [
//       { label: "Industries", href: "#" },
//       { label: "Accelerators", href: "#" },
//       { label: "Insights", href: "#" },
//       { label: "About", href: "/aboutus" },
//       { label: "Contact", href: "/contactus" }
//     ]
//   },
//   {
//     id: "legal",
//     title: "LEGAL",
//     orderClasses: "order-5 lg:order-5",
//     links: [
//       { label: "Privacy Policy", href: "#" },
//       { label: "Terms of use", href: "#" },
//       { label: "Sitemap", href: "#" },
//       { label: "Responsible Disclosure", href: "#" },
//       { label: "Cookies", href: "#" }
//     ]
//   }
// ];

// export const SOCIAL_LINKS = [
//   { id: 'x', label: 'X (Twitter)', icon: '/icons/x.svg', href: '#' },
//   { id: 'whatsapp', label: 'WhatsApp', icon: '/icons/whatsapp.svg', href: '#' },
//   { id: 'youtube', label: 'YouTube', icon: '/icons/youtube.svg', href: '#' }
// ];





export const FOOTER_NAV_COLUMNS = [
  {
    id: "solution",
    title: "SOLUTION",
    orderClasses: "order-1 lg:order-1",
    links: [
      { label: "All Solution", href: "/solutions" },
      { label: "Cybersecurity", href: "/cybersecurity" },
      { label: "Salesforce", href: "/salesforce" },
      { label: "AI & Automation", href: "/ai-automation" },
      { label: "Cloud & Infrastructure", href: "/cloud-infrastructure" },
      { label: "Application Engineering", href: "/application-engineering" },
      { label: "Data & Integration", href: "/data-integration" }
    ]
  },
  {
    id: "cybersecurity",
    title: "CYBERSECURITY",
    orderClasses: "order-3 lg:order-2",
    links: [
      { label: "Cloud Security", href: "/cybersecurity/cloud-security" },
      { label: "Application Security", href: "/cybersecurity/application-security" },
      { label: "Identity Security", href: "/cybersecurity/identity-security" },
      { label: "Data Security", href: "/cybersecurity/data-security" },
      { label: "Exposure Management", href: "/cybersecurity/exposure-management" },
      { label: "Vulnerability Management", href: "/cybersecurity/vulnerability-management" },
      { label: "Managed Security", href: "/cybersecurity/managed-security" },
      { label: "AI Security", href: "/cybersecurity/ai-security" }
    ]
  },
  {
    id: "salesforce",
    title: "SALESFORCE",
    orderClasses: "order-2 lg:order-3",
    links: [
      { label: "Sales", href: "/salesforce/sales" },
      { label: "Service", href: "/salesforce/service" },
      { label: "Marketing", href: "/salesforce/marketing" },
      { label: "Commerce", href: "/salesforce/commerce" },
      { label: "AI", href: "/salesforce/ai" },
      { label: "Integrations", href: "/salesforce/integration" },
      { label: "Managed Services", href: "/salesforce/managed-services" }
    ]
  },
  {
    id: "explore",
    title: "EXPLORE",
    orderClasses: "order-4 lg:order-4",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Accelerators", href: "/accelerators" },
      { label: "Insights", href: "/insights" },
      { label: "About", href: "/aboutus" },
      { label: "Contact", href: "/contactus" }
    ]
  },
  {
    id: "legal",
    title: "LEGAL",
    orderClasses: "order-5 lg:order-5",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of use", href: "#" },
      { label: "Sitemap", href: "#" },
      { label: "Responsible Disclosure", href: "#" },
      { label: "Cookies", href: "#" }
    ]
  }
];


export const SOCIAL_LINKS = [
  { id: 'x', label: 'X (Twitter)', icon: '/icons/x.svg', href: '#' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '/icons/whatsapp.svg', href: '#' },
  { id: 'youtube', label: 'YouTube', icon: '/icons/youtube.svg', href: '#' }
];

export const FOOTER_BRANDING = {
  logoAlt: "Cordinit Logo",
  tagline: "Let's talk about your next milestone—and how to reach it",
  ctaText: "Book a call"
};

export const FOOTER_NEWSLETTER = {
  heading: "Stay Ahead",
  description: "Receive occasional perspectives on the technology topics that matter to you.",
  placeholder: "Work email"
};

export const FOOTER_MEDIA_FEATURE = {
  eyebrow: "LATEST FROM CORDINIT",
  heading: "Technology, security & transformation — in conversation.",
  description: "Insights from Cordinit's technology and security experts on building secure, intelligent organisations.",
  ctaText: "WATCH ON YOUTUBE",
  thumbnail: "/Image-v2.webp",
  href: "https://youtube.com"
};

export const FOOTER_LEGAL = {
  copyright: "© 2026 — Copyright",
  privacy: "Privacy"
};