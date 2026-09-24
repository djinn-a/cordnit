export interface PhaseFeatureCardData {
  id?: string;
  numberStr: string;
  phaseLabel?: string;
  title: string;
  description: string;
  footerText?: string;
  highlighted?: boolean;
}

export interface PhaseFeatureBlockProps {
  className?: string;
  headerLayout?: "split" | "stacked";
  cardStyle?: "default" | "pale-blue" | "pale-blue-compact" | "clean";
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: PhaseFeatureCardData[];
}
