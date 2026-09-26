import { describe, expect, it } from "vitest";
import {
  ITEM_ID_KEY,
  isSystemKey,
  mergeSectionProps,
  splitSectionProps,
  stripItemIds,
} from "@/lib/cms/registry/props";

describe("isSystemKey", () => {
  it.each(["imageSrc", "icon", "logoUrl", "variant", "className", "alt", "id", "backgroundTone"])(
    "treats %s as hidden presentation data",
    (key) => expect(isSystemKey(key)).toBe(true),
  );

  it.each(["title", "description", "buttonText", "eyebrow", "label"])("treats %s as editable text", (key) =>
    expect(isSystemKey(key)).toBe(false),
  );
});

describe("splitSectionProps / mergeSectionProps", () => {
  const props = {
    title: "Our services",
    image: "/hero.webp",
    showCta: true,
    cards: [
      { id: "a", title: "Cloud", icon: "cloud" },
      { id: "b", title: "Security", icon: "shield" },
    ],
    tags: ["one", "two"],
  };

  it("keeps text in content and presentation in systemProps", () => {
    const { content, systemProps } = splitSectionProps(props);
    expect(content).toEqual({
      title: "Our services",
      cards: [
        { [ITEM_ID_KEY]: "a", title: "Cloud" },
        { [ITEM_ID_KEY]: "b", title: "Security" },
      ],
      tags: ["one", "two"],
    });
    expect(systemProps).toEqual({
      image: "/hero.webp",
      showCta: true,
      cards: [
        { [ITEM_ID_KEY]: "a", id: "a", icon: "cloud" },
        { [ITEM_ID_KEY]: "b", id: "b", icon: "shield" },
      ],
    });
  });

  it("round-trips to the original props", () => {
    const { content, systemProps } = splitSectionProps(props);
    expect(stripItemIds(mergeSectionProps(systemProps, content))).toEqual(props);
  });

  it("keeps images attached to their card after a reorder", () => {
    const { content, systemProps } = splitSectionProps(props);
    const cards = content.cards as Record<string, unknown>[];
    const merged = mergeSectionProps(systemProps, { ...content, cards: [cards[1], cards[0]] });
    expect(merged.cards).toEqual([
      { id: "b", title: "Security", icon: "shield" },
      { id: "a", title: "Cloud", icon: "cloud" },
    ]);
  });

  it("gives a new item a sibling's presentation but its own identity", () => {
    const { content, systemProps } = splitSectionProps(props);
    const cards = [...(content.cards as Record<string, unknown>[]), { [ITEM_ID_KEY]: "new1", title: "AI" }];
    const merged = mergeSectionProps(systemProps, { ...content, cards });
    expect((merged.cards as Record<string, unknown>[])[2]).toEqual({ id: "new1", title: "AI", icon: "shield" });
  });

  it("drops a removed item's presentation", () => {
    const { content, systemProps } = splitSectionProps(props);
    const merged = mergeSectionProps(systemProps, {
      ...content,
      cards: [(content.cards as Record<string, unknown>[])[1]],
    });
    expect(merged.cards).toEqual([{ id: "b", title: "Security", icon: "shield" }]);
  });

  it("de-duplicates colliding item ids", () => {
    const { content } = splitSectionProps({ items: [{ id: "x", title: "1" }, { id: "x", title: "2" }] });
    const ids = (content.items as Record<string, unknown>[]).map((i) => i[ITEM_ID_KEY]);
    expect(new Set(ids).size).toBe(2);
  });

  it("tolerates null inputs", () => {
    expect(mergeSectionProps(null, undefined)).toEqual({});
  });
});
