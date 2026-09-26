import { componentMap } from "@/lib/cms/component-map";
import type { InlineSectionNode } from "@/lib/cms/document";

type SectionRendererProps = {
  sections: readonly InlineSectionNode[];
};

export default function SectionRenderer({ sections }: Readonly<SectionRendererProps>) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        const Component = section?._type ? componentMap[section._type] : undefined;
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`[SectionRenderer] Unknown section type: ${String(section?._type)}`);
          }
          return null;
        }
        const props = section.props && typeof section.props === "object" ? section.props : {};
        return <Component key={section._key || section._type} {...props} />;
      })}
    </>
  );
}
