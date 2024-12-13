import React from 'react';
import { FileDown, FileText, Copy } from 'lucide-react';
import type { Article } from '../types';
import { formatArticleText } from '../utils/clipboard';
import { generateMarkdown } from '../utils/markdown';

interface ExportOptionsProps {
  article: Article;
}

export function ExportOptions({ article }: ExportOptionsProps) {
  const handleCopyMarkdown = () => {
    const markdown = generateMarkdown(article);
    navigator.clipboard.writeText(markdown);
  };

  const handleDownloadMarkdown = () => {
    const markdown = generateMarkdown(article);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.theme.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mystical-card p-4 space-y-4">
      <div className="flex items-center space-x-2 text-purple-400">
        <FileText className="w-5 h-5" />
        <h3 className="font-medium">Export Options</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCopyMarkdown}
          className="flex items-center justify-center space-x-2 p-3 rounded-lg
                   bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>Copy Markdown</span>
        </button>
        
        <button
          onClick={handleDownloadMarkdown}
          className="flex items-center justify-center space-x-2 p-3 rounded-lg
                   bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
        >
          <FileDown className="w-4 h-4" />
          <span>Download .md</span>
        </button>
      </div>
    </div>
  );
}