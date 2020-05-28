"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var students_1 = require("./students");
//function getBy<T>(model: T[], prop: string, value): T | null {
//  return model.filter(item => item[prop] === value)[0];
//}
function getBy(model, prop, value) {
    return model.filter(function (item) { return item[prop] === value; })[0] || null;
}
var result = getBy(students_1.students, 'hasScar', true);
console.log('result:', result);
