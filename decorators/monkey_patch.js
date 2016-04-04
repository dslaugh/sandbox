// Monkey patching
function myComponentFactory() {
    let suffix = '';

    return {
        setSuffix: suf => suffix = suf,
        printValue: value => console.log(`value is ${value + suffix}`)
    };
}

function decorateWithToLower(inner) {
    const originalPrintValue = inner.printValue;
    inner.printValue = value => originalPrintValue(value.toLowerCase());
}

function decorateWithValidator(inner) {
    const originalPrintValue = inner.printValue;
    inner.printValue = value => {
        const isValid = ~value.indexOf('My');

        setTimeout(() => {
            if (isValid) originalPrintValue(value);
            else console.log('not valid man...');
        }, 500);
    };
}

const component = myComponentFactory();
decorateWithToLower(component);
decorateWithValidator(component);

component.setSuffix('!');
component.printValue('My Value');
component.printValue('Invalid Value');
