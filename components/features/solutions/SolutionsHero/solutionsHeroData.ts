import type { Cta } from "@/lib/cta";

export type SolutionsHeroContent = {
  eyebrow: string;
  titleDesktop: string;
  titleMobile: string;
  body: string;
  cta: Cta;
  imageSrc: string;
  imageAlt: string;
};

export const defaultSolutionsHeroContent: SolutionsHeroContent = {
  eyebrow: "SOLUTIONS",
  titleDesktop: "Solutions for progress that lasts",
  titleMobile: "Solutions for progress that lasts",
  body: "From securing the foundations of your business to creating better customer experiences and running critical platforms with confidence, Cordinit brings the expertise to move complex technology initiatives forward.",
  cta: { label: "Book a call", action: "contactModal", variant: "primary" },
  imageSrc: "/solutions/enterprise-technology.webp",
  imageAlt: "Enterprise Technology Solutions",
};
