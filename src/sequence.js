"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = void 0;
// A sequence is anything we can keep asking for more T's from.
// Might be an array (or anything using the Iterable interface),
// a generator, and it might be async (e.g. keep requesting the next
// line from a file or other IO-bound operation we want to await).
//
// Users of this type should assume it's async. If it's an array
// or other simple type it will be ready immediately, but it's safe
// to await its values anyway.
//
// This kind of support is likely to be part of the language soon!
// https://github.com/tc39/proposal-iterator-helpers
// https://github.com/tc39/proposal-async-iterator-helpers
// Until it's available, I've written this helper module.
class Sequence {
    constructor(seq) {
        this.seq = seq;
    }
    async *[Symbol.asyncIterator]() {
        for await (const item of this.seq) {
            yield item;
        }
    }
    // Convenience method, to run through a whole sequence and collect it
    // into an array. Only use this if you know the sequence is finite and
    // its contents will fit into memory.
    async toArray() {
        let results = new Array();
        for await (const item of this.seq) {
            results.push(item);
        }
        return results;
    }
    filter(filterCondition) {
        async function* apply_filter(inputSeq) {
            for await (const item of inputSeq) {
                if (filterCondition(item))
                    yield item;
            }
        }
        return new Sequence(apply_filter(this.seq));
    }
    map(mappingFunction) {
        async function* apply_map(inputSeq) {
            for await (const item of inputSeq) {
                yield mappingFunction(item);
            }
        }
        return new Sequence(apply_map(this.seq));
    }
    async reduce(reducingFunction, initialValue) {
        let accumulator = undefined;
        if (initialValue !== undefined) {
            accumulator = initialValue;
        }
        for await (const item of this) {
            if (accumulator === undefined) {
                // @ts-ignore: this should be allowed if TReduce === T. I can't see a way to specify that.
                // However, the caller will get various prompts from TypeScript about issues.
                accumulator = item;
            }
            else {
                accumulator = reducingFunction(accumulator, item);
            }
        }
        if (accumulator === undefined)
            throw new Error("Can't reduce empty sequence with no initial value");
        return accumulator;
    }
    // On an infinite sequence, this will never return.
    static async sum(sequence) {
        return sequence.reduce((acc, val) => acc + val, 0);
    }
    // On an infinite sequence, this will never return.
    static async max(sequence) {
        // Having no initialValue means this will throw on an empty sequence.
        return sequence.reduce((acc, val) => (acc > val) ? acc : val);
    }
    static async min(sequence) {
        // Having no initialValue means this will throw on an empty sequence.
        return sequence.reduce((acc, val) => (acc < val) ? acc : val);
    }
    static async maxObject(sequence, key) {
        // Having no initialValue means this will throw on an empty sequence.
        return sequence.reduce((bestSoFar, currentItem) => {
            if (typeof currentItem[key] !== 'number')
                throw new Error("Key property must be a number");
            return (currentItem[key] > bestSoFar[key]) ? currentItem : bestSoFar;
        });
    }
    static async minObject(sequence, key) {
        // Having no initialValue means this will throw on an empty sequence.
        return sequence.reduce((bestSoFar, currentItem) => {
            if (typeof currentItem[key] !== 'number')
                throw new Error("Key property must be a number");
            return (currentItem[key] < bestSoFar[key]) ? currentItem : bestSoFar;
        });
    }
    // On an infinite sequence, this will never return.
    static async count(sequence) {
        return Sequence.sum(sequence.map(() => 1));
    }
}
exports.Sequence = Sequence;
