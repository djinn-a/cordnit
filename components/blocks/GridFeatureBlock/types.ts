export interface GridFeatureCardData {
  id?: string;
  numberStr: string;      
  title: string;
  description: string;
  iconName: string;       
  pills?: string[];       
}

export interface GridFeatureBlockProps {
  variant: "solid" | "outline"; 
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cards: GridFeatureCardData[];
}
