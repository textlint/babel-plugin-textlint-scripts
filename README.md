# babel-plugin-textlint-script

A babel plugin for textlint-script.

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
$ npm install babel-plugin-textlint-script
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["textlint-script"]
}
```

### Via CLI

```sh
$ babel --plugins textlint-script script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["textlint-script"]
});
```
