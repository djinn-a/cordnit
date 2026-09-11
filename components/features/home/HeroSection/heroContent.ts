export type HeroContent = {
  eyebrow: string;
  titleDesktop: string;
  cardEyebrow: string;
  cardTitle: string;
  cardBody: string;
  primaryCta: string;
  secondaryCta: string;
  imageSrc: string;
  imageAlt: string;
};

export const defaultHeroContent: HeroContent = {
  eyebrow: "WELCOME TO CORDINIT",
  titleDesktop: "Simplifying Complexity. Enabling Real Transformation.",
  cardEyebrow: "SECURE DIGITAL TRANSFORMATION",
  cardTitle: "Where Strategy, Systems, and Execution Finally Align",
  cardBody:
    "With Cordinit as your partner, digital initiatives move faster, operations run smoother, and technology becomes an asset not a blocker to growth.",
  primaryCta: "Book a call",
  secondaryCta: "Explore solutions",
  /* 
   * We use a locally hosted image sourced from the public folder instead of an external Unsplash URL. 
   * This improves LCP (Largest Contentful Paint) performance, ensures the image is always available reliably, 
   * and eliminates external network latency during the critical page load path.
   */
  imageSrc: "/hero-image.jpg",
  imageAlt: "Corporate Digital Transformation",
};
