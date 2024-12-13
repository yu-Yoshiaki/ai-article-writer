import type { Article } from '../types';

export function generateMarkdown(article: Article): string {
  const lines: string[] = [];
  
  // Add title
  lines.push(`# ${article.theme}\n`);
  
  // Add metadata if available
  if (article.tone) {
    lines.push(`> Writing tone: ${article.tone}\n`);
  }
  
  // Add sections
  article.sections.forEach(section => {
    lines.push(`## ${section.title}`);
    lines.push(section.variations[section.selectedVariation]);
    lines.push(''); // Empty line between sections
  });
  
  return lines.join('\n');
}