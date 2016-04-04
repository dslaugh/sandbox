'use strict';

function myComponentFactory() {
    var suffix = '';

    var instance = {
        setSuffix: function setSuffix(suf) {
            return suffix = suf;
        },
        printValue: function printValue(value) {
            return console.log('value is ' + (value + suffix));
        },
        addDecorators: function addDecorators(decorators) {
            var printValue = instance.printValue;
            decorators.slice().reverse().forEach(function (decorator) {
                return printValue = decorator(printValue);
            });
            instance.printValue = printValue;
        }
    };
    return instance;
}

function toLowerDecorator(inner) {
    return function (value) {
        return inner(value.toLowerCase());
    };
}

function validatorDecorator(inner) {
    return function (value) {
        var isValid = ~value.indexOf('My');

        setTimeout(function () {
            if (isValid) {
                inner(value);
            } else {
                console.log('Not valid man...');
            }
        }, 500);
    };
}

var component = myComponentFactory();
component.addDecorators([validatorDecorator, toLowerDecorator]);
component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
