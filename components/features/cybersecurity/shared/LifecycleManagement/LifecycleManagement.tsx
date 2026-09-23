import { GridFeatureBlock, GridFeatureCardData } from "@/components/blocks/GridFeatureBlock";

export type LifecycleManagementProps = {
  data: {
    header: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cards: GridFeatureCardData[];
  };
};

export default function LifecycleManagement({ data }: LifecycleManagementProps) {
  if (!data) return null;

  return (
    <GridFeatureBlock 
      variant="outline" 
      header={data.header} 
      cards={data.cards} 
    />
  );
}
