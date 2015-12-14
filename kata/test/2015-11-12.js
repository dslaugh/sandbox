var expect = require('chai').expect;

describe('Kata', function() {
	describe('compose', function() {
		var compose = function() {
			var fns = Array.prototype.slice.call(arguments, 0).reverse();
			return function(initVal) {
				return fns.reduce(function(prevVal, currVal) {
					return currVal(prevVal);
				}, initVal);
			}
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
			return given([]);

			function given(argsSoFar) {
				return function() {
					var updatedArgsSoFar = argsSoFar.concat(Array.prototype.slice.call(arguments, 0));
					if (updatedArgsSoFar.length >= fn.length) {
						return fn.apply(this, updatedArgsSoFar);
					} else {
						return given(updatedArgsSoFar);
					}
				};
			}
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
			var i = 0;
			var len = arr.length;
			for(; i<len; i++) {
				fn(arr[i]);
			}
		};

		var reduce = function(fn, initVal, arr) {
			forEach(function(currVal) {
				initVal = fn(initVal, currVal);
			}, arr);
			return initVal;
		};

		var map = function(fn, arr) {
			return reduce(function(prevVal, currVal) {
				prevVal.push(fn(currVal));
				return prevVal;
			}, [], arr);
		};

		var filter = function(fn, arr) {
			return reduce(function(prevVal, currVal) {
				if (fn(currVal)) {
					prevVal.push(currVal);
				}
				return prevVal;
			}, [], arr);
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
				var providers = Array.prototype.slice.call(arguments, 1);
				providers.forEach(function(provider) {
					for(var key in provider) {
						if (provider.hasOwnProperty(key)) {
							consumer[key] = provider[key];
						}
					}
				});
				return consumer;
			};

			var obj1 = {
				fname: 'david'
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

			var returnedObj = extend(obj1, obj2, obj3);
			expect(obj1).to.eql(expected);
			expect(returnedObj).to.eql(expected);
		});
	});

});
