export interface PhaseFeatureCardData {
  id?: string;
  numberStr: string;
  phaseLabel: string;
  title: string;
  description: string;
  footerText?: string;
}

export interface PhaseFeatureBlockProps {
  className?: string;
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: PhaseFeatureCardData[];
}
