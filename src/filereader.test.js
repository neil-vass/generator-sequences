"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const filereader_1 = require("./filereader");
(0, vitest_1.describe)("#singleLineFromFile", () => {
    (0, vitest_1.it)("Fetches the single line from a one-line file, dropping newline at the end.", () => {
        const line = (0, filereader_1.singleLineFromFile)("./test-data/single-line-file.txt");
        (0, vitest_1.expect)(line).toBe("word");
    });
});
(0, vitest_1.describe)("#linesFromFile", () => {
    (0, vitest_1.it)("Returns all lines", async () => {
        const lineReader = (0, filereader_1.linesFromFile)("./test-data/example-file.txt");
        const results = await lineReader.toArray();
        (0, vitest_1.expect)(results.length).toBe(3);
        (0, vitest_1.expect)(results[2]).toBe("And here's line 3");
    });
    (0, vitest_1.it)("Throws if file is missing", async () => {
        const lineReader = (0, filereader_1.linesFromFile)("./test-data/not-a-file.txt");
        (0, vitest_1.expect)(async () => { for await (const line of lineReader) { } })
            .rejects
            .toThrow("no such file or directory");
    });
});
