export declare class Sequence<T> {
    protected readonly seq: Iterable<T> | AsyncIterable<T>;
    constructor(seq: Iterable<T> | AsyncIterable<T>);
    [Symbol.asyncIterator](): AsyncGenerator<T, void, void>;
    toArray(): Promise<T[]>;
    filter(filterCondition: (x: T) => boolean): Sequence<T>;
    map<TMap>(mappingFunction: (x: T) => TMap): Sequence<TMap>;
    reduce<TReduce>(reducingFunction: (acc: TReduce, val: T) => TReduce, initialValue?: TReduce): Promise<TReduce>;
    static sum(sequence: Sequence<number>): Promise<number>;
    static max(sequence: Sequence<number>): Promise<number>;
    static min(sequence: Sequence<number>): Promise<number>;
    static maxObject<T>(sequence: Sequence<T>, key: keyof T): Promise<T>;
    static minObject<T>(sequence: Sequence<T>, key: keyof T): Promise<T>;
    static count(sequence: Sequence<any>): Promise<number>;
}
