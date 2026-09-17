export interface ContentInsightTopic {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface ExploreByTopicProps {
  eyebrow: string;
  topics: ContentInsightTopic[];
  onSelectTopic?: (id: string) => void;
}

export interface ContentInsightsProps {
  eyebrow?: string;
  featured: {
    image: {
      src: string;
      alt: string;
    };
    articleLabel?: string;
    category?: string;
    title: string;
    description: string;
    cta?: {
      label: string;
      href: string;
    };
  };
  exploreByTopic?: ExploreByTopicProps;
  insightCards?: InsightCardData[];
}

export interface InsightCardData {
  id: string;
  topic: string;
  metadata: {
    label: string;
    pill: string;
  };
  title: string;
  description: string;
  dateInfo: string;
  image: {
    src: string;
    alt: string;
  };
  cta: {
    label: string;
    href: string;
  };
}
