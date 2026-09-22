import { CMSIconName } from "@/lib/utils/icons";

export interface DataDiscoveryFeature {
  text: string;
  title?: string;
}

export interface DataDiscoveryCardProps {
  icon?: CMSIconName;
  stepNumber?: string;
  title: string;
  description: string;
}

export interface DataDiscoveryData {
  leftSection: {
    eyebrow: string;
    title: string;
    description: string;
    features: DataDiscoveryFeature[];
  };
  rightSection: {
    eyebrow: string;
    statusText: string;
    cards: DataDiscoveryCardProps[];
    footerBadges?: string[];
  };
}

export interface DataDiscoveryProps {
  _type: "dataDiscovery";
  _key: string;
  data: DataDiscoveryData;
  variant?: "default" | "alternate";
}
