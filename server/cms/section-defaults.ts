import "server-only";
import type { SectionProps } from "@/lib/cms/document";
import type { SectionType } from "@/lib/cms/types";
import defaults from "./section-defaults.json";

type SectionDefaults = { content: SectionProps; systemProps: SectionProps };

const table = defaults as unknown as Partial<Record<SectionType, SectionDefaults>>;

/** Prefill for a newly added section: real copy + the hidden images it needs to render. */
export function getSectionDefaults(type: SectionType): SectionDefaults {
  const entry = table[type];
  return structuredClone(entry ?? { content: {}, systemProps: {} });
}
