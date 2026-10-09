import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionContentMap } from "@/lib/cms/registry";
import { solutionVisual } from "./navbarContent";
import styles from "./Navbar.module.css";

type SolutionsMenuContent = SectionContentMap["navbar"]["solutionsMenu"];
type Solution = SolutionsMenuContent["items"][number];

export function SolutionIcon({ item }: Readonly<{ item: Solution }>) {
  if (item.icon?.url) {
    return (
      <div className="w-10 h-10 rounded flex items-center justify-center mb-4 bg-white/5">
        {/* Uploaded icons (including SVG) are only ever rendered through <img>. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.icon.url} alt="" width={20} height={20} className="h-5 w-5 object-contain" loading="lazy" decoding="async" />
      </div>
    );
  }
  const visual = solutionVisual(item.href);
  return (
    <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${visual.iconBg}`}>
      <visual.icon aria-hidden className={`h-5 w-5 ${visual.iconColor}`} />
    </div>
  );
}

/** Server-rendered panel content; NavbarClient's SolutionsMenu shows and hides it. */
export default function MegaMenu({ content }: Readonly<{ content: SolutionsMenuContent }>) {
  return (
    <div className="max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-4 sm:px-6 lg:px-8 flex">
      <div className={`py-12 pr-12 flex flex-col items-start border-r border-white/10 relative ${styles.megaMenuLeftPanel}`}>
        <p className={`text-white font-bold tracking-widest uppercase mb-6 opacity-90 ${styles.text11}`}>{content.panelTitle}</p>
        <p className={`text-white font-medium leading-relaxed mb-8 opacity-90 ${styles.text15}`}>{content.panelDescription}</p>
        {content.exploreAllHref ? (
          <Link href={content.exploreAllHref} className={`flex items-center text-white font-bold uppercase tracking-widest hover:opacity-80 transition-opacity mt-auto ${styles.text11}`}>
            {content.exploreAllLabel} <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
          </Link>
        ) : null}
      </div>

      <ul className={`py-12 pl-12 grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 ${styles.megaMenuRightPanel}`}>
        {content.items.map((item) => {
          const card = (
            <>
              <SolutionIcon item={item} />
              <span className={`block text-white font-semibold mb-2 ${styles.text15}`}>{item.title}</span>
              <span className={`block text-white/70 leading-relaxed ${styles.text13}`}>{item.description}</span>
            </>
          );
          return (
            <li key={item._id}>
              {item.href ? (
                <Link href={item.href} className="group/item flex flex-col items-start hover:opacity-80 transition-opacity">{card}</Link>
              ) : (
                <div className="group/item flex flex-col items-start">{card}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
