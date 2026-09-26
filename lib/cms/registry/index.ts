import { z } from "zod";
import { SECTION_TYPES, isSectionType, type SectionType } from "../types";
import { SECTION_CATALOG, SECTION_CATEGORIES, type SectionCatalogEntry } from "./catalog";
import { sectionContentSchemas, type SectionContentMap } from "./schemas.generated";

export { SECTION_CATALOG, SECTION_CATEGORIES, SECTION_TYPES, isSectionType, sectionContentSchemas };
export type { SectionCatalogEntry, SectionContentMap, SectionType };
export { mergeSectionProps, splitSectionProps, stripItemIds, ITEM_ID_KEY } from "./props";

export function getContentSchema<T extends SectionType>(type: T) {
  return sectionContentSchemas[type];
}

/** JSON Schema (with field meta) consumed by the admin form generator. */
export type ContentJsonSchema = Record<string, unknown>;

const jsonSchemaCache = new Map<SectionType, ContentJsonSchema>();

export function getContentJsonSchema(type: SectionType): ContentJsonSchema {
  const cached = jsonSchemaCache.get(type);
  if (cached) return cached;
  // Round-trip through JSON so the result is plain data that can cross the RSC boundary.
  const schema = JSON.parse(
    JSON.stringify(z.toJSONSchema(sectionContentSchemas[type], { unrepresentable: "any", io: "input" })),
  ) as ContentJsonSchema;
  jsonSchemaCache.set(type, schema);
  return schema;
}

export type SectionTypeOption = SectionCatalogEntry & { type: SectionType };

export function listSectionTypeOptions(): SectionTypeOption[] {
  return SECTION_TYPES.map((type) => ({ type, ...SECTION_CATALOG[type] }));
}
