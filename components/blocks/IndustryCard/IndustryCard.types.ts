import type { ReactNode } from "react";
import type { Cta } from "@/lib/cta";

export interface IndustryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  cta: Cta;
}
