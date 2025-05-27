import React from 'react';
import { Layout, ChevronRight } from 'lucide-react';
import type { Template } from '../types';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

const templates: Template[] = [
  {
    id: 'blog-how-to',
    name: 'How-to Guide',
    category: 'Blog',
    description: 'Step-by-step tutorial format',
    sections: [
      { title: 'Introduction', description: 'Problem statement and goal' },
      { title: 'Prerequisites', description: 'Required materials or knowledge' },
      { title: 'Step-by-Step Guide', description: 'Detailed instructions' },
      { title: 'Tips and Tricks', description: 'Expert recommendations' },
      { title: 'Conclusion', description: 'Summary and next steps' }
    ]
  },
  {
    id: 'tech-review',
    name: 'Product Review',
    category: 'Technology',
    description: 'Comprehensive product analysis',
    sections: [
      { title: 'Overview', description: 'Product introduction' },
      { title: 'Features', description: 'Key capabilities' },
      { title: 'Performance', description: 'Testing results' },
      { title: 'Comparison', description: 'Competitive analysis' },
      { title: 'Verdict', description: 'Final recommendation' }
    ]
  }
];

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="mystical-card space-y-4 p-4">
      <div className="flex items-center space-x-2 text-purple-400">
        <Layout className="size-5" />
        <h3 className="font-medium">Article Templates</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="group rounded-lg border border-slate-700/50 bg-slate-800/30 
                     p-4 text-left transition-all 
                     hover:border-purple-500/30 hover:bg-slate-800/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-200">{template.name}</div>
                <div className="text-sm text-slate-400">{template.description}</div>
              </div>
              <ChevronRight className="size-5 text-slate-400 transition-all group-hover:translate-x-1 
                                    group-hover:text-purple-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}