export type HelpService = {
  num: string;
  title: string;
  desc: string;
  iconPath: string;
};

export const defaultHelpServices: HelpService[] = [
  {
    num: "01",
    title: "Cybersecurity",
    desc: "Build a clearer view of risk, protect what matters and strengthen your ability to respond. From cloud, application, identity and data security to managed security, we help make security an enabler of progress.",
    iconPath: "/icons/cybersecurity.svg",
  },
  {
    num: "02",
    title: "Cloud & Infrastructure",
    desc: "Create a cloud foundation that is secure, resilient and ready to change with you. From strategy and modernisation to platform engineering and operations, we help make the cloud work harder for the business.",
    iconPath: "/icons/cloud.svg",
  },
  {
    num: "03",
    title: "AI & Automation",
    desc: "We embed AI and automation into real workflows—removing manual friction, enforcing guardrails, and accelerating how work gets done across the organization.",
    iconPath: "/icons/ai.svg",
  },
  {
    num: "04",
    title: "Data & Integration",
    desc: "We connect fragmented systems into a dependable data backbone—standardizing definitions and flows so teams finally operate from a single, trusted picture.",
    iconPath: "/icons/data.svg",
  },
  {
    num: "05",
    title: "Salesforce",
    desc: "We align Salesforce with surrounding systems and processes—cleaning data, refining workflows, and turning CRM into a source of truth that people actually use.",
    iconPath: "/icons/salesforce.svg",
  },
  {
    num: "06",
    title: "Application Engineering",
    desc: "We build modern, integrated applications and portals that fit your enterprise ecosystem—improving adoption, reducing manual work, and strengthening operations.",
    iconPath: "/icons/engineering.svg",
  },
];
