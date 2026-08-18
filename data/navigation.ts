export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  megaMenu?: MegaMenuColumn[];
}

export interface MegaMenuColumn {
  id: string;
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "about",
    label: "About Us",
    href: "/about",
  },
  {
    id: "services",
    label: "Services",
    megaMenu: [
      {
        id: "wealth-finance",
        title: "Wealth & Finance",
        items: [
          {
            id: "wealth-management",
            label: "Wealth Management",
            href: "/services/wealth-management",
          },
          {
            id: "investment-planning",
            label: "Investment Planning",
            href: "/services/investment-planning",
          },
          {
            id: "portfolio-management",
            label: "Portfolio Management",
            href: "/services/portfolio-management",
          },
          {
            id: "retirement-planning",
            label: "Retirement Planning",
            href: "/services/retirement-planning",
          },
          {
            id: "tax-planning",
            label: "Tax Planning",
            href: "/services/tax-planning",
          },
          {
            id: "financial-planning",
            label: "Financial Planning",
            href: "/services/financial-planning",
          },
        ],
      },
      {
        id: "business-solutions",
        title: "Business Solutions",
        items: [
          {
            id: "business-consulting",
            label: "Business Consulting",
            href: "/services/business-consulting",
          },
          {
            id: "corporate-advisory",
            label: "Corporate Advisory",
            href: "/services/corporate-advisory",
          },
          {
            id: "financial-strategy",
            label: "Financial Strategy",
            href: "/services/financial-strategy",
          },
          {
            id: "risk-management",
            label: "Risk Management",
            href: "/services/risk-management",
          },
          {
            id: "growth-solutions",
            label: "Growth Solutions",
            href: "/services/growth-solutions",
          },
        ],
      },
      {
        id: "protection",
        title: "Protection",
        items: [
          {
            id: "life-insurance",
            label: "Life Insurance",
            href: "/services/life-insurance",
          },
          {
            id: "health-insurance",
            label: "Health Insurance",
            href: "/services/health-insurance",
          },
          {
            id: "motor-insurance",
            label: "Motor Insurance",
            href: "/services/motor-insurance",
          },
          {
            id: "travel-insurance",
            label: "Travel Insurance",
            href: "/services/travel-insurance",
          },
          {
            id: "property-insurance",
            label: "Property Insurance",
            href: "/services/property-insurance",
          },
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "/solutions",
  },
  {
    id: "industries",
    label: "Industries",
    href: "/industries",
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "/contact",
  },
];
