const {
	sieveOfEratosthenes,
	reversePolishNotationCalculator,
} = require('./index');

describe('sieve of erastothenes', () => {
	test('should return only primes', () => {
		const expected = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47];
		const actual = sieveOfEratosthenes(50);
		expect(actual).toEqual(expected);
	});

	test('It should throw an error if the input is not a number', () => {
		expect(() => {
			sieveOfEratosthenes('bad');
		}).toThrow();
	});

	test('It should throw an error if the number is not an integer', () => {
		expect(() => {
			sieveOfEratosthenes(1.5);
		}).toThrow();
	});

	test('It should throw an error if the number is less than 2', () => {
		expect(() => {
			sieveOfEratosthenes(1);
		}).toThrow();
	});
});

describe('reverse polish notation calculator', () => {
	test('it should work', () => {
		const str = '3 2 +';
		const expected = 5;
		const actual = reversePolishNotationCalculator(str);
		expect(actual).toEqual(expected);
	});

	test('it should work', () => {
		const str = '3 2 6 + *';
		const expected = 24;
		const actual = reversePolishNotationCalculator(str);
		expect(actual).toEqual(expected);
	});

	test('it should work', () => {
		const str = '2 3 6 4 + * /';
		const expected = 15;
		const actual = reversePolishNotationCalculator(str);
		expect(actual).toEqual(expected);
	});

	test('it should throw an error if there are too many operands', () => {
		const str = '2 3 6 4 + *';
		expect(() => {
			reversePolishNotationCalculator(str);
		}).toThrow('There are too many operands');
	});

	test('it should throw an error if there are too many operators', () => {
		const str = '2 3 6 + * /';
		expect(() => {
			reversePolishNotationCalculator(str);
		}).toThrow('There are too many operators');
	});

	test('it should throw an error if an operand is not an integer', () => {
		const str = '2 3 z + *';
		expect(() => {
			reversePolishNotationCalculator(str);
		}).toThrow('Operand is not an integer');
	});
});

