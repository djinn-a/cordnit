export interface BlogMediaImage {
  url: string;
  alt: string;
}

export interface BlogLabeledItem {
  _id?: string;
  label: string;
  description: string;
}

export interface BlogComparisonTableRow {
  _id?: string;
  layer: string;
  focus: string;
  benefit: string;
}

export interface BlogComparisonTableData {
  layerHeader: string;
  focusHeader: string;
  benefitHeader: string;
  rows: BlogComparisonTableRow[];
}

export interface BlogSubSection {
  _id?: string;
  subHeading: string;
  paragraphs?: string[];
}

export interface BlogNewsletterCalloutData {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  consentText: string;
}

export interface BlogMediaCalloutData {
  thumbnail?: BlogMediaImage;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export interface BlogArticleBlock {
  _id?: string;
  tocLabel?: string;
  heading: string;
  leadBoldText?: string;
  paragraphs?: string[];
  labeledItems?: BlogLabeledItem[];
  bulletItems?: string[];
  table?: BlogComparisonTableData;
  closingBoldText?: string;
  closingParagraphs?: string[];
  subSections?: BlogSubSection[];
  newsletterCallout?: BlogNewsletterCalloutData;
  mediaCallout?: BlogMediaCalloutData;
}

export interface BlogArticleSectionProps {
  className?: string;
  category?: string;
  publishDate?: string;
  articleTitle?: string;
  bannerImage?: BlogMediaImage;
  introText?: string;
  lastUpdatedLabel?: string;
  lastUpdatedDate?: string;
  tocTitle?: string;
  blocks?: BlogArticleBlock[];
}
