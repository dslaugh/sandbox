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
function registerEndpointFactory(endpointPath) {
    return function registerEndpoint(constructor) {
        httpEndpoints[endpointPath] = new constructor();
    };
}
function protect(token) {
    if (token === void 0) { token = {}; }
    return function (target, propertyKey, descriptor) {
        var originalFunction = descriptor.value;
        descriptor.value = function (request) {
            if (request.token !== token) {
                throw new Error('forbidden!');
            }
            var bindedOriginalFunction = originalFunction.bind(this);
            var result = bindedOriginalFunction(request);
            return result;
        };
    };
}
var StarkMembers = /** @class */ (function () {
    function StarkMembers() {
        this.members = ['Robb', 'Sansa', 'Arya'];
    }
    StarkMembers.prototype.get = function (request) {
        return this.members;
    };
    StarkMembers.prototype.post = function (request) {
        this.members.push(request.body);
    };
    __decorate([
        protect('abc'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StarkMembers.prototype, "get", null);
    __decorate([
        protect('abc'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StarkMembers.prototype, "post", null);
    StarkMembers = __decorate([
        registerEndpointFactory('/families/stark/members')
    ], StarkMembers);
    return StarkMembers;
}());
console.log(httpEndpoints);
httpEndpoints['/families/stark/members'].post({ body: 'Bran', token: 'abc' });
console.log(httpEndpoints['/families/stark/members'].get({ token: 'abc' }));
