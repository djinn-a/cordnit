import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ContactCardType } from './types';

type ContactCardProps = {
  card: ContactCardType;
};

export default function ContactCard({ card }: Readonly<ContactCardProps>) {
  return (
    <div className="rounded-card py-4 px-2 md:p-8 bg-gradient-contact-soft shadow-sm">
      <div className="flex items-start gap-2 md:gap-3">
        <Image src={card.iconPath} alt={card.title} width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0" />
        
        {card.type === 'person' && (
          <div>
            <h4 className="font-medium text-gray-800 text-card-desc-mobile md:text-section-title-h mb-1">{card.title}</h4>
            <div className="text-gray-600 text-card-detail-mobile md:text-card-desc leading-relaxed space-y-0.5 mb-4">
              <p>{card.name}</p>
              <p>{card.role}</p>
              <p className="text-gray-800 font-bold">{card.email}</p>
            </div>
            <Link href="#" className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
              {card.ctaText} <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        )}

        {card.type === 'info' && (
          <div>
            <h4 className="font-medium text-gray-800 text-card-desc-mobile md:text-section-title-h mb-1">{card.title}</h4>
            <p className="text-gray-600 text-card-detail-mobile md:text-card-desc leading-relaxed mb-2">
              {card.description}
            </p>
            <p className="text-gray-800 text-card-detail-mobile md:text-card-desc font-bold leading-relaxed mb-4">{card.email}</p>
            <Link href="#" className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
              {card.ctaText} <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        )}

        {card.type === 'links' && (
          <div className="w-full">
            <h4 className="font-medium text-gray-800 text-card-desc-mobile md:text-section-title-h mb-4">{card.title}</h4>
            <div className="flex flex-col gap-3">
              {card.links.map((link, idx) => (
                <Link key={idx} href={link.href} className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
                  {link.text} <span className="ml-1">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
