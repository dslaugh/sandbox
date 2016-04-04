require('harmony-reflect');

function myComponentFactory() {
    let suffix = '';

    return {
        setSuffix: suf => suffix = suf,
        printValue: value => console.log(`value is ${value + suffix}`)
    };
}

function toLowerDecorator(inner) {
    return new Proxy(inner, {
        get: (target, name) => {
            return (name === 'printValue') ? value => target.printValue(value.toLowerCase()) : target[name];
        }
    });
}

function validatorDecorator(inner) {
    return new Proxy(inner, {
        get: (target, name) => {
            return (name === 'printValue')
                ? value => {
                    const isValid = ~value.indexOf('My');

                    setTimeout(() => {
                        if (isValid) {
                            target.printValue(value);
                        } else {
                            console.log('not valid man...');
                        }
                    }, 500);
                }
                : target[name];
        }
    });
}

const component = validatorDecorator(toLowerDecorator(myComponentFactory()));

component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
