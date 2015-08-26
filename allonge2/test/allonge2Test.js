var expect = require('chai').expect;
var A = require('../transpiled.js').allonge2;

describe('sanity check', function() {
	it('should work', function() {
		expect(true).to.be.true;
	});

	it('should', function() {
		var numAttachments = 10;
		var getNextAttachmentNum = (function(numAttachments) {
			return function(currentAttachmentNum) {
				return numAttachments + currentAttachmentNum;
			}
		})(numAttachments);
		var test = getNextAttachmentNum(4);
		expect(test).to.equal(14);
	});
});

describe('compose', function() {
	it('should compose functions', function() {
		var add2 = function(x) {return x + 2;};
		var divide2 = function(x) {return x/2;};

		var test = A.compose(add2, divide2);
		var z = test(10);
		expect(z).to.equal(7);
		var test2 = A.compose(divide2, add2);
		var q = test2(10);
		expect(q).to.equal(6);
	});
});

describe('Playing around with curry and compose', function() {

	var testObj = {
		name: 'David',
		id: 69,
		location: 'USA'
	};

	function toUpper(str) {
		return str.toUpperCase();
	};
	var getName = A.prop('name');

	it('should be a function', function() {
		expect(getName).to.be.a.function;
	});

	it('should return the name property', function() {
		var name = getName(testObj);
		expect(name).to.equal('David');
	});

	it('should compose a function that gets the name and changes it to uppercase', function() {
		var nameToUpper = A.compose(toUpper, A.prop(['name']));
		var upperCaseName = nameToUpper(testObj);
		expect(upperCaseName).to.equal('DAVID');
	});

	it('should map', function() {
		var testArr = {
			'numbers': [1, 2, 3]
		};
		var addOne = A.map(function(x) {return x + 1});
		expect(addOne).to.be.a.function;
		// var plusOne = addOne(testArr);
		// expect(plusOne).to.eql([2,3,4]);
		
		var addOne2 = A.compose(addOne, A.prop('numbers'));
		var plusOne2 = addOne2(testArr);
		expect(plusOne2).to.eql([2,3,4]);

	});
});

describe('self similarity', function() {
	describe('length', function() {
		it('should return the length of an array', function() {
			var zeroLength = A.length([]);
			expect(zeroLength).to.equal(0);

			var oneLength = A.length(['foo']);
			expect(oneLength).to.equal(1);

			var three = A.length(['foo', 'bar', 'baz']);
			expect(three).to.equal(3);
		});
	});

	describe('flatten', function() {
		it('should flatten an array', function() {
			var actual = A.flatten(['foo', [3, 4, []]]);
			expect(actual).to.eql(['foo',3,4]);
		});
	});

	describe('squareAll', function() {
		it('should square all numbers in an array', function() {
			var actual = A.squareAll([1,2,3,4,5]);
			expect(actual).to.eql([1,4,9,16,25]);
		});
	});

	describe('mapWith', function() {
		it('should map a function over an array', function() {
			var actual = A.mapWith(function(x) {return x * x}, [1,2,3,4,5]);
			expect(actual).to.eql([1,4,9,16,25]);
		});
	});

	describe('foldWith', function() {
		it('this is basically a reduce function', function() {
			var sumSquare = function(number, rest) {
				return number * number + rest;
			}
			var actual = A.foldWith(sumSquare, 0, [1,2,3,4,5]);
			expect(actual).to.equal(55);
		});

		it('should be a map function built with foldWith', function() {
			var add1 = function(x) {return x + 1};
			var test = A.mapWith2(add1, [1,2,3]);
			expect(test).to.eql([2,3,4]);
		});
	});

	describe('cons', function() {
		it('cons', function() {
			var node5 = [5, null],
				node4 = [4, node5],
				node3 = [3, node4],
				node2 = [2, node3],
				node1 = [1, node2];

			var oneToFive = node1;

			var car = A.car(oneToFive);
			expect(car).to.equal(1);	
			console.log(A.cdr(oneToFive));
		});
	});
});