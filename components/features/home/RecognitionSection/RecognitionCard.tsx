import { RecognitionItem } from './types';

export default function RecognitionCard({ item }: Readonly<{ item: RecognitionItem }>) {
  return (
    <div className="flex-none w-full sm:w-auto snap-start flex flex-col bg-surface border border-primary-pale rounded-card p-3 sm:p-4 shadow-sm hover:shadow-card transition-shadow duration-300">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-5 bg-primary-pale">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col grow px-1 sm:px-2 pb-2">
        <span className="text-card-desc-mobile leading-space-12 tracking-[1.2px] text-primary uppercase mb-2 align-middle">{item.category}</span>
        <h3 className="text-card-title-mobile font-semibold sm:text-card-title sm:font-bold mb-3">
          {item.title}
        </h3>
        <p className="text-ink-muted text-card-desc-mobile sm:text-card-desc mb-6 grow">{item.desc}</p>
      </div>
    </div>
  );
}
