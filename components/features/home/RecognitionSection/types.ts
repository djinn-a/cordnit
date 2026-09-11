import type { ReactNode } from "react";

export type RecognitionItem = {
  id: string | number;
  category: string;
  title: string;
  desc: string;
  image: string;
};

export type RecognitionSectionProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  items?: RecognitionItem[];
};
