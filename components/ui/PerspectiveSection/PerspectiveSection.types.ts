export type PerspectiveSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  cta?: {
    label: string;
    href: string;
  };
};
