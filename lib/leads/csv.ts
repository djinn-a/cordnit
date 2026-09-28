const FORMULA_TRIGGERS = new Set(["=", "+", "-", "@", "\t", "\r"]);

/**
 * RFC 4180 quoting plus spreadsheet formula-injection defence: any value a
 * spreadsheet could evaluate is prefixed with an apostrophe so it stays text.
 */
export function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = Array.isArray(value) ? value.join("; ") : String(value);
  if (text.length > 0 && FORMULA_TRIGGERS.has(text[0])) text = `'${text}`;
  if (/[",\r\n]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function toCsvRow(values: readonly unknown[]): string {
  return `${values.map(escapeCsvCell).join(",")}\r\n`;
}
