import React from 'react';
import Link from 'next/link';
import { MegaMenuColumn } from '../../data/navigation';
import styles from './MegaMenu.module.css';

interface MegaMenuProps {
  isMobile: boolean;
  columns: MegaMenuColumn[];
}

export default function MegaMenu({ isMobile, columns }: MegaMenuProps) {
  if (isMobile) {
    return (
      <div className={styles.mobileAccordion}>
        {columns.map((column) => (
          <div key={column.id} className="py-3">
            <h3 className="font-semibold text-gray-900 mb-2">{column.title}</h3>
            <ul className="space-y-3 text-gray-600 ml-2">
              {column.items.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="block py-1 hover:text-blue-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.megaMenuDesktop}>
      <div 
        className="grid gap-8"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((column) => (
          <div key={column.id}>
            <h3 className="font-semibold text-gray-900 mb-4 text-lg border-b border-gray-100 pb-2">
              {column.title}
            </h3>
            <ul className="space-y-3 text-gray-600">
              {column.items.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="hover:text-blue-600 transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
