"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleLineFromFile = exports.linesFromFile = exports.Sequence = void 0;
var sequence_js_1 = require("./src/sequence.js");
Object.defineProperty(exports, "Sequence", { enumerable: true, get: function () { return sequence_js_1.Sequence; } });
var filereader_js_1 = require("./src/filereader.js");
Object.defineProperty(exports, "linesFromFile", { enumerable: true, get: function () { return filereader_js_1.linesFromFile; } });
Object.defineProperty(exports, "singleLineFromFile", { enumerable: true, get: function () { return filereader_js_1.singleLineFromFile; } });
