export type DataSecurityOverviewData = {
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cardSection: {
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
};

export type DataSecurityOverviewProps = {
  data: DataSecurityOverviewData;
};
