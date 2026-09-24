export interface JourneyStepCardData {
  id?: string;
  numberStr: string;
  title: string;
  description: string;
  subDescription?: string;
  footerText?: string;
  dots?: ("blue" | "gray")[];
}

export interface JourneyStepsBlockProps {
  className?: string;
  variant?: "default" | "pipeline" | "ai-cards";
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: JourneyStepCardData[];
  flowHeaderLeft?: string;
  flowHeaderRight?: string;
  footerLeft?: string;
  footerRight?: string;
}
