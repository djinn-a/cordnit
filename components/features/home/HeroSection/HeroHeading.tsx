import type { HeroContent as HeroContentType } from "./heroContent";

type HeroHeadingProps = Pick<HeroContentType, "eyebrow" | "titleDesktop">;

export default function HeroHeading({
  eyebrow,
  titleDesktop,
}: Readonly<HeroHeadingProps>) {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <p className="text-eyebrow max-sm:text-mobile-subhead max-sm:text-[#2251FF] max-sm:uppercase mb-3">{eyebrow}</p>
      
      <h1 className="text-display max-sm:text-mobile-heading max-sm:text-[#000] text-center px-2 sm:px-0 max-w-4xl mx-auto">
        {titleDesktop.split('. ').map((part, index, array) => (
          <span key={index} className="sm:whitespace-nowrap">
            {part}{index < array.length - 1 ? '.' : ''}
            {index < array.length - 1 && <br />}
          </span>
        ))}
      </h1>
    </div>
  );
}
