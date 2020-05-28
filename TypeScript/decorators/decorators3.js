"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var httpEndpoints = {};
var protectedMethods = [];
function registerEndpoint(constructor) {
    var className = constructor.name;
    var endpointPath = '/' + className.toLowerCase();
    httpEndpoints[endpointPath] = new constructor();
}
function protect(target, propertyKey, descriptor) {
    var className = target.constructor.name;
    protectedMethods.push(className + '.' + propertyKey);
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
    __decorate([
        protect,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Families.prototype, "get", null);
    __decorate([
        protect,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Families.prototype, "post", null);
    Families = __decorate([
        registerEndpoint
    ], Families);
    return Families;
}());
console.log(protectedMethods);
