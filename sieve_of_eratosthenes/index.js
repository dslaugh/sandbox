function sieveOfEratosthenes(num) {
	if (typeof num !== 'number') {
		throw new Error(`Input must be a number. ${typeof num} given`);
	}
	if (!Number.isInteger(num) || (num < 2)) {
		throw new Error('Input must be an positive integer greater than or equal to 2');
	}

	let i = 2;
	const allNumbersArray = [];
	const pigeonHoleArray = [];

	while (i <= num) {
		let j = i + 1;
		allNumbersArray.push(i);
		while (j <= num) {
			if (j % i === 0) {
				pigeonHoleArray.push(j);
			}
			j += 1;
		}
		i += 1;
	}
	return allNumbersArray.filter(n => !pigeonHoleArray.includes(n));
}

function reversePolishNotationCalculator(str) {
	const calculators = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
	};
	const operators = Object.keys(calculators);
	const operands = [];

	str.split(' ').forEach((input) => {
		if (operators.includes(input)) {
			if (operands.length < 2) {
				throw new Error('There are too many operators');
			}
			const a = operands.pop();
			const b = operands.pop();
			const result = calculators[input](a, b);
			operands.push(result);
		} else {
			const op = parseInt(input, 10);
			if (!Number.isInteger(op)) {
				throw new Error('Operand is not an integer');
			}
			operands.push(op);
		}
	});

	if (operands.length > 1) {
		throw new Error('There are too many operands');
	}
	return operands[0];
}

module.exports = {
	sieveOfEratosthenes,
	reversePolishNotationCalculator
};
