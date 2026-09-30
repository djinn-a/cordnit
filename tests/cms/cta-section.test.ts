import { describe, expect, it } from "vitest";
import snapshot from "@/server/db/seed/snapshot.json";
import { getContentSchema } from "@/lib/cms/registry";
import { splitSectionProps } from "@/lib/cms/registry/props";
import { getSectionDefaults } from "@/server/cms/section-defaults";

type SnapshotPage = { slug: string; sections: { type: string; props: Record<string, unknown> }[] };
const pages = (snapshot as { pages: SnapshotPage[] }).pages;

describe("per-page CTA section", () => {
  it("is the last section of every snapshot page, exactly once", () => {
    for (const page of pages) {
      const types = page.sections.map((s) => s.type);
      expect(types.at(-1), `/${page.slug}`).toBe("cta");
      expect(types.filter((t) => t === "cta"), `/${page.slug}`).toHaveLength(1);
    }
  });

  it("has valid editable content and the images it needs to render", () => {
    const schema = getContentSchema("cta");
    for (const page of pages) {
      const cta = page.sections.at(-1)!;
      const { content, systemProps } = splitSectionProps(cta.props, schema);
      expect(schema.safeParse(content).success, `/${page.slug}`).toBe(true);
      expect(systemProps, `/${page.slug}`).toMatchObject({
        backgroundSrc: expect.any(String),
        backgroundSrcMobile: expect.any(String),
        portraitSrc: expect.any(String),
      });
    }
  });

  it("matches the defaults used by Add section", () => {
    const defaults = getSectionDefaults("cta");
    for (const page of pages) {
      expect(page.sections.at(-1)!.props, `/${page.slug}`).toEqual({ ...defaults.content, ...defaults.systemProps });
    }
  });
});
