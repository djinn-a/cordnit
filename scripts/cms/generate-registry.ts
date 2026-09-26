/**
 * Scaffolds section content schemas + defaults from real content samples.
 *
 *   npx tsx scripts/cms/generate-registry.ts
 *
 * Outputs:
 *   lib/cms/registry/schemas.generated.ts   (review, then hand-maintain)
 *   server/cms/section-defaults.json         (prefill for newly added sections)
 *
 * Re-run only when introducing new section types; it overwrites both files.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { SECTION_TYPES } from "@/lib/cms/types";
import { ITEM_ID_KEY, isPlainObject, splitSectionProps } from "@/lib/cms/registry/props";

type Snapshot = {
  pages: { sections: { type: string; props: Record<string, unknown> }[] }[];
  samples: Record<string, Record<string, unknown>>;
};

type Shape =
  | { kind: "string"; maxLen: number; key: string; allLinks: boolean }
  | { kind: "number" }
  | { kind: "object"; count: number; fields: Map<string, { shape: Shape; count: number }> }
  | { kind: "array"; item: Shape | null }
  | { kind: "mixed" };

function infer(value: unknown, key: string): Shape {
  if (typeof value === "string") {
    return { kind: "string", maxLen: value.length, key, allLinks: value === "" || LINK_VALUE.test(value) };
  }
  if (typeof value === "number") return { kind: "number" };
  if (Array.isArray(value)) {
    let item: Shape | null = null;
    for (const v of value) item = item ? mergeShape(item, infer(v, key)) : infer(v, key);
    return { kind: "array", item };
  }
  if (isPlainObject(value)) {
    const fields = new Map<string, { shape: Shape; count: number }>();
    for (const [k, v] of Object.entries(value)) {
      if (k === ITEM_ID_KEY) continue;
      fields.set(k, { shape: infer(v, k), count: 1 });
    }
    return { kind: "object", count: 1, fields };
  }
  return { kind: "mixed" };
}

function mergeShape(a: Shape, b: Shape): Shape {
  if (a.kind === "string" && b.kind === "string") {
    return { ...a, maxLen: Math.max(a.maxLen, b.maxLen), allLinks: a.allLinks && b.allLinks };
  }
  if (a.kind === "number" && b.kind === "number") return a;
  if (a.kind === "array" && b.kind === "array") {
    if (!a.item) return b;
    if (!b.item) return a;
    return { kind: "array", item: mergeShape(a.item, b.item) };
  }
  if (a.kind === "object" && b.kind === "object") {
    const fields = new Map(a.fields);
    for (const [k, f] of b.fields) {
      const existing = fields.get(k);
      fields.set(k, existing ? { shape: mergeShape(existing.shape, f.shape), count: existing.count + f.count } : f);
    }
    return { kind: "object", count: a.count + b.count, fields };
  }
  if ((a.kind === "string" && b.kind === "number") || (a.kind === "number" && b.kind === "string")) {
    return a.kind === "string" ? a : b;
  }
  return { kind: "mixed" };
}

const ACRONYMS: Record<string, string> = {
  cta: "CTA",
  seo: "SEO",
  url: "URL",
  ai: "AI",
  id: "ID",
  faq: "FAQ",
  num: "number",
  desc: "description",
  href: "link",
};

function humanize(key: string): string {
  const cleaned = key.replace(/Str$/, "");
  const words = cleaned
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => ACRONYMS[w.toLowerCase()] ?? w.toLowerCase());
  if (words.length === 0) return key;
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
}

function singular(label: string): string {
  if (/ies$/i.test(label)) return label.replace(/ies$/i, "y");
  if (/(ss|us)$/i.test(label)) return label;
  return label.replace(/s$/i, "");
}

const TEXTAREA_KEY = /desc|body|paragraph|summary|quote|content|subtitle|highlight|intro|detail|message|answer|consent|text$|excerpt|bio/i;
const LINK_KEY = /href|url$|link$/i;
const LINK_VALUE = /^(\/|#|https?:\/\/|mailto:|tel:)/;

function q(s: string) {
  return JSON.stringify(s);
}

function emit(shape: Shape, key: string, indent: string): string {
  const label = humanize(key);
  switch (shape.kind) {
    case "string": {
      if (LINK_KEY.test(key) && shape.allLinks) return `link(${q(label)})`;
      if (TEXTAREA_KEY.test(key) || shape.maxLen > 90) {
        return `textarea(${q(label)}, ${Math.max(2000, Math.ceil((shape.maxLen * 3) / 500) * 500)})`;
      }
      return `text(${q(label)}, ${Math.max(300, Math.ceil((shape.maxLen * 3) / 100) * 100)})`;
    }
    case "number":
      return `num(${q(label)})`;
    case "mixed":
      return `z.unknown().meta({ label: ${q(label)} })`;
    case "array": {
      if (!shape.item) return `stringList(${q(label)})`;
      if (shape.item.kind === "object") {
        return `list(${q(label)}, ${q(singular(label))}, ${emitFields(shape.item, `${indent}  `)})`;
      }
      if (shape.item.kind === "string" || shape.item.kind === "number") {
        return `stringList(${q(label)}, ${emit({ kind: "string", maxLen: shape.item.kind === "string" ? shape.item.maxLen : 10, key: singular(key), allLinks: false }, singular(key), indent)})`;
      }
      return `z.array(z.unknown()).meta({ label: ${q(label)} })`;
    }
    case "object":
      return `group(${q(label)}, ${emitFields(shape, `${indent}  `)})`;
  }
}

function emitFields(shape: Extract<Shape, { kind: "object" }>, indent: string): string {
  const lines: string[] = [];
  for (const [k, f] of shape.fields) {
    const optional = f.count < shape.count ? ".optional()" : "";
    const safeKey = /^[A-Za-z_$][\w$]*$/.test(k) ? k : q(k);
    lines.push(`${indent}${safeKey}: ${emit(f.shape, k, indent)}${optional},`);
  }
  return `{\n${lines.join("\n")}\n${indent.slice(2)}}`;
}

function main() {
  const snapshot = JSON.parse(readFileSync("server/db/seed/snapshot.json", "utf8")) as Snapshot;
  const byType = new Map<string, Record<string, unknown>[]>();
  for (const page of snapshot.pages) {
    for (const s of page.sections) {
      const list = byType.get(s.type) ?? [];
      list.push(s.props);
      byType.set(s.type, list);
    }
  }
  for (const [type, props] of Object.entries(snapshot.samples)) {
    if (!byType.has(type)) byType.set(type, [props]);
  }

  const defaults: Record<string, { content: unknown; systemProps: unknown }> = {};
  const blocks: string[] = [];
  for (const type of SECTION_TYPES) {
    const samples = byType.get(type) ?? [];
    let shape: Shape = { kind: "object", count: 0, fields: new Map() };
    for (const props of samples) shape = mergeShape(shape, infer(splitSectionProps(props).content, type));
    if (shape.kind !== "object") shape = { kind: "object", count: 1, fields: new Map() };
    if (shape.count === 0) shape.count = 1;
    blocks.push(`  ${type}: section(${emitFields(shape, "    ")}),`);
    const sample = snapshot.samples[type] ?? samples[0] ?? {};
    defaults[type] = splitSectionProps(sample);
  }

  const body = blocks.join("\n");
  const builders = ["group", "link", "list", "num", "section", "stringList", "text", "textarea"].filter((b) =>
    new RegExp(`\\b${b}\\(`).test(body),
  );

  const file = `/**
 * Section content schemas: the editable (text-only) contract per section type.
 * Scaffolded by scripts/cms/generate-registry.ts from real content, then
 * hand-maintained. Images, icons, variants and ids live in systemProps and are
 * intentionally absent here.
 */
import { z } from "zod";
import type { SectionType } from "../types";
import { ${builders.join(", ")} } from "./fields";

export const sectionContentSchemas = {
${body}
} satisfies Record<SectionType, z.ZodObject>;

export type SectionContentMap = {
  [K in SectionType]: z.infer<(typeof sectionContentSchemas)[K]>;
};
`;
  writeFileSync("lib/cms/registry/schemas.generated.ts", file);
  mkdirSync("server/cms", { recursive: true });
  writeFileSync("server/cms/section-defaults.json", `${JSON.stringify(defaults, null, 2)}\n`);
  console.log(`Generated schemas for ${SECTION_TYPES.length} section types.`);
}

main();
