# rehype-line-numbers
rehype plugin to add a `line-numbers` class to pre tags containing `language-*` classes

## Installation
```sh
npm i git+https://github.com/iwstkhr/rehype-line-numbers.git
```

## Options
| Name | Type | Description |
| ---- | ---- | ----------- |
| languages | string[] | Target languages |

## Usage in Astro
Add `rehypeLineNumbers` to `astro.config.mjs` like the following.

```js
export default defineConfig({
  site: 'https://<YOUR_SITE>/',
  integrations: [],
  markdown: {
    rehypePlugins: [
      [rehypeLineNumbers, {
        languages: ['python', 'ts'],
      }],
    ],
  },
});
```

## License
MIT
