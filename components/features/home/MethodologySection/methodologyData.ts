export type MethodologyStep = {
  num: string;
  title: string;
  desc: string;
  tone: "primary" | "ink";
  mobileTone: "primary" | "ink";
};

export const methodologyData: MethodologyStep[] = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Comprehensive assessment of enterprise architecture, risk profiles, and operational bottlenecks.",
    tone: "primary",
    mobileTone: "primary",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Architecting scalable blueprints and strategic roadmaps tailored for long-term business growth.",
    tone: "ink",
    mobileTone: "ink",
  },
  {
    num: "03",
    title: "IMPLEMENT",
    desc: "Hands-on engineering, tool integration, and seamless deployment across your technology estate.",
    tone: "primary",
    mobileTone: "ink",
  },
  {
    num: "04",
    title: "OPTIMISE",
    desc: "System hardening, performance tuning, and continuous refinement to maximize platform value.",
    tone: "ink",
    mobileTone: "primary",
  },
  {
    num: "05",
    title: "OPERATE",
    desc: "Managed operational support and proactive governance to ensure continuous uptime and adaptability.",
    tone: "primary",
    mobileTone: "primary",
  },
];
