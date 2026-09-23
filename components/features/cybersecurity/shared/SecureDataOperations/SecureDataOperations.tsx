import { PhaseFeatureBlock, PhaseFeatureCardData } from "@/components/blocks/PhaseFeatureBlock";

export type SecureDataOperationsProps = {
  data: {
    header: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cards: PhaseFeatureCardData[];
  };
};

export default function SecureDataOperations({ data }: SecureDataOperationsProps) {
  if (!data) return null;

  return (
    <PhaseFeatureBlock 
      header={data.header} 
      cards={data.cards} 
    />
  );
}
