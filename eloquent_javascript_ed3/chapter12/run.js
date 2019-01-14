"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluator_1 = require("./evaluator");
const parser_1 = require("./parser");
const topScope_1 = require("./topScope");
function run(program) {
    return evaluator_1.default(parser_1.default(program), Object.create(topScope_1.default));
}
exports.default = run;
