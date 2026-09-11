import { componentMap } from "@/lib/cms/component-map";
import type { PageSection } from "@/lib/cms/types";

type SectionRendererProps = {
  sections: PageSection[];
};

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const Component = componentMap[section._type];
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`[SectionRenderer] Unknown section type: ${section._type}`);
          }
          return null;
        }

        const { _type, _key, ...props } = section;
        return <Component key={_key || _type} {...props} />;
      })}
    </>
  );
}
