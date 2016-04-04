// A simple wrapper
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
    return {
        setSuffix: inner.setSuffix,
        printValue: function printValue(value) {
            return inner.printValue(value.toLowerCase());
        }
    };
}

function validatorDecorator(inner) {
    return {
        setSuffix: inner.setSuffix,
        printValue: function printValue(value) {
            var isValid = ~value.indexOf('My');

            setTimeout(function () {
                if (isValid) {
                    inner.printValue(value);
                } else {
                    console.log('not valid man...');
                }
            }, 500);
        }
    };
}

var component = validatorDecorator(toLowerDecorator(myComponentFactory()));
component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
