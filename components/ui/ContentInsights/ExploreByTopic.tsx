import type { ExploreByTopicProps } from "./ContentInsights.types";

export default function ExploreByTopic({
  eyebrow,
  topics,
  onSelectTopic,
}: Readonly<ExploreByTopicProps>) {
  return (
    <div className="pt-6 overflow-hidden md:overflow-visible">
      <h3 className="text-eyebrow-desktop uppercase tracking-[1px] text-primary mb-space-16">
        {eyebrow}
      </h3>
      <div className="flex items-center flex-nowrap md:flex-wrap gap-2 md:gap-2.5 overflow-x-auto md:overflow-x-visible overflow-y-hidden pb-4 -mb-4 md:pb-0 md:mb-0">
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelectTopic?.(topic.id)}
            className={
              topic.isActive
                ? "shrink-0 px-3 md:px-5 py-2 bg-primary text-white rounded-3xl text-link-card-mobile md:text-[14px] md:font-semibold md:leading-5 shadow-sm md:shadow-none transition-colors"
                : "shrink-0 px-3.25 md:px-5.25 py-2.25 md:py-2.25 bg-surface text-ink-muted border border-border-card rounded-3xl text-link-card-mobile md:text-[14px] md:font-semibold md:leading-5 hover:bg-surface-dark transition-colors"
            }
          >
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
}
