import React from 'react';
import { Check } from 'lucide-react';

interface SectionVariationsProps {
  variations: string[];
  selectedVariation: number;
  onSelectVariation: (index: number) => void;
}

export function SectionVariations({
  variations,
  selectedVariation,
  onSelectVariation
}: SectionVariationsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {variations.map((variation, index) => (
        <div
          key={index}
          onClick={() => onSelectVariation(index)}
          className={`
            relative rounded-lg border p-4 transition-all
            ${index === selectedVariation
              ? 'border-blue-400 bg-indigo-900 shadow-sm'
              : 'border-indigo-800 hover:border-indigo-700 hover:bg-indigo-900'
            }
            group cursor-pointer
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`
              flex size-6 shrink-0 items-center justify-center rounded-full border border-current
              ${index === selectedVariation ? 'bg-indigo-800 text-blue-400' : 'text-indigo-400 group-hover:text-indigo-300'}
            `}>
              {index === selectedVariation ? (
                <Check className="size-4" />
              ) : (
                <span className="text-sm">{index + 1}</span>
              )}
            </div>
            <div className="flex-1 text-sm leading-relaxed text-gray-100">
              {variation}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}