import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MegaMenuContent, SolutionItem } from './navbarContent';
import styles from './Navbar.module.css';

interface MegaMenuProps {
  content: MegaMenuContent;
  solutions: SolutionItem[];
}

export default function MegaMenu({ content, solutions }: MegaMenuProps) {
  return (
    <div className="absolute top-20 left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out border-t border-white/5 shadow-2xl bg-gradient-to-r from-primary to-surface-darker pointer-events-none group-hover:pointer-events-auto">
      <div className="max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        
        {/* Left Panel */}
        <div className={`py-12 pr-12 flex flex-col items-start border-r border-white/10 relative ${styles.megaMenuLeftPanel}`}>
          <h3 className={`text-white font-bold tracking-widest uppercase mb-6 opacity-90 ${styles.text11}`}>{content.leftPanelTitle}</h3>
          <p className={`text-white font-medium leading-relaxed mb-8 opacity-90 ${styles.text15}`}>
            {content.leftPanelDescription}
          </p>
          <Link href={content.exploreAllHref} className={`flex items-center text-white font-bold uppercase tracking-widest hover:opacity-80 transition-opacity mt-auto ${styles.text11}`}>
            {content.exploreAllLabel} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Right Panel */}
        <div className={`py-12 pl-12 grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 ${styles.megaMenuRightPanel}`}>
          {solutions.map((item, idx) => (
            <Link href={`/solutions#${item.slug}`} key={idx} className="group/item flex flex-col items-start hover:opacity-80 transition-opacity">
              <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${item.iconBg}`}>
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
              <h4 className={`text-white font-semibold mb-2 ${styles.text15}`}>{item.title}</h4>
              <p className={`text-white/70 leading-relaxed ${styles.text13}`}>
                {item.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
