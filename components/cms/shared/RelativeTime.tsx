"use client";

import { Tooltip } from "antd";

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const full = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" });

export function formatRelative(date: Date, now = Date.now()): string {
  const seconds = Math.round((date.getTime() - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

export default function RelativeTime({ value }: Readonly<{ value: Date | string | null | undefined }>) {
  if (!value) return <span>—</span>;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return <span>—</span>;
  return (
    <Tooltip title={full.format(date)}>
      <time dateTime={date.toISOString()} suppressHydrationWarning>
        {formatRelative(date)}
      </time>
    </Tooltip>
  );
}
