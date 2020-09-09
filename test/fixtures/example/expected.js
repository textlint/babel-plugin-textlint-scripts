const report = () => {
  return {};
};

export default report;
export const meta = {
  name: "@textlint/babel-plugin-textlint-script",
  description: "A babel plugin for textlint-script.",
  schema: {
    "type": "object",
    "properties": {
      "str_key": {
        "type": "string"
      }
    },
    "required": ["str_key"],
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
};
