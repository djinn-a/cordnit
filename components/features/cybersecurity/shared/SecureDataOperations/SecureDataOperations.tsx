import { PhaseFeatureBlock, PhaseFeatureCardData } from "@/components/blocks/PhaseFeatureBlock";

export type SecureDataOperationsProps = {
  data: {
    headerLayout?: "split" | "stacked";
    cardStyle?: "default" | "pale-blue";
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
      headerLayout={data.headerLayout}
      cardStyle={data.cardStyle}
    />
  );
}
