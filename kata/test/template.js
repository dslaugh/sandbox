var expect = require('chai').expect;

describe('Kata', function() {
	describe('compose', function() {
		var compose = function() {
		};

		var add2 = function(x) {
			return x + 2;
		};
		var divide2 = function(x) {
			return x / 2;
		};

		it('should compose functions', function() {
			var divideThenAdd = compose(add2, divide2);
			var five = divideThenAdd(6);

			var addThenDivide = compose(divide2, add2);
			var four = addThenDivide(6);

			expect(five).to.equal(5);
			expect(four).to.equal(4);			
		});
	});



	describe('curry', function() {
		var curry = function(fn) {
		};

		var add = function(a, b) {
			return a + b;
		};

		var curriedAdd = curry(add);

		it('should return a function', function() {
			expect(curriedAdd).to.be.a('function');
		});

		it('should return a curried function', function() {
			var add2 = curriedAdd(2);

			var five = add2(3);

			expect(five).to.equal(5);
		});
	});

	describe('FP functions', function() {
		var forEach = function(fn, arr) {
		};

		var reduce = function(fn, initVal, arr) {
		};

		var map = function(fn, arr) {
		};

		var filter = function(fn, arr) {
		};

		it('should loop through an array', function() {
			var myArr = [1,2,3];
			var newArr = [];

			forEach(function(item) {
				newArr.push(item + 1);
			}, myArr);

			expect(newArr).to.eql([2,3,4]);
		});

		it('should implement reduce with forEach', function() {
			var myArr = [1,2,3];

			var sum = reduce(function(prev, curr) {
				return prev + curr;
			}, 0, myArr);

			var numStr = reduce(function(prev, curr) {
				return prev.toString() + curr.toString();
			}, '', myArr);

			expect(sum).to.equal(6);
			expect(numStr).to.equal('123');
		});

		it('should implement map with reduce', function() {
			var myArr = [1,2,3];
			var add1 = function(a) {return a + 1;};
			var x = map(add1, myArr);

			expect(x).to.eql([2,3,4]);
		});

		it('should implement filter with reduce', function() {
			var myArr = [1,2,3];
			var isLessThanThree = function(num) {
				return num < 3;
			};
			var x = filter(isLessThanThree, myArr);

			expect(x).to.eql([1,2]);
		});
	});

	describe('extend', function() {
		it('should extend an object', function() {
			var extend = function(consumer) {
			};

			var obj1 = {
				fname: 'david',
			};
			var obj2 = {
				lname: 'slaugh'
			};
			var obj3 = {
				email: 'dslaugh@gmail.com'
			};

			var expected = {
				fname: 'david',
				lname: 'slaugh',
				email: 'dslaugh@gmail.com'
			};

			extend(obj1, obj2, obj3);
			expect(obj1).to.eql(expected);
		});
	});

	describe('flip', function() {
		var flip = function(fn) {
			var reversedArgs = 
		};

		it('should reverse the order of arguments', function() {
			var divide(num1, num2) {
				return num1 / num2;
			};

			var reversedDivide = flip(divide);
			var actual = reversedDivide(2, 10);
			var expected = 5;
			expect(actual).to.equal(expected);
		});
	});

});
