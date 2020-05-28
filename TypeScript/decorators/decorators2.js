"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var httpEndpoints = {};
function registerEndpoint(constructor) {
    var className = constructor.name;
    var endpointPath = '/' + className.toLowerCase();
    httpEndpoints[endpointPath] = new constructor();
}
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
    Families = __decorate([
        registerEndpoint
    ], Families);
    return Families;
}());
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
    Castles = __decorate([
        registerEndpoint
    ], Castles);
    return Castles;
}());
console.log(httpEndpoints);
console.log(httpEndpoints['/families'].get());
