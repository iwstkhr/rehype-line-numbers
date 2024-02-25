import type { Element, Literal, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
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
    visit(tree, 'raw', (node: Element & Literal) => {
      const pre = fromHtml(node.value, { fragment: true }).children.at(0) as unknown as Element;
      if (!isTarget(pre, languages)) {
        return;
      }

      pre.properties.className = (pre.properties.className as string[] ?? []).concat(['line-numbers']);
      node.value = toHtml(pre);
    });
  };
}

function isTarget(pre: Element, languages: string[]): boolean {
  return (pre.properties.className as string[] ?? [])
    .filter(language => languages.length === 0 || languages.includes(language.replace('language-', '')))
    .length > 0;
}
