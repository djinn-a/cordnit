import React from 'react';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { TestimonialItem } from './types';

export default function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="flex-none w-full lg:w-[calc((100%-4.5rem)/3.5)] snap-start flex flex-col bg-surface border border-primary-muted rounded-card-lg overflow-hidden">
      <div className="relative h-48 sm:h-56 lg:h-64 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 1023px) 100vw, 28vw"
          className="object-cover object-top"
        />
        <div className="absolute bottom-4 left-4">
          <button
            type="button"
            className="flex items-center justify-center w-12 h-10 bg-surface rounded-lg shadow-sm hover:bg-primary-pale transition-colors"
            aria-label={`Play testimonial from ${item.name}`}
          >
            <Play
              className="h-4 w-4 text-primary ml-0.5"
              fill="currentColor"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <h3 className="text-h4 font-normal sm:font-bold mb-1">
          {item.name}
        </h3>
        <p className="text-caption mb-0.5">{item.role}</p>
        <p className="text-caption mb-3 sm:mb-4">{item.company}</p>
        <p className="text-body-sm text-ink mb-4 flex-grow">
          {item.quote}
        </p>
        <a
          href="#"
          className="flex items-center text-primary text-body-sm font-medium hover:text-primary-hover transition-colors mt-auto"
        >
          Watch testimonial <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
