import "server-only";
import type { SectionProps } from "@/lib/cms/document";
import { getContentSchema } from "@/lib/cms/registry";
import { isSectionType } from "@/lib/cms/types";
import { errors, zodToFieldErrors } from "@/server/errors";

/** Parses editable content against its section schema; unknown keys are stripped. */
export function parseSectionContent(type: string, content: unknown): SectionProps {
  if (!isSectionType(type)) throw errors.validation(`Unknown section type "${type}".`);
  const result = getContentSchema(type).safeParse(content ?? {});
  if (!result.success) {
    throw errors.validation("Some fields are invalid.", zodToFieldErrors(result.error));
  }
  return result.data as SectionProps;
}

export function checkSectionContent(
  type: string,
  content: unknown,
): { ok: true } | { ok: false; fieldErrors: Record<string, string[]> } {
  if (!isSectionType(type)) return { ok: false, fieldErrors: { _root: [`Unknown section type "${type}".`] } };
  const result = getContentSchema(type).safeParse(content ?? {});
  return result.success ? { ok: true } : { ok: false, fieldErrors: zodToFieldErrors(result.error) };
}
