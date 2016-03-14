var expect = require('chai').expect;
var N = require('../numbers');
console.log(N);

describe('numbers', function() {
	it('should', function() {
		var test = N.test();
		expect(test).to.be.true;
	});


	describe('sumOfFirstXNumbers', function() {
		it('3 should return 6', function() {
			var sum = N.sumOfFirstXNumbers(3);
			expect(sum).to.equal(6);
		});
		it('10 should return 55', function() {
			var sum = N.sumOfFirstXNumbers(10);
			expect(sum).to.equal(55);
		});
	});

	describe('sumOfFirstXEvenNumbers', function() {
		it('3 should return 12', function() {
			var sum = N.sumOfFirstXEvenNumbers(3);
			expect(sum).to.equal(12);
		});
		it('10 should return 110', function() {
			var sum = N.sumOfFirstXEvenNumbers(10);
			expect(sum).to.equal(110);
		});
	});

	describe('sumOfFirstXOddNumbers', function() {
		it('3 should return 9', function() {
			var sum = N.sumOfFirstXOddNumbers(3);
			expect(sum).to.equal(9);
		});
		it('10 should return 100', function() {
			var sum = N.sumOfFirstXOddNumbers(10);
			expect(sum).to.equal(100);
		});
	});

	describe('squareOf', function() {
		it('5 should return 25', function() {
			var actual = N.squareOf(5, 5);
			expect(actual).to.equal(25);
		});
		it('59 should return 3481', function() {
			var actual = N.squareOf(59, 1);
			expect(actual).to.equal(3481);
		});
	});

	describe('multiplyNumbersCloseTo100', function() {
		it('104 * 109 should be 11336', function() {
			var expected = 11336;
			var actual = N.multiplyNumbersCloseTo100(104, 109);
			expect(actual).to.equal(expected);
		});
	});
});