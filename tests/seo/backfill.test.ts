import { describe, expect, it } from "vitest";
import { SEO_COPY, planSeoCopy } from "@/scripts/cms/seo-copy";
import snapshot from "@/server/db/seed/snapshot.json";

const entry = { previous: { title: "Old T", description: "Old D" }, next: { title: "New T", description: "New D" } };

describe("planSeoCopy", () => {
  it("replaces empty and untouched seed values", () => {
    expect(planSeoCopy({}, entry).map((c) => c.field)).toEqual(["title", "description"]);
    expect(planSeoCopy({ title: "Old T", description: " Old D " }, entry).map((c) => c.to)).toEqual(["New T", "New D"]);
  });

  it("never overwrites values an editor changed", () => {
    expect(planSeoCopy({ title: "Edited", description: "Also edited" }, entry)).toEqual([]);
    expect(planSeoCopy({ title: "Edited", description: "Old D" }, entry)).toEqual([
      { field: "description", from: "Old D", to: "New D" },
    ]);
  });

  it("is idempotent", () => expect(planSeoCopy(entry.next, entry)).toEqual([]));
});

describe("SEO_COPY", () => {
  it("covers every seeded page and matches the snapshot", () => {
    for (const page of snapshot.pages) {
      expect(SEO_COPY[page.slug], page.slug).toBeDefined();
      expect(page.seo).toMatchObject(SEO_COPY[page.slug].next);
    }
  });

  it.each(Object.entries(SEO_COPY))("%s stays within search length limits", (_, { next }) => {
    expect(next.title.length).toBeLessThanOrEqual(70);
    expect(next.description.length).toBeGreaterThanOrEqual(110);
    expect(next.description.length).toBeLessThanOrEqual(170);
  });
});
