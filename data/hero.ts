export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export const heroData: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Smarter Solutions for a Better Tomorrow",
    description: "We help individuals and businesses make confident decisions through thoughtful strategies and trusted expertise.",
    buttonText: "Explore More",
    buttonLink: "#",
    image: "/images/hero-1.jpg",
  },
  {
    id: "slide-2",
    title: "Solutions Designed Around Your Goals",
    description: "Practical solutions designed to help you move forward with clarity and confidence.",
    buttonText: "Discover More",
    buttonLink: "#",
    image: "/images/hero-2.jpg",
  },
  {
    id: "slide-3",
    title: "Plan Today. Grow Tomorrow.",
    description: "Build a stronger future with solutions aligned with your ambitions.",
    buttonText: "Get Started",
    buttonLink: "#",
    image: "/images/hero-3.jpg",
  }
];
