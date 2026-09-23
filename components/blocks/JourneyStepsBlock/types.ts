export interface JourneyStepCardData {
  id?: string;
  numberStr: string;
  title: string;
  description: string;
  footerText?: string;
}

export interface JourneyStepsBlockProps {
  className?: string;
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: JourneyStepCardData[];
}
