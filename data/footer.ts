export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  id: string;
  type: 'email' | 'phone' | 'address';
  value: string;
}

export const footerColumns: FooterColumn[] = [
  {
    id: "company",
    title: "Company",
    links: [
      { id: "about-us", label: "About Us", href: "#" },
      { id: "our-story", label: "Our Story", href: "#" },
      { id: "leadership", label: "Leadership", href: "#" },
      { id: "careers", label: "Careers", href: "#" },
    ],
  },
  {
    id: "services",
    title: "Services",
    links: [
      { id: "wealth-management", label: "Wealth Management", href: "#" },
      { id: "financial-planning", label: "Financial Planning", href: "#" },
      { id: "investment-planning", label: "Investment Planning", href: "#" },
      { id: "business-solutions", label: "Business Solutions", href: "#" },
      { id: "protection", label: "Protection", href: "#" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    links: [
      { id: "blogs", label: "Blogs", href: "#" },
      { id: "insights", label: "Insights", href: "#" },
      { id: "faqs", label: "FAQs", href: "#" },
      { id: "contact", label: "Contact", href: "#" },
      { id: "support", label: "Support", href: "#" },
    ],
  },
];

export const footerContacts: FooterContact[] = [
  { id: "contact-email", type: "email", value: "hello@company.com" },
  { id: "contact-phone", type: "phone", value: "+1 (555) 123-4567" },
  { id: "contact-address", type: "address", value: "123 Business Ave, Suite 100, New York, NY 10001" },
];

export const footerLegal: FooterLink[] = [
  { id: "privacy", label: "Privacy Policy", href: "#" },
  { id: "terms", label: "Terms & Conditions", href: "#" },
];
