import { visit } from 'unist-util-visit';
export default function rehypeLineNumbers({ languages, } = {
    languages: [],
}) {
    return (tree) => {
        visit(tree, 'element', (node, _, parent) => {
            var _a;
            if (node.tagName !== 'code' || !isTarget(node, languages)) {
                return;
            }
            const className = ((_a = parent.properties.className) !== null && _a !== void 0 ? _a : []);
            parent.properties.className = className.concat(['line-numbers']);
        });
    };
}
function isTarget(code, languages) {
    var _a;
    return ((_a = code.properties.className) !== null && _a !== void 0 ? _a : [])
        .filter(language => languages.length === 0 || languages.includes(language.replace('language-', '')))
        .length > 0;
}
