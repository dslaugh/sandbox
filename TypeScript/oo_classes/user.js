"use strict";
var User = /** @class */ (function () {
    function User(_name, _email) {
        this._name = _name;
        this._email = _email;
        User.assertValidName(_name);
    }
    User.assertValidName = function (name) {
        var nameIsValid = name.length >= User.minimumNameLength;
        if (!nameIsValid) {
            throw Error('The given name is not valid');
        }
    };
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newName) {
            User.assertValidName(newName);
            this._name = newName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.speak = function () {
        console.log("I am " + this.name + ". My email is " + this.email);
    };
    User.minimumNameLength = 4;
    return User;
}());
var user = new User('Groot', 'groot@grootmail.com');
user.speak();
user.name = 'Rocket';
user.name = 'R';
