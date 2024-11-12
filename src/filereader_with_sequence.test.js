"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const sequence_1 = require("./sequence");
const filereader_1 = require("./filereader");
(0, vitest_1.describe)("#map with #linesFromFile", () => {
    (0, vitest_1.it)("Maps over lines from a file", async () => {
        const lines = (0, filereader_1.linesFromFile)("./test-data/example-file.txt");
        const justNums = lines.map(ln => Number(ln.match(/\d+/)));
        const results = await justNums.toArray();
        (0, vitest_1.expect)(results).toStrictEqual([1, 2, 3]);
    });
});
(0, vitest_1.describe)("#sum with #map and #linesFromFile", () => {
    (0, vitest_1.it)("Sums values taken from file and manipulated", async () => {
        const lines = (0, filereader_1.linesFromFile)("./test-data/example-file.txt");
        const nums = lines.map(ln => Number(ln.match(/\d+/)));
        const doubledNums = nums.map(n => n * 2);
        // So far: nothing's been pulled from the file, nothing's been processed.
        const total = await sequence_1.Sequence.sum(doubledNums);
        (0, vitest_1.expect)(total).toBe(12);
    });
});
