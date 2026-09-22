import { CMSIconName } from "@/lib/utils/icons";

export interface SplitFeatureBlockProps {
  layout?: "text-left" | "text-right";
  textFeatureStyle?: "checkmarks" | "cards";
  mediaStyle?: "icon-cards" | "numbered-steps";
  textSection: {
    eyebrow: string;
    title: string;
    description: string;
    features: { title?: string; text: string }[];
  };
  mediaSection: {
    eyebrow: string;
    statusText: string;
    cards: { icon?: CMSIconName; stepNumber?: string; title: string; description: string }[];
    footerBadges?: string[];
  };
}
