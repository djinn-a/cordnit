import { describe, expect, it } from "vitest";
import { escapeCsvCell, toCsvRow } from "@/lib/leads/csv";

describe("escapeCsvCell", () => {
  it("neutralises spreadsheet formulas", () => {
    expect(escapeCsvCell("=HYPERLINK(\"http://evil\")")).toBe("\"'=HYPERLINK(\"\"http://evil\"\")\"");
    expect(escapeCsvCell("+1-555")).toBe("'+1-555");
    expect(escapeCsvCell("-2+3")).toBe("'-2+3");
    expect(escapeCsvCell("@SUM(A1)")).toBe("'@SUM(A1)");
    expect(escapeCsvCell("\tcmd")).toBe("'\tcmd");
  });

  it("quotes commas, quotes and newlines", () => {
    expect(escapeCsvCell("Acme, Inc.")).toBe('"Acme, Inc."');
    expect(escapeCsvCell('She said "hi"')).toBe('"She said ""hi"""');
    expect(escapeCsvCell("line1\nline2")).toBe('"line1\nline2"');
  });

  it("handles empty values and arrays", () => {
    expect(escapeCsvCell(null)).toBe("");
    expect(escapeCsvCell(undefined)).toBe("");
    expect(escapeCsvCell(["Cloud", "AI"])).toBe("Cloud; AI");
    expect(escapeCsvCell("plain")).toBe("plain");
  });
});

describe("toCsvRow", () => {
  it("joins escaped cells with CRLF line endings", () => {
    expect(toCsvRow(["a", "b,c", null])).toBe('a,"b,c",\r\n');
  });
});
