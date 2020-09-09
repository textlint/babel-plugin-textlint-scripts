import path from "path";
import fs from "fs";
import assert from "assert";
import { transformFileSync } from "@babel/core";
import plugin from "../src";

function trim(str) {
    return str.replace(/^\s+|\s+$/, "");
}

describe("A babel pluin for textlint-scripts.", () => {
    const fixturesDir = path.join(__dirname, "fixtures");
    fs.readdirSync(fixturesDir).map((caseName) => {
        it(`should ${caseName.split("-").join(" ")}`, function () {
            const fixtureDir = path.join(fixturesDir, caseName);
            const actualPath = path.join(fixtureDir, "actual.ts");
            const actual = transformFileSync(actualPath).code;
            const expectedFilePath = path.join(fixtureDir, "expected.js");

            // Usage: update snapshots
            // UPDATE_SNAPSHOT=1 npm test
            if (!fs.existsSync(expectedFilePath) || process.env.UPDATE_SNAPSHOT) {
                fs.writeFileSync(expectedFilePath, actual, "utf-8");
                this.skip(); // skip when updating snapshots
                return;
            }
            const expected = fs.readFileSync(expectedFilePath).toString();
            assert.strictEqual(trim(actual), trim(expected));
        });
    });
});
