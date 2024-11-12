"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const sequence_1 = require("./sequence");
(0, vitest_1.describe)("#map", () => {
    (0, vitest_1.it)("Maps over an array", async () => {
        const nums = new sequence_1.Sequence([1, 2, 3]);
        const doubles = nums.map(x => x * 2);
        const results = await doubles.toArray();
        (0, vitest_1.expect)(results).toStrictEqual([2, 4, 6]);
    });
});
(0, vitest_1.describe)("#filter", () => {
    (0, vitest_1.it)("Discards items that don't match condition", async () => {
        const nums = new sequence_1.Sequence([1, 2, 3, 4, 5, 6]);
        const evens = nums.filter(x => x % 2 === 0);
        const results = await evens.toArray();
        (0, vitest_1.expect)(results).toStrictEqual([2, 4, 6]);
    });
});
(0, vitest_1.describe)("#reduce", () => {
    (0, vitest_1.it)("Throws if no initial value and empty sequence", async () => {
        const empty = new sequence_1.Sequence([]);
        (0, vitest_1.expect)(async () => await empty.reduce((acc, val) => acc + val)).rejects.toThrow();
    });
    (0, vitest_1.it)("Returns initial value for empty sequence", async () => {
        const empty = new sequence_1.Sequence([]);
        (0, vitest_1.expect)(await empty.reduce((acc, val) => acc + val, 0)).toBe(0);
    });
    (0, vitest_1.it)("Reduces sequence using given function", async () => {
        const empty = new sequence_1.Sequence([1, 2, 3]);
        (0, vitest_1.expect)(await empty.reduce((acc, val) => acc + val, 0)).toBe(6);
    });
    (0, vitest_1.it)("Uses first item in sequence when no initial value is given", async () => {
        const empty = new sequence_1.Sequence([1, 2, 3]);
        (0, vitest_1.expect)(await empty.reduce((acc, val) => acc + val)).toBe(6);
    });
    (0, vitest_1.it)("Uses initial value to start the accumulator", async () => {
        const empty = new sequence_1.Sequence([1, 2, 3]);
        (0, vitest_1.expect)(await empty.reduce((acc, val) => acc.concat(` *${val}*`), "list:"))
            .toBe("list: *1* *2* *3*");
    });
    (0, vitest_1.it)("When output type is different than the ", async () => {
        const empty = new sequence_1.Sequence([1, 2, 3]);
        (0, vitest_1.expect)(await empty.reduce((acc, val) => acc.concat(` *${val}*`), ""))
            .toBe(" *1* *2* *3*");
    });
});
(0, vitest_1.describe)("#sum", () => {
    (0, vitest_1.it)("Sums array", async () => {
        const nums = new sequence_1.Sequence([1, 2, 3]);
        const total = await sequence_1.Sequence.sum(nums);
        (0, vitest_1.expect)(total).toBe(6);
    });
    (0, vitest_1.it)("Sum of empty sequence is 0", async () => {
        const nums = new sequence_1.Sequence([]);
        const total = await sequence_1.Sequence.sum(nums);
        (0, vitest_1.expect)(total).toBe(0);
    });
});
(0, vitest_1.describe)("#max", () => {
    (0, vitest_1.it)("Finds max of numbers sequence", async () => {
        const nums = new sequence_1.Sequence([0, 2, 9, 3, 5]);
        const largest = await sequence_1.Sequence.max(nums);
        (0, vitest_1.expect)(largest).toBe(9);
    });
    (0, vitest_1.it)("Throws on empty sequence", async () => {
        const nums = new sequence_1.Sequence([]);
        (0, vitest_1.expect)(async () => await sequence_1.Sequence.max(nums)).rejects.toThrow(/empty sequence/);
    });
});
(0, vitest_1.describe)("#maxObject", () => {
    (0, vitest_1.it)("Finds max object, as defined by a 'key' property", async () => {
        const items = new sequence_1.Sequence([
            { name: "Apple", size: 2 }, { name: "Banana", size: 5 }, { name: "Cherry", size: 1 }
        ]);
        const largest = await sequence_1.Sequence.maxObject(items, "size");
        (0, vitest_1.expect)(largest).toStrictEqual({ name: "Banana", size: 5 });
    });
    (0, vitest_1.it)("Throws on empty sequence", async () => {
        const items = new sequence_1.Sequence([]);
        (0, vitest_1.expect)(async () => await sequence_1.Sequence.maxObject(items, "None"))
            .rejects.toThrow(/empty sequence/);
    });
    (0, vitest_1.it)("Throws if 'key' property doesn't exist", async () => {
        const items = new sequence_1.Sequence([
            { name: "Apple", size: 2 }, { name: "Banana", size: 5 }, { name: "Cherry", size: 1 }
        ]);
        // @ts-ignore: Here TS knows the objects have no "age" property, and warns us - let's ignore
        // that to make sure the error would still get caught if TS hadn't spotted it.
        (0, vitest_1.expect)(async () => await sequence_1.Sequence.maxObject(items, "age"))
            .rejects.toThrow(/Key property/);
    });
    (0, vitest_1.it)("Throws if 'key' property isn't a number", async () => {
        // We could expand the functionality in future to allow strings or other comparable types.
        const items = new sequence_1.Sequence([
            { name: "Apple", size: 2 }, { name: "Banana", size: "medium" }, { name: "Cherry", size: 1 }
        ]);
        (0, vitest_1.expect)(async () => await sequence_1.Sequence.maxObject(items, "size"))
            .rejects.toThrow(/Key property/);
    });
});
(0, vitest_1.describe)("#minObject", () => {
    (0, vitest_1.it)("Finds min object, as defined by a 'key' property", async () => {
        const items = new sequence_1.Sequence([
            { name: "Apple", size: 2 }, { name: "Banana", size: 5 }, { name: "Cherry", size: 1 }
        ]);
        const smallest = await sequence_1.Sequence.minObject(items, "size");
        (0, vitest_1.expect)(smallest).toStrictEqual({ name: "Cherry", size: 1 });
    });
});
(0, vitest_1.describe)("#count", () => {
    (0, vitest_1.it)("Counts any type of sequence", async () => {
        const seq = new sequence_1.Sequence(["a", "b", "c", "d"]);
        (0, vitest_1.expect)(await sequence_1.Sequence.count(seq)).toBe(4);
    });
    (0, vitest_1.it)("Count of empty sequence is zero", async () => {
        const empty = new sequence_1.Sequence([]);
        (0, vitest_1.expect)(await sequence_1.Sequence.count(empty)).toBe(0);
    });
});
(0, vitest_1.describe)("Multiple operations can be chained", () => {
    (0, vitest_1.it)("Filter, map to new values, and sum total", async () => {
        const nums = new sequence_1.Sequence([10, -5, 10, 20, -10]);
        const positivesDoubled = nums.filter(n => n > 0).map(n => n * 2);
        const total = await sequence_1.Sequence.sum(positivesDoubled);
        (0, vitest_1.expect)(total).toBe(80);
    });
});
