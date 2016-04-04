'use strict';

require('harmony-reflect');

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
    return new Proxy(inner, {
        get: function get(target, name) {
            return name === 'printValue' ? function (value) {
                return target.printValue(value.toLowerCase());
            } : target[name];
        }
    });
}

function validatorDecorator(inner) {
    return new Proxy(inner, {
        get: function get(target, name) {
            return name === 'printValue' ? function (value) {
                var isValid = ~value.indexOf('My');

                setTimeout(function () {
                    if (isValid) {
                        target.printValue(value);
                    } else {
                        console.log('not valid man...');
                    }
                }, 500);
            } : target[name];
        }
    });
}

var component = validatorDecorator(toLowerDecorator(myComponentFactory()));

component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
