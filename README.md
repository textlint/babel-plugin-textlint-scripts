# babel-plugin-textlint-scripts

A babel plugin for textlint-scripts.

- Generate `meta` data for the rule automatically
- Convert TypeScript's `Option` type to JSON Schema

## Example

**In**

```ts
export type Options = {
    str_key: string;
};
const report = () => {
    return {};
};
export default report;
```

**Out**

```js
const report = () => {
    return {};
};

export default report;
export const meta = {
    name: "@textlint/babel-plugin-textlint-scripts",
    description: "A babel plugin for textlint-scripts.",
    homepage: "https://github.com/textlint/babel-plugin-textlint-scripts",
    schema: {
        type: "object",
        properties: {
            str_key: {
                type: "string"
            }
        },
        required: ["str_key"],
        $schema: "http://json-schema.org/draft-07/schema#"
    }
};
```

## Installation

```sh
$ npm install @textlint/babel-plugin-textlint-scripts
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@textlint/textlint-scripts"]
}
```

### Via CLI

```sh
$ babel --plugins textlint-scripts script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["@textlint/textlint-scripts"]
});
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
