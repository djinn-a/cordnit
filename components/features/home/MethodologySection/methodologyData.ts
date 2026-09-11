export type MethodologyStep = {
  num: string;
  title: string;
  desc: string;
  tone: "primary" | "ink";
};

export const methodologyData: MethodologyStep[] = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Comprehensive assessment of enterprise architecture, risk profiles, and operational bottlenecks.",
    tone: "primary",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Architecting scalable blueprints and strategic roadmaps tailored for long-term business growth.",
    tone: "ink",
  },
  {
    num: "03",
    title: "IMPLEMENT",
    desc: "Hands-on engineering, tool integration, and seamless deployment across your technology estate.",
    tone: "primary",
  },
  {
    num: "04",
    title: "OPTIMISE",
    desc: "System hardening, performance tuning, and continuous refinement to maximize platform value.",
    tone: "ink",
  },
  {
    num: "05",
    title: "OPERATE",
    desc: "Managed operational support and proactive governance to ensure continuous uptime and adaptability.",
    tone: "primary",
  },
];
