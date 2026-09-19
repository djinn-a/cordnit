import * as LucideIcons from "lucide-react";

/**
 * Safely maps a string to a Lucide icon component.
 * Falls back to rendering a Circle icon if the requested icon is not found.
 */
export const getLucideIcon = (iconName: string) => {
  const iconMap = LucideIcons as unknown as Record<string, React.ElementType>;
  return iconMap[iconName] ?? LucideIcons.Circle;
};
