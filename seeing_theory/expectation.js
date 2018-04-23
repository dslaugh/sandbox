// http://students.brown.edu/seeing-theory/basic-probability/index.html

// The probability weighted sum of all possible values in the random variable's support.
function expectation(data) {
    return data.reduce((sum, val) => {
        return sum + (val[0] * val[1]);
    }, 0);
}

function variance(data, expectation) {
    const sum = data.reduce((total, val) => {
        return total + ((val[0] - expectation) ** 2);
    }, 0);

    return sum / data.length;
}

const testDice = [
    [1, 0.167],
    [2, 0.167],
    [3, 0.167],
    [4, 0.167],
    [5, 0.167],
    [6, 0.167],
];

const testDeck10 = [
    [1, .1],
    [2, .1],
    [3, .1],
    [4, .1],
    [5, .1],
    [6, .1],
    [7, .1],
    [8, .1],
    [9, .1],
    [10, .1],
];

const testDeck13 = [
    [1, 1/13],
    [2, 1/13],
    [3, 1/13],
    [4, 1/13],
    [5, 1/13],
    [6, 1/13],
    [7, 1/13],
    [8, 1/13],
    [9, 1/13],
    [10, 1/13],
    [11, 1/13],
    [12, 1/13],
    [13, 1/13],
];

const x = expectation(testDice);
x;

const y = variance(testDeck10, expectation(testDeck10));
y;