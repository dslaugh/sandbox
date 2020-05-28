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
function log(target, propertyKey, descriptor) {
    var orig = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 0) {
            var x = args.join(',');
            console.log(propertyKey + " called with " + args.length + " argument(s): " + x);
        }
        else {
            console.log(propertyKey + " called with no arguments");
        }
        orig.apply(this, args);
    };
    return descriptor;
}
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setName = function (newName) {
        this.name = newName;
    };
    User.prototype.doStuff = function (arg) {
        console.log(arg);
    };
    User.prototype.doStuff2 = function (arg1, arg2) {
        console.log(arg1 + " AND " + arg2);
    };
    __decorate([
        log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], User.prototype, "getName", null);
    __decorate([
        log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "setName", null);
    __decorate([
        log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "doStuff", null);
    __decorate([
        log,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "doStuff2", null);
    return User;
}());
var Dave = new User('Dave');
Dave.doStuff('hello');
Dave.doStuff2('hi', 'bye');
Dave.setName('David');
Dave.getName();
