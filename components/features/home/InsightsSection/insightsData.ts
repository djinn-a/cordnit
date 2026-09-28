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
    title: "Why Security Architecture Must Precede Digital",
    image: "/InsightsSection/cybersecurity_insight_2x.webp",
    readMoreUrl: "/insights/cybersecurity-digital-transformation",
  },
  {
    id: 2,
    tag: "Growth SALESFORCE",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Eliminating Platform Silos to Drive True CRM Adoption",
    image: "/InsightsSection/salesforce_insight_3x.webp",
    readMoreUrl: "/insights/salesforce-digital-transformation",
  },
  {
    id: 3,
    tag: "AI & AUTOMATION",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Embedding Guardrails into High-Impact Enterprise Workflows",
    image: "/InsightsSection/ai_automation_insight_3x.webp",
    readMoreUrl: "/insights/ai-automation-digital-transformation",
  },
  {
    id: 4,
    tag: "CLOUD & INFRASTRUCTURE",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Modernizing Foundations for Operational Resilience and Uptime",
    image: "/InsightsSection/cloud_infrastructure_insight_4x.webp",
    readMoreUrl: "/insights/cloud-infrastructure-digital-transformation",
  },
];
