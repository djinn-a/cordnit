/**
 * Proves the import is lossless: every published document must render exactly
 * the props the static site rendered (ignoring the internal array item `_id`s).
 *
 *   npm run cms:verify
 */
import { isDeepStrictEqual } from "node:util";
import snapshot from "@/server/db/seed/snapshot.json";
import { isBlockRef } from "@/lib/cms/document";
import { stripItemIds } from "@/lib/cms/registry/props";
import { loadPublishedDocuments } from "@/server/cms/queries/published";

type SnapshotPage = { slug: string; sections: { type: string; props: Record<string, unknown> }[] };

function firstDiff(a: unknown, b: unknown, path = ""): string | null {
  if (isDeepStrictEqual(a, b)) return null;
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const d = firstDiff((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`);
      if (d) return d;
    }
  }
  return `${path || "<root>"}: expected ${JSON.stringify(a)?.slice(0, 80)} got ${JSON.stringify(b)?.slice(0, 80)}`;
}

async function main() {
  const expected = (snapshot as { pages: SnapshotPage[] }).pages;
  const rows = await loadPublishedDocuments(expected.map((p) => p.slug));
  const bySlug = new Map(rows.map((r) => [r.slug, r.document]));
  let failures = 0;

  for (const page of expected) {
    const doc = bySlug.get(page.slug);
    if (!doc) {
      failures++;
      console.log(`  MISSING  /${page.slug}`);
      continue;
    }
    const problems: string[] = [];
    if (doc.sections.length !== page.sections.length) {
      problems.push(`section count ${doc.sections.length} != ${page.sections.length}`);
    }
    page.sections.forEach((s, i) => {
      const node = doc.sections[i];
      if (!node) return;
      if (isBlockRef(node)) return;
      if (node._type !== s.type) problems.push(`#${i + 1} type ${node._type} != ${s.type}`);
      const diff = firstDiff(s.props, stripItemIds(node.props));
      if (diff) problems.push(`#${i + 1} ${s.type} ${diff}`);
    });
    if (problems.length) {
      failures++;
      console.log(`  FAIL     /${page.slug}\n    ${problems.slice(0, 5).join("\n    ")}`);
    } else {
      console.log(`  ok       /${page.slug}`);
    }
  }

  console.log(failures ? `\n${failures} page(s) differ.` : `\nAll ${expected.length} pages match the static site.`);
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
