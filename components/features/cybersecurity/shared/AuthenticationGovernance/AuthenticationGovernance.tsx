import { GridFeatureBlock, GridFeatureCardData } from "@/components/blocks/GridFeatureBlock";

export type AuthenticationGovernanceProps = {
  data: {
    header: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cards: GridFeatureCardData[];
  };
};

export default function AuthenticationGovernance({ data }: AuthenticationGovernanceProps) {
  if (!data) return null;

  return (
    <GridFeatureBlock 
      variant="solid" 
      header={data.header} 
      cards={data.cards} 
    />
  );
}
