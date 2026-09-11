export type PrincipleItemType = {
  number: string;
  title: string;
  description: string;
};

export const principlesData: PrincipleItemType[] = [
  {
    number: "01",
    title: "STAY CLOSE TO THE REAL PROBLEM",
    description:
      "We avoid getting lost in technical abstraction. Every decision is anchored to the practical outcomes our clients need to achieve.",
  },
  {
    number: "02",
    title: "MAKE COMPLEXITY USABLE",
    description:
      "Enterprise technology is inherently complex. Our job is to abstract that complexity so teams can focus on their work, not their tools.",
  },
  {
    number: "03",
    title: "BUILD FOR THE LONG TERM",
    description:
      "We design solutions that can adapt and scale. Short-term fixes often create long-term debt; we architect for endurance.",
  },
  {
    number: "04",
    title: "WORK AS ONE TEAM",
    description:
      "Transformation happens when internal knowledge meets external expertise. We integrate seamlessly with your people to drive change together.",
  },
];
