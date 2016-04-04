'use strict';

function myComponentFactory() {
    var suffix = '';

    return {
        setSuffix: function setSuffix(suf) {
            return suffix = suf;
        },
        printValue: function printValue(value) {
            return console.log('value is ' + (value + suffix));
        }
    };
}

function toLowerDecorator(inner) {
    var instance = Object.create(inner);
    instance.printValue = function (value) {
        return inner.printValue(value.toLowerCase());
    };
    return instance;
}

function validatorDecorator(inner) {
    var instance = Object.create(inner);
    instance.printValue = function (value) {
        var isValid = ~value.indexOf('My');

        setTimeout(function () {
            if (isValid) {
                inner.printValue(value);
            } else {
                console.log('invalid value man...');
            }
        }, 500);
    };
    return instance;
}

var component = validatorDecorator(toLowerDecorator(myComponentFactory()));

component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
