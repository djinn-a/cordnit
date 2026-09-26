/** Title -> URL slug segment ("AI & Automation" -> "ai-automation"). */
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/-*\/-*/g, "/")
    .replace(/\/{2,}/g, "/")
    .replace(/^[-/]+|[-/]+$/g, "")
    .slice(0, 200);
}
