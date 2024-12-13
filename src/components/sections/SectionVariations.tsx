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
              ? 'border-blue-500 bg-blue-50 shadow-sm'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
            cursor-pointer group
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`
              flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-current
              ${index === selectedVariation ? 'text-blue-500 bg-blue-100' : 'text-gray-400 group-hover:text-gray-500'}
            `}>
              {index === selectedVariation ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm">{index + 1}</span>
              )}
            </div>
            <div className="flex-1 text-sm leading-relaxed">
              {variation}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}