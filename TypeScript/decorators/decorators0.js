"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Families = /** @class */ (function () {
    function Families() {
        this.houses = ['Lannister', 'Targaryen'];
    }
    Families.prototype.get = function () {
        return this.houses;
    };
    Families.prototype.post = function (request) {
        this.houses.push(request.body);
    };
    return Families;
}());
exports.Families = Families;
var Castles = /** @class */ (function () {
    function Castles() {
        this.castles = ["Winterfell", "Casterly Rock"];
    }
    Castles.prototype.get = function () {
        return this.castles;
    };
    Castles.prototype.post = function (request) {
        this.castles.push(request.body);
    };
    return Castles;
}());
exports.Castles = Castles;
