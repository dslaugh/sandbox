"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const specialForms_1 = require("./specialForms");
function evaluate(expr, scope) {
    if (expr.type === 'value') {
        return expr.value;
    }
    else if (expr.type === 'word') {
        if (expr.name in scope) {
            return scope[expr.name];
        }
        else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
        }
    }
    else if (expr.type === 'apply') {
        const { operator, args } = expr;
        if (operator.type === 'word' && operator.name in specialForms_1.default) {
            return specialForms_1.default[operator.name](expr.args, scope);
        }
        else {
            const op = evaluate(operator, scope);
            if (typeof op === 'function') {
                return op(...args.map(arg => evaluate(arg, scope)));
            }
            else {
                throw new TypeError('Applying a non-function');
            }
        }
    }
}
exports.default = evaluate;
