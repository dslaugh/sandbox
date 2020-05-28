"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var students_1 = require("./students");
var teachers_1 = require("./teachers");
Array.prototype.getBy = function (prop, value) {
    return this.filter(function (item) { return item[prop] === value; })[0] || null;
};
var bestie = students_1.students.getBy('name', 'Ron');
console.log('bestie:', bestie);
var potionsTeacher = teachers_1.teachers.getBy('subject', 'Potions');
console.log('potionsTeacher:', potionsTeacher);
