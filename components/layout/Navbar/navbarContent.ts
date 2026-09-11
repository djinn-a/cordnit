import { Shield, Cloud, Brain, Code, Database, Briefcase, LucideIcon } from 'lucide-react';

export type NavLink = {
  label: string;
  href: string;
};

export type SolutionItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  slug: string;
};

export type MegaMenuContent = {
  leftPanelTitle: string;
  leftPanelDescription: string;
  exploreAllLabel: string;
  exploreAllHref: string;
};

export type NavbarContent = {
  navLinks: NavLink[];
  solutionsDropdown: SolutionItem[];
  megaMenu: MegaMenuContent;
  getInTouchLabel: string;
  logoAltText: string;
  mobileMenuToggleAriaLabel: string;
};

export const navbarContent: NavbarContent = {
  navLinks: [
    { label: 'Solutions', href: '/solutions' },
    { label: 'About', href: '/aboutus' },
    { label: 'Industries', href: '/industries' },
    { label: 'Accelerators', href: '/accelerators' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contactus' },
  ],
  solutionsDropdown: [
    {
      title: 'Cybersecurity',
      description: 'Comprehensive protection for digital assets and risk mitigation.',
      icon: Shield,
      iconColor: 'text-primary',
      iconBg: 'bg-white/5',
      slug: 'cybersecurity',
    },
    {
      title: 'Cloud & Infrastructure',
      description: 'Secure, scalable, high-performing architectures.',
      icon: Cloud,
      iconColor: 'text-orange-400',
      iconBg: 'bg-white/5',
      slug: 'cloud-infrastructure',
    },
    {
      title: 'AI & Automation',
      description: 'Optimize operations and make smarter, faster decisions.',
      icon: Brain,
      iconColor: 'text-purple-400',
      iconBg: 'bg-white/5',
      slug: 'ai-automation',
    },
    {
      title: 'Application Engineering',
      description: 'Design and modernize applications for business agility.',
      icon: Code,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-white/5',
      slug: 'application-engineering',
    },
    {
      title: 'Data & Integration',
      description: 'Unify systems to drive actionable insights.',
      icon: Database,
      iconColor: 'text-green-400',
      iconBg: 'bg-white/5',
      slug: 'data-integration',
    },
    {
      title: 'Salesforce Solutions',
      description: 'Transform customer experiences with the power of Salesforce.',
      icon: Briefcase,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-white/5',
      slug: 'salesforce-solutions',
    }
  ],
  megaMenu: {
    leftPanelTitle: 'Our Capabilities',
    leftPanelDescription: 'End-to-end digital transformation tailored to complex enterprise environments.',
    exploreAllLabel: 'Explore All Solutions',
    exploreAllHref: '/solutions',
  },
  getInTouchLabel: 'Get in Touch',
  logoAltText: 'Cordinit Logo',
  mobileMenuToggleAriaLabel: 'Toggle menu',
};
