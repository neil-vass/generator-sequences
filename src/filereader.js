"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleLineFromFile = singleLineFromFile;
exports.linesFromFile = linesFromFile;
const promises_1 = __importDefault(require("node:readline/promises"));
const fs_1 = __importDefault(require("fs"));
const sequence_1 = require("./sequence");
function singleLineFromFile(path) {
    return fs_1.default.readFileSync(path, "utf8").trimEnd();
}
function linesFromFile(path) {
    async function* readFile() {
        for await (const line of promises_1.default.createInterface({ input: fs_1.default.createReadStream(path) })) {
            yield line;
        }
    }
    return new sequence_1.Sequence(readFile());
}
