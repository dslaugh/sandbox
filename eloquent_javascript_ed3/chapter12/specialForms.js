"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluator_1 = require("./evaluator");
const specialForms = Object.create(null);
specialForms.if = (args, scope) => {
    if (args.length !== 3) {
        throw new SyntaxError('Wrong number of args to if');
    }
    else if (evaluator_1.default(args[0], scope) !== false) {
        return evaluator_1.default(args[1], scope);
    }
    else {
        return evaluator_1.default(args[2], scope);
    }
};
specialForms.while = (args, scope) => {
    if (args.length !== 2) {
        throw new SyntaxError('Wrong number of args to while');
    }
    while (evaluator_1.default(args[0], scope) !== false) {
        evaluator_1.default(args[1], scope);
    }
    return false;
};
specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluator_1.default(arg, scope);
    }
    return value;
};
specialForms.define = (args, scope) => {
    if (args.length !== 2) {
        throw new SyntaxError('Incorrect use of define');
    }
    const value = evaluator_1.default(args[1], scope);
    scope[args[0].name] = value;
    return value;
};
specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError('Functions need a body');
    }
    const body = args[args.length - 1];
    const params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type !== 'word') {
            throw new SyntaxError('Parameter names must be words');
        }
        return expr.name;
    });
    return function () {
        if (arguments.length !== params.length) {
            throw new TypeError('Wrong number of arguments');
        }
        const localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluator_1.default(body, localScope);
    };
};
exports.default = specialForms;
