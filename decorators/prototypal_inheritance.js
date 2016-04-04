function myComponentFactory() {
    let suffix = '';

    return {
        setSuffix: suf => suffix = suf,
        printValue: value => console.log(`value is ${value + suffix}`)
    };
}

function toLowerDecorator(inner) {
    const instance = Object.create(inner);
    instance.printValue = value => inner.printValue(value.toLowerCase());
    return instance;
}

function validatorDecorator(inner) {
    const instance = Object.create(inner);
    instance.printValue = value => {
        const isValid = ~value.indexOf('My');

        setTimeout(() => {
            if (isValid) {
                inner.printValue(value);
            } else {
                console.log('invalid value man...');
            }
        }, 500);
    };
    return instance;
}

const component = validatorDecorator(toLowerDecorator(myComponentFactory()));

component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
