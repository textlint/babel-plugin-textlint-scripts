const report = () => {
  return {};
};

export default report;
export const meta = {
  name: "@textlint/babel-plugin-textlint-scripts",
  description: "A babel plugin for textlint-scripts.",
  homepage: "https://github.com/textlint/babel-plugin-textlint-scripts",
  schema: {
    "type": "object",
    "properties": {
      "a": {
        "type": "object",
        "properties": {
          "b": {
            "type": "object",
            "properties": {
              "c": {
                "type": "string"
              }
            }
          }
        },
        "required": ["b"]
      },
      "d": {
        "type": "number"
      },
      "e": {
        "enum": [1, 2, 3],
        "type": "number"
      }
    },
    "required": ["d", "e"],
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
};