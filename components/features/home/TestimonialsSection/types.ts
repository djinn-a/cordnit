export type TestimonialItem = {
  id: string | number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
};

export type TestimonialsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: TestimonialItem[];
};
