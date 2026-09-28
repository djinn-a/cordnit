import type { Cta } from "@/lib/cta";

export interface ContentMediaSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: Cta;
  mainImage: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
}
