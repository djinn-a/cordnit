import { generateKeyBetween } from "fractional-indexing";
import { describe, expect, it } from "vitest";
import { keyBetween } from "@/server/cms/positions";

/** Mirrors Postgres `COLLATE "C"`: plain byte-order comparison. */
const byteOrder = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

describe("fractional section positions", () => {
  it("appends in ascending order", () => {
    const keys: string[] = [];
    let last: string | null = null;
    for (let i = 0; i < 50; i++) keys.push((last = generateKeyBetween(last, null)));
    expect([...keys].sort(byteOrder)).toEqual(keys);
  });

  it("inserts between neighbours without touching them", () => {
    const a = generateKeyBetween(null, null);
    const c = generateKeyBetween(a, null);
    const b = generateKeyBetween(a, c);
    expect(byteOrder(a, b)).toBe(-1);
    expect(byteOrder(b, c)).toBe(-1);
  });

  it("survives many inserts at the same spot", () => {
    const first = generateKeyBetween(null, null);
    let upper = generateKeyBetween(first, null);
    for (let i = 0; i < 200; i++) {
      const mid = generateKeyBetween(first, upper);
      expect(byteOrder(first, mid)).toBe(-1);
      expect(byteOrder(mid, upper)).toBe(-1);
      upper = mid;
    }
    expect(upper.length).toBeLessThan(64);
  });

  it("prepends before the first key", () => {
    const first = generateKeyBetween(null, null);
    expect(byteOrder(generateKeyBetween(null, first), first)).toBe(-1);
  });

  it.each([
    ["reversed", "a1", "a0"],
    ["equal", "a0", "a0"],
  ])("keyBetween rejects %s neighbours as a stale write", (_, a, b) => {
    expect(() => keyBetween(a, b)).toThrow(expect.objectContaining({ code: "STALE" }));
  });

  it("keyBetween matches the library for valid neighbours", () => {
    expect(keyBetween("a0", "a1")).toBe(generateKeyBetween("a0", "a1"));
    expect(keyBetween(null, null)).toBe(generateKeyBetween(null, null));
  });
});
