// Monkey patching
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

function decorateWithToLower(inner) {
    var originalPrintValue = inner.printValue;
    inner.printValue = function (value) {
        return originalPrintValue(value.toLowerCase());
    };
}

function decorateWithValidator(inner) {
    var originalPrintValue = inner.printValue;
    inner.printValue = function (value) {
        var isValid = ~value.indexOf('My');

        setTimeout(function () {
            if (isValid) originalPrintValue(value);else console.log('not valid man...');
        }, 500);
    };
}

var component = myComponentFactory();
decorateWithToLower(component);
decorateWithValidator(component);

component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
