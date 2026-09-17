export type CombinationCard = {
  number: string;
  title: string;
  description: string;
  iconPath: string;
};

export type SolutionsCombinationData = {
  heading: string;
  cards: CombinationCard[];
};

export const combinationData: SolutionsCombinationData = {
  heading: "From direction to durable delivery",
  cards: [
    {
      number: "01",
      title: "Clarify",
      description: "What success looks like and where to focus first.",
      iconPath: "/solutions/ant-design_search-outlined (1).svg",
    },
    {
      number: "02",
      title: "Deliver",
      description: "The capabilities, integrations and experiences that create progress.",
      iconPath: "/solutions/akar-icons_shipping-box-01 (1).svg",
    },
    {
      number: "03",
      title: "Embed and improve",
      description: "Through adoption, governance and managed support.",
      iconPath: "/solutions/streamline_graph-bar-increase (1).svg",
    },
  ],
};
