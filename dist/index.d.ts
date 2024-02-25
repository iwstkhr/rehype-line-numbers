import type { Root } from 'hast';
interface Option {
    languages: string[];
}
export default function rehypeLineNumbers({ languages, }?: Option): (tree: Root) => void;
export {};
