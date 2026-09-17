export interface ContentMediaSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
  mainImage: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
}
