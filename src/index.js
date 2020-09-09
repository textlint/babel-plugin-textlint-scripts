import fs from "fs";
import pathUtil from "path";
import template from "@babel/template";
import * as TJS from "typescript-json-schema";
import { parse } from "comment-json";

const settings = {
    required: true
};
const log = (...args) => {
    console.log("[babel-plugin-textlint-scripts]", ...args);
};

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => pathUtil.resolve(appDirectory, relativePath);
export default function ({ types: t }) {
    return {
        visitor: {
            Program(path, state) {
                try {
                    const filePath = state.file.opts.filename;
                    if (!filePath) {
                        return;
                    }
                    const tsconfigJsonFilePath = resolveApp("tsconfig.json");
                    if (!fs.existsSync(tsconfigJsonFilePath)) {
                        return;
                    }
                    const tsconfigJson = parse(fs.readFileSync(tsconfigJsonFilePath, "utf-8"));
                    const compilerOptions = tsconfigJson.compilerOptions;
                    const pkg = require(resolveApp("package.json"));
                    // Skip non-ts files
                    if (pathUtil.extname(filePath) !== ".ts") {
                        return;
                    }
                    const program = TJS.getProgramFromFiles([filePath], compilerOptions);
                    const schema = TJS.generateSchema(program, "Options", settings);
                    if (!schema) {
                        return;
                    }
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
                        HOMEPAGE: t.stringLiteral(pkg.homepage || ""),
                        SCHEMA: schemaTemplate()
                    });
                    path.pushContainer("body", ast);
                } catch (error) {
                    log("Error", error);
                }
            }
        }
    };
}
