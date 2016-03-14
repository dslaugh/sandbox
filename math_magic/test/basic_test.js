var expect = require('chai').expect;
var A = require('../basic.js');

describe('adding', function() {
	it('should return the sum two numbers', function() {
		var two = A.add(1, 1);
		expect(two).to.equal(2);	
	});
});

describe('factorTens()', function() {
	it('should return [80, 8]', function() {
		var test1 = A.factorTens(88);
		expect(test1).to.eql([80, 8]);
	});
});

describe('multiplyOneDigitByTwoDigits()', function() {
	it('', function() {
		var test1 = A.multiplyOneDigitByTwoDigits();
		expect(test1).to.equal('hi');
	});
});