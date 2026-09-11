import { Button } from "@/components/ui";
import { AboutTabContent } from "./aboutContentData";

export type AboutContentTabsProps = {
  tabs: AboutTabContent[];
  activeTabId: string;
  onTabChange: (id: string) => void;
};

export default function AboutContentTabs({
  tabs,
  activeTabId,
  onTabChange,
}: AboutContentTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <Button
            key={tab.id}
            size="sm"
            variant={isActive ? "primary" : "outline"}
            onClick={() => onTabChange(tab.id)}
            className={`rounded-full px-4 md:px-5 ${
              isActive
                ? "text-surface"
                : "text-ink-muted md:text-primary border-border-subtle md:border-primary"
            }`}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
