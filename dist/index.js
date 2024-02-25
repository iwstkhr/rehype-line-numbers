import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { visit } from 'unist-util-visit';
export default function rehypeLineNumbers({ languages, } = {
    languages: [],
}) {
    return (tree) => {
        visit(tree, 'raw', (node) => {
            var _a;
            const pre = fromHtml(node.value, { fragment: true }).children.at(0);
            if (!isTarget(pre, languages)) {
                return;
            }
            pre.properties.className = ((_a = pre.properties.className) !== null && _a !== void 0 ? _a : []).concat(['line-numbers']);
            node.value = toHtml(pre);
        });
    };
}
function isTarget(pre, languages) {
    var _a;
    return ((_a = pre.properties.className) !== null && _a !== void 0 ? _a : [])
        .filter(language => languages.length === 0 || languages.includes(language.replace('language-', '')))
        .length > 0;
}
