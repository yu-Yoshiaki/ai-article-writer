import React, { useState } from 'react';
import { Sparkles, PenLine } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { validateTheme } from '../utils/validation';
import { useDebounce } from '../hooks/useDebounce';

interface ThemeInputProps {
  onSubmit: (theme: string) => void;
  isLoading: boolean;
}

export function ThemeInput({ onSubmit, isLoading }: ThemeInputProps) {
  const [theme, setTheme] = useState('');
  const [error, setError] = useState<string | null>(null);
  const debouncedTheme = useDebounce(theme, 300);

  React.useEffect(() => {
    setError(validateTheme(debouncedTheme));
  }, [debouncedTheme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!error && theme.trim()) {
      onSubmit(theme.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="mystical-card floating-effect w-full max-w-2xl p-8">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Sparkles className="size-8 text-purple-400" />
              <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                AI Article Enchanter
              </h1>
              <Sparkles className="size-8 text-purple-400" />
            </div>
            <p className="text-slate-300">
              Transform your ideas into enchanting articles with the power of AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Your Article Theme
              </label>
              <Input
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Enter your magical theme (e.g., 'The Art of Coffee Brewing')"
                disabled={isLoading}
                error={error || undefined}
                className="mystical-input"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !!error || !theme.trim()}
              className="mystical-button w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Channeling Magic...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <PenLine className="size-5" />
                  <span>Generate Article</span>
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}