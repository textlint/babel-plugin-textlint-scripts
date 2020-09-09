# babel-plugin-textlint-scripts

A babel plugin for textlint-scripts.

## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-textlint-scripts
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["textlint-scripts"]
}
```

### Via CLI

```sh
$ babel --plugins textlint-scripts script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["textlint-scripts"]
});
```
