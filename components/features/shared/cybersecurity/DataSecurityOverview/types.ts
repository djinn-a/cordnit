export type ProcessCardData = {
  stepNumber: string;
  phase: string;
  title: string;
  description: string;
  subDescription: string;
};

export type DataSecurityOverviewData = {
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cardSection?: {
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
