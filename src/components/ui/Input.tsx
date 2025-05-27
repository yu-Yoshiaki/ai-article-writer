import React from 'react';
import * as Label from '@radix-ui/react-label';
import { cn } from '../../utils/classNames';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`;
    const errorId = error ? `${inputId}-error` : undefined;
    
    return (
      <div className="space-y-1">
        {label && (
          <Label.Root htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
          </Label.Root>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
            'ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-gray-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';