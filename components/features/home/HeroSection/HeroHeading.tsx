import type { HeroContent as HeroContentType } from "./heroContent";

type HeroHeadingProps = Pick<HeroContentType, "eyebrow" | "titleDesktop">;

export default function HeroHeading({
  eyebrow,
  titleDesktop,
}: Readonly<HeroHeadingProps>) {
  return (
    <div className="text-center mb-space-24 sm:mb-space-32">
      <p className="text-hero-eyebrow mb-space-12">{eyebrow}</p>

      <h1 className="text-hero-display text-center px-space-8 sm:px-0 max-w-4xl mx-auto">
        {titleDesktop.split(". ").map((part, index, array) => (
          <span key={part} className="whitespace-nowrap">
            {part}
            {index < array.length - 1 ? "." : ""}
            {index < array.length - 1 && <br />}
          </span>
        ))}
      </h1>
    </div>
  );
}
