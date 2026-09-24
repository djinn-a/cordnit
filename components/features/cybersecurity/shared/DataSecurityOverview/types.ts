export type ProcessCardData = {
  stepNumber: string;
  phase: string;
  title: string;
  description: string;
  subDescription: string;
  variant?: string;
  isSpecialCard?: boolean;
};

export type DataSecurityOverviewData = {
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  variant?: string;
  processSectionInfo?: {
    headerLeft?: string;
    headerRight?: string;
    footerText?: string;
    footerHighlight?: string;
  };
  cardSection?: {
    variant?: string;
    sectionTag: string;
    sectionTitle: string;
    footerText: string;
    footerHighlight: string;
    cards: Array<{
      stepNumber: string;
      title: string;
      description: string;
    }>;
  };
  processCards?: Array<ProcessCardData>;
};

export type DataSecurityOverviewProps = {
  data: DataSecurityOverviewData;
};
