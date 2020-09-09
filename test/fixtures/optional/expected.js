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
        $schema: "http://json-schema.org/draft-07/schema#"
    }
};
