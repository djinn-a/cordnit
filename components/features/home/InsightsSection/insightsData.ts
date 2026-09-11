export type InsightItem = {
  id: string | number;
  tag: string;
  date: string;
  type: string;
  title: string;
  image: string;
  readMoreUrl: string;
};

export const insightsData: InsightItem[] = [
  {
    id: 1,
    tag: "CYBERSECURITY",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image: "/InsightsSection/cybersecurity.jpg",
    readMoreUrl: "/insights/cybersecurity-digital-transformation",
  },
  {
    id: 2,
    tag: "SALESFORCE",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image: "/InsightsSection/salesforce.jpg",
    readMoreUrl: "/insights/salesforce-digital-transformation",
  },
  {
    id: 3,
    tag: "AI & AUTOMATION",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image: "/InsightsSection/ai-automation.jpg",
    readMoreUrl: "/insights/ai-automation-digital-transformation",
  },
  {
    id: 4,
    tag: "CLOUD & INFRASTRUCTURE",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image: "/InsightsSection/cloud-infrastructure.jpg",
    readMoreUrl: "/insights/cloud-infrastructure-digital-transformation",
  },
];
