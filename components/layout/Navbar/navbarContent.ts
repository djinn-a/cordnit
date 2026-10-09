import { Brain, Briefcase, Cloud, Code, Database, LayoutGrid, Shield, type LucideIcon } from "lucide-react";
import { internalPath } from "@/lib/cms/site-chrome";

export type SolutionVisual = { icon: LucideIcon; iconColor: string; iconBg: string };

/** Built-in icons for Solutions without an uploaded icon, matched by destination path. */
const SOLUTION_VISUALS: Record<string, SolutionVisual> = {
  "/cybersecurity": { icon: Shield, iconColor: "text-primary", iconBg: "bg-white/5" },
  "/cloud-infrastructure": { icon: Cloud, iconColor: "text-orange-400", iconBg: "bg-white/5" },
  "/ai-automation": { icon: Brain, iconColor: "text-purple-400", iconBg: "bg-white/5" },
  "/application-engineering": { icon: Code, iconColor: "text-cyan-400", iconBg: "bg-white/5" },
  "/data-integration": { icon: Database, iconColor: "text-green-400", iconBg: "bg-white/5" },
  "/salesforce": { icon: Briefcase, iconColor: "text-indigo-400", iconBg: "bg-white/5" },
};

const DEFAULT_VISUAL: SolutionVisual = { icon: LayoutGrid, iconColor: "text-white", iconBg: "bg-white/5" };

export function solutionVisual(href: string): SolutionVisual {
  return SOLUTION_VISUALS[internalPath(href) ?? ""] ?? DEFAULT_VISUAL;
}
