import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { RecognitionItem } from './types';

export default function RecognitionCard({ item }: { item: RecognitionItem }) {
  return (
    <div className="flex-none w-full sm:w-auto snap-start flex flex-col bg-surface border border-primary-pale rounded-card p-3 sm:p-4 shadow-sm hover:shadow-card transition-shadow duration-300">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-5 bg-primary-pale">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow px-1 sm:px-2 pb-2">
        <span className="text-eyebrow text-primary uppercase mb-2">{item.category}</span>
        <h3 className="text-h3 mb-3">
          {item.title}
        </h3>
        <p className="text-body-sm mb-6 flex-grow">{item.desc}</p>
        <a
          href="#"
          className="flex items-center text-primary text-caption hover:text-primary-hover transition-colors"
        >
          View recognition <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
