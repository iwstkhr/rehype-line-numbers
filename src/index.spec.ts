import { Element, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import rehypeLineNumbers from './index.js';

function createNode(): Root {
  return fromHtml(
    '<pre class="language-shell"><code is:raw class="language-shell"><span class="token function">npm</span> i <span class="token parameter variable">-D</span> typescript jest @types/jest ts-node ts-jest</code></pre>',
    { fragment: true },
  );
}

test('rehypeLineNumbers - target languages not specified', () => {
  const func = rehypeLineNumbers({ languages: [] });
  const node = createNode();
  func(node);

  const className = (node.children.at(0) as Element).properties.className as string[] ?? [];
  expect(!className.includes('line-numbers'));
});

test('rehypeLineNumbers - target languages specified', () => {
  const func = rehypeLineNumbers({ languages: ['shell'] });
  const node = createNode();
  func(node);

  const className = (node.children.at(0) as Element).properties.className as string[] ?? [];
  expect(className.includes('line-numbers'));
});
