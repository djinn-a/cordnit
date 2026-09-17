import type { ExploreByTopicProps } from "./ContentInsights.types";

export default function ExploreByTopic({
  eyebrow,
  topics,
  onSelectTopic,
}: Readonly<ExploreByTopicProps>) {
  return (
    <div className="pt-6">
      <h3 className="text-eyebrow-desktop uppercase tracking-[1px] text-primary mb-space-16">
        {eyebrow}
      </h3>
      <div className="flex items-center flex-wrap gap-2.5">
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelectTopic?.(topic.id)}
            className={
              topic.isActive
                ? "px-5 py-2 bg-primary text-white rounded-3xl text-[14px] font-semibold leading-5 transition-colors"
                : "px-5.25 py-2.25 bg-surface text-ink-muted border border-border-card rounded-3xl text-[14px] font-semibold leading-5 hover:bg-surface-dark transition-colors"
            }
          >
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
}
