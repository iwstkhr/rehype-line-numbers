import type { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

interface Option {
  languages: string[];
}

export default function rehypeLineNumbers({
  languages,
}: Option = {
  languages: [],
}) {
  return (tree: Root): void => {
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'code' || !isTarget(node, languages)) {
        return;
      }
      const className = (parent as Element).properties.className as string[] ?? [];
      (parent as Element).properties.className = className.concat(['line-numbers']);
    });
  };
}

function isTarget(code: Element, languages: string[]): boolean {
  return (code.properties.className as string[] ?? [])
    .filter(language => languages.length === 0 || languages.includes(language.replace('language-', '')))
    .length > 0;
}
