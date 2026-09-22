import { Landmark, HeartPulse, ShoppingCart, Factory, GraduationCap, Users, Circle } from "lucide-react";

export type CMSIconName = 
  | "Landmark" 
  | "HeartPulse" 
  | "ShoppingCart" 
  | "Factory" 
  | "GraduationCap" 
  | "Users";

const iconMap: Record<CMSIconName, React.ElementType> = {
  Landmark,
  HeartPulse,
  ShoppingCart,
  Factory,
  GraduationCap,
  Users,
};

/**
 * Safely maps a string to a Lucide icon component using a strict allowed-list.
 * Guarantees zero memory bloat and perfect tree-shaking on the server.
 */
export const getLucideIcon = (iconName: string) => {
  return iconMap[iconName as CMSIconName] ?? Circle;
};
