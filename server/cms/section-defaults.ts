import "server-only";
import type { SectionProps } from "@/lib/cms/document";
import { FOOTER_DEFAULTS, NAVBAR_DEFAULTS } from "@/lib/cms/site-chrome-defaults";
import type { SectionType } from "@/lib/cms/types";
import defaults from "./section-defaults.json";

type SectionDefaults = { content: SectionProps; systemProps: SectionProps };

const table: Partial<Record<SectionType, SectionDefaults>> = {
  ...(defaults as unknown as Partial<Record<SectionType, SectionDefaults>>),
  navbar: { content: NAVBAR_DEFAULTS, systemProps: {} },
  footer: { content: FOOTER_DEFAULTS, systemProps: {} },
};

/** Prefill for a newly added section: real copy + the hidden images it needs to render. */
export function getSectionDefaults(type: SectionType): SectionDefaults {
  const entry = table[type];
  return structuredClone(entry ?? { content: {}, systemProps: {} });
}
