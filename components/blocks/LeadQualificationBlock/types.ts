export type LeadQualificationStep = {
  id: string;
  numberStr?: string;
  title: string;
  description: string;
  theme?: "white" | "blue";
};

export type LeadQualificationBlockProps = {
  _type: "leadQualificationBlock";
  _key?: string;
  variant?: "left" | "right";
  header: {
    eyebrow: string;
    title: string;
    description: string;
    highlightPrefix?: string;
    highlightText?: string;
    highlightStyle?: "white" | "blue";
  };
  flow: {
    eyebrowLeft: string;
    eyebrowRight: string;
    isGrid?: boolean;
    steps: LeadQualificationStep[];
  };
};
