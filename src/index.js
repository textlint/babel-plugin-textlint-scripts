import fs from "fs";
import path from "path";
import template from "@babel/template";
import * as TJS from "typescript-json-schema";

const settings = {
    required: true,
};
const log = (...args) => {
    console.log("[babel-plugin-textlint-script]", ...args);
}
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
export default function ({ types: t }) {
    const compilerOptions = require(resolveApp("tsconfig.json")).compilerOptions;
    const pkg = require(resolveApp("package.json"))
    return {
        visitor: {
            Program(path, state) {
                try {
                    const filePath = state.file.opts.filename;
                    console.log(filePath);
                    const program = TJS.getProgramFromFiles(
                        [filePath],
                        compilerOptions
                    );
                    const schema = TJS.generateSchema(program, "Options", settings)
                    const schemaTemplate = template.expression(JSON.stringify(schema, null, 4));
                    const def = template`\
export const meta = { 
    name: NAME,
    description: DESCRIPTION,
    homepage: HOMEPAGE,
    schema: SCHEMA,
}
`;
                    const ast = def({
                        NAME: t.stringLiteral(pkg.name || ""),
                        DESCRIPTION: t.stringLiteral(pkg.description || ""),
                        HOMEPAGE: pkg.homepage ? t.stringLiteral(pkg.homepage) : undefined,
                        SCHEMA: schemaTemplate()
                    });
                    path.pushContainer('body', ast);
                } catch (error) {
                    log("Error", error)
                }
            }
        }
    };
}
