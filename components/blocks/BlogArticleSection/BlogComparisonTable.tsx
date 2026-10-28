import MultilineText from "@/components/ui/MultilineText/MultilineText";
import type { BlogComparisonTableData } from "./BlogArticleSection.types";

export interface BlogComparisonTableProps {
  table: BlogComparisonTableData;
}

export default function BlogComparisonTable({
  table,
}: Readonly<BlogComparisonTableProps>) {
  if (!table.rows?.length) return null;

  return (
    <div className="w-full bg-surface rounded-card-sm shadow-help-card border border-border-card flex flex-col justify-start items-start overflow-hidden">
      {/* Table Header */}
      <div className="w-full bg-primary-pale border-b border-border-card flex justify-between items-start">
        <div className="w-48 px-space-16 py-space-14 flex flex-col justify-start items-start">
          <span className="text-ink text-link-desktop font-bold font-mulish uppercase">
            {table.layerHeader}
          </span>
        </div>
        <div className="w-80 px-space-16 py-space-14 flex flex-col justify-start items-start">
          <span className="text-ink text-link-desktop font-bold font-mulish uppercase">
            {table.focusHeader}
          </span>
        </div>
        <div className="w-64 px-space-16 py-space-14 flex flex-col justify-start items-start">
          <span className="text-ink text-link-desktop font-bold font-mulish uppercase">
            {table.benefitHeader}
          </span>
        </div>
      </div>

      {/* Table Body */}
      <div className="w-full flex flex-col justify-start items-start divide-y divide-border-card">
        {table.rows.map((row, idx) => (
          <div
            key={row._id ?? `${row.layer}-${idx}`}
            className="w-full flex justify-between items-start"
          >
            <div className="w-48 p-space-16 flex justify-start items-center gap-space-8">
              <span
                className="size-2 bg-primary rounded-full shrink-0"
                aria-hidden="true"
              />
              <span className="text-ink text-link-mobile font-semibold font-mulish">
                {row.layer}
              </span>
            </div>

            <div className="w-80 p-space-16 flex flex-col justify-start items-start">
              <span className="text-ink-muted text-help-card-desc-mobile font-normal font-mulish">
                <MultilineText text={row.focus} />
              </span>
            </div>

            <div className="w-64 p-space-16 flex flex-col justify-start items-start">
              <span className="text-ink-muted text-link-mobile font-semibold font-mulish">
                <MultilineText text={row.benefit} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
