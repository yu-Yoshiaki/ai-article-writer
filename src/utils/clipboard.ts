export function formatArticleText(theme: string, sections: { title: string; variations: string[]; selectedVariation: number }[]): string {
  return `${theme}\n\n${sections
    .map((section) => `${section.title}\n${section.variations[section.selectedVariation]}\n`)
    .join('\n')}`;
}