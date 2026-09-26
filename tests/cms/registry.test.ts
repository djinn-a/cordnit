import { describe, expect, it } from "vitest";
import { isDeepStrictEqual } from "node:util";
import snapshot from "@/server/db/seed/snapshot.json";
import {
  SECTION_CATALOG,
  SECTION_TYPES,
  getContentJsonSchema,
  getContentSchema,
  isSectionType,
} from "@/lib/cms/registry";
import { mergeSectionProps, splitSectionProps, stripItemIds } from "@/lib/cms/registry/props";
import { getSectionDefaults } from "@/server/cms/section-defaults";

type SnapshotPage = { slug: string; sections: { type: string; props: Record<string, unknown> }[] };
const pages = (snapshot as { pages: SnapshotPage[] }).pages;
const sections = pages.flatMap((p) =>
  p.sections.map((s, i) => ({ label: `/${p.slug} #${i + 1} ${s.type}`, ...s })),
);

describe("section registry", () => {
  it("has catalog metadata for every section type", () => {
    for (const type of SECTION_TYPES) {
      expect(SECTION_CATALOG[type], type).toBeDefined();
      expect(SECTION_CATALOG[type].label, type).toBeTruthy();
    }
  });

  it("produces plain JSON schemas that survive structured cloning", () => {
    for (const type of SECTION_TYPES) {
      const schema = getContentJsonSchema(type);
      expect(schema.type, type).toBe("object");
      expect(structuredClone(schema)).toEqual(schema);
    }
  });

  it("gives every type defaults that pass its own schema", () => {
    for (const type of SECTION_TYPES) {
      const { content } = getSectionDefaults(type);
      const result = getContentSchema(type).safeParse(content);
      expect(result.success, `${type}: ${result.error?.message}`).toBe(true);
    }
  });
});

describe("seed snapshot", () => {
  it("contains only known section types", () => {
    const unknown = sections.filter((s) => !isSectionType(s.type)).map((s) => s.label);
    expect(unknown).toEqual([]);
  });

  it.each(sections)("$label content passes its schema", ({ type, props }) => {
    if (!isSectionType(type)) throw new Error(`unknown type ${type}`);
    const { content } = splitSectionProps(props);
    const result = getContentSchema(type).safeParse(content);
    expect(result.success, result.error?.message).toBe(true);
  });

  it.each(sections)("$label split + parse + merge is lossless", ({ type, props }) => {
    if (!isSectionType(type)) throw new Error(`unknown type ${type}`);
    const { content, systemProps } = splitSectionProps(props);
    const parsed = getContentSchema(type).parse(content) as Record<string, unknown>;
    const merged = stripItemIds(mergeSectionProps(systemProps, parsed));
    expect(isDeepStrictEqual(merged, props), JSON.stringify(merged).slice(0, 300)).toBe(true);
  });
});
