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
            relative p-4 rounded-lg border transition-all
            ${index === selectedVariation
              ? 'border-blue-400 bg-indigo-900 shadow-sm'
              : 'border-indigo-800 hover:border-indigo-700 hover:bg-indigo-900'
            }
            cursor-pointer group
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`
              flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-current
              ${index === selectedVariation ? 'text-blue-400 bg-indigo-800' : 'text-indigo-400 group-hover:text-indigo-300'}
            `}>
              {index === selectedVariation ? (
                <Check className="w-4 h-4" />
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