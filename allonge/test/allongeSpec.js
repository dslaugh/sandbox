var expect = require('chai').expect;
var F = require('../allonge.js').allonge;

describe('F', function() {
	it('should be there', function() {
		expect(F).to.be.an('object');
	});
});

describe('Values and expressions', function() {
	it('All values are expressions', function() {
		var a = 42;
		expect(a).to.equal(42);
	});

	it('Values plus an operator is an expression', function() {
		var a = 'Javascript' + ' ' + 'D';
		expect(a).to.equal('Javascript D');
	});
});

describe('Value (primitive) types', function() {
	it('Value types with the same content are identical ', function() {
		expect(2).to.eql(2);
		expect(2).to.not.eql('2');
		expect(2).to.not.eql(5);
		expect(true).to.eql(true);
		expect(true).to.not.eql(false);
		expect(true).to.not.eql('true');
	});
});

describe('Reference types', function() {
	describe('Arrays', function() {
		it('Are they identical?', function() {
			var a = [2-1, 2, 2+1] === [1,2,3];
			expect(a).to.be.false;

			var b = [1,2,3] === [1, 2, 3];
			expect(b).to.be.false;

			var c = [1, 2, 3] === [1, 2, 3];
			expect(c).to.be.false;
		});
	});
});

describe('Functions', function() {
	it('Should be a function', function() {
		var a = function() {};
		expect(a).to.be.a('function');
	});

	it('Comparing functions with the same contents', function() {
		var a = function() {} === function() {};
		expect(a).to.be.false;
	});

	it('Applying a function to some arguments', function() {
		var a = (function() {})();
		expect(a).to.be.undefined;
	});

	it('undefined is a value type', function() {
		var a = undefined === undefined;
		var b = (function(){})() === (function(){})();
		var c = (function(){})() === undefined;

		expect(a).to.be.true;
		expect(b).to.be.true;
		expect(c).to.be.true;
	});

	it('should return true no matter what is passed to it', function() {
		// This shows that reference types are passed by reference
		function test(value) {
			return (function(copy) {
				return value === copy;
			})(value);
		}

		var testResult1 = test(true);
		expect(testResult1).to.be.true;

		var testResult2 = test(false);
		expect(testResult2).to.be.true;

		var testResult3 = test(2);
		expect(testResult3).to.be.true;

		var testResult4 = test([1,2,3]);
		expect(testResult4).to.be.true;
	});

	it('should return undefined', function() {
		var a = (function() {
			return someName;
			var someName = function someName() {};
		})();
		expect(a).to.be.undefined;
	});

	it('should return a function', function() {
		var a = (function() {
			return someName;
			function someName() {};
		})();

		expect(a).to.be.a('function');
	});
});

describe('Combinators', function() {
	it('should compose two functions', function() {
		function addOne(num) {return num + 1;};
		function doubleOf(num) {return num * 2};

		function doubleOfAddOne1(num) {
			return doubleOf(addOne(num));
		}

		var ten = doubleOfAddOne1(4);
		expect(ten).to.equal(10);

		var doubleOfAddOne = F.compose(doubleOf, addOne);
		var twelve = doubleOfAddOne(5);
		expect(twelve).to.equal(12);
	});

});

describe('Decorators', function() {
	it('should negate a function', function() {
		function isTen(num) {
			return num === 10;
		};

		var a = isTen(10);
		expect(a).to.be.true;

		var b = isTen(12);
		expect(b).to.be.false;

		var c = F.not(isTen)(12);
		expect(c).to.be.true;

		var d = F.not(isTen)(10);
		expect(d).to.be.false;
	});
});

describe('Composition', function() {
	function square(num) {
		return num * num;
	}
	var squareAll = F.mapWith(square);
	describe('mapWith', function() {
		it('should return a function', function() {
			expect(squareAll).to.be.a('function');
		});
		it('should return an array of numbers that have been squared', function() {
			var nums = [1,2,3];
			var squaredNums = squareAll(nums);
			expect(squaredNums).to.eql([1,4,9]);
		});

		it('should return an array of strings with something appended', function() {
			var strs = ['David', 'Slaugh'];
			var appendIsCool = F.mapWith(function(str) {
				return str + ' is cool';
			});
			var newArray = appendIsCool(strs);
			expect(newArray).to.eql(['David is cool', 'Slaugh is cool']);
		});

	});

	describe('callFirst', function() {
		function greet(me, you) {
			return 'Hello, ' + you + ', my name is ' + me;
		}
		
		var davidSaysHello = F.callFirst(greet, 'David');
		it('should return a function', function() {
			expect(davidSaysHello).to.be.a('function');	
		});

		it('should return a greeting', function() {
			var greeting = davidSaysHello('Bob');
			expect(greeting).to.equal('Hello, Bob, my name is David');
		});

		it('something', function() {
			function addFourArgs(a,b,c,d) {
				return a + b + c + d;
			}

			var test = F.callFirst(addFourArgs, 10);
			var twenty = test(5,3,2);
			expect(twenty).to.equal(20);

		});
	});

	describe('callLast', function() {
		function greet(me, you) {
			return 'Hello, ' + you + ', my name is ' + me;
		}
		var sayHelloToBob = F.callLast(greet, 'Bob');
		it('should return a function', function() {
			expect(sayHelloToBob).to.be.a('function');
		});

		it('should return a greeting', function() {
			var greeting = sayHelloToBob('David');
			expect(greeting).to.equal('Hello, Bob, my name is David');
		});

		it('testing', function() {
			var divide = function(a, b) {return a/b};
			var minutesToHours = F.callLast(divide, 60);
			var halfHour = minutesToHours(30);
			expect(halfHour).to.equal(0.5);
			
		});
	});

	describe('variadic', function() {
		// I don't fully understand variadic
		function unary(first) {
			return first;
		}

		function binary(first, rest) {
			// console.log('here');
			// console.log(arguments);
			return [first, rest];
		};

		it('should do something', function() {
			var args = F.variadic(unary)('why', 'hello', 'there');
			expect(args).to.eql(['why', 'hello', 'there']);
		});

		var variadicFunc = F.variadic(binary);

		it('should return a function', function() {
			expect(variadicFunc).to.be.a('function');
		});

		it('should collect trailing arguments into an array', function() {
			var args = variadicFunc('why', 'hello', 'there');
			var expected = ['why',  ['hello', 'there']];
			expect(args).to.eql(expected);
		});

		it('should create mapper', function() {
			var mapper = F.variadic(function(fn, elements) {
				return elements.map(fn);
			});

			var results = mapper(function(x) {return x * x}, 1, 2, 3);
			expect(results).to.eql([1,4,9]);

			var squarer = F.callLeft(mapper, function(x) {return x * x});
			var results2 = squarer(1,2,3);
			expect(results2).to.eql([1,4,9]);
		});


	});

	describe('callLeft', function() {
		it('something', function() {
			function addFourArgs(a,b,c,d) {
				return a + b + c + d;
			}

			var test = F.callLeft(addFourArgs, 10, 5);
			var twenty = test(3,2);
			expect(twenty).to.equal(20);			
		});
	});

	describe('unary', function() {
		it('should return a function that takes exactly one argument', function() {
			var testFn = function(a, b) {
				if (b) {
					return false;
				} else {
					return a;
				}
			};
			var unaryTestFn = F.unary(testFn);
			var test = unaryTestFn(2,2);
			expect(test).to.equal(2);

			var a = [1,2,3].map(F.unary(parseInt));
			expect(a).to.eql([1,2,3]);
		});
	});

	describe('tap', function() {
		it('should return a function that returns the same value it is passed', function() {
			var returnTwelve = F.tap(12);
			expect(returnTwelve()).to.equal(12);

			var returnArray = F.tap([1,2,3]);
			expect(returnArray()).to.eql([1,2,3]);
		});

		it('if the returned function passes a function, it should execute the function for side effects', function() {
			var x;
			var setX = function(a) {x = a;};
			var three = F.tap(3)(setX);
			expect(x).to.equal(3);
		});
	});

	describe('maybe', function() {
		it('should return a function that does nothing if it is passed nothing', function() {
			var getX = function(x) {return x;};
			var maybeGetX = F.maybe(getX);

			var test = maybeGetX(1);
			expect(test).to.equal(1);

			var test2 = maybeGetX(null);
			expect(test2).to.equal(undefined);
		});
	});

	describe('arguments and references', function() {
		it('should evalutate to true', function() {
			var x = [1970, 11, 14];
			var y = x;
			expect(y === x).to.be.true;

			var test = (function(y) {
				return x === y
			})(x);
			expect(test).to.be.true;
		});
	});

	describe('arguments and arrays', function() {
		var unique = function() {return function() {}};
		it('should return false', function() {
			var test = unique() === unique();
			expect(test).to.be.false;
		});

		it('should return true', function() {
			var x = unique();
			var y = x;
			expect(x === y).to.be.true;	
		});

		it('should return true', function() {
			var x = unique();
			var a = [x];
			expect(a[0] === x).to.be.true;
		});
	});

	describe('references and objects', function() {
		it('two objects should not be identical', function() {
			var test = {one: 1, two: 2} === {one: 1, two: 2};
			expect(test).to.be.false;
		});
	});

	describe('mutations and aliases', function() {
		it('should evaluate as identical', function() {
			var allHallowsEve = [2012, 10, 31];
			var halloween = allHallowsEve;
			expect(allHallowsEve === halloween).to.be.true;
		});

		it('should remain the same after rebinding inner environment', function() {
			var allHallowsEve = [2012, 10, 31];
			(function(halloween) {
				halloween = [2013, 10, 31];
			})(allHallowsEve);
			expect(allHallowsEve).to.eql([2012, 10, 31]);
		});

		it('should not evaluate as identical after mutation in inner environment', function() {
			var allHallowsEve = [2012, 10, 31];
			(function(halloween) {
				halloween[0] = 2013;
			})(allHallowsEve);
			expect(allHallowsEve).to.eql([2013, 10, 31]);
		});
	});

	describe('How to shoot yourself in the foot with var', function() {
		it('should...', function() {
			var outer, inner;
			var questionable = 'outer';
			(function() {
				outer = questionable;

				if (true) {
					var questionable = 'inner';
					inner = questionable;
				}
			})();
			expect(outer).to.be.undefined;
			expect(inner).to.equal('inner');
		});

		it('should show names[1] as undefined', function() {
			var introductions = [],
				names = ['Karl', 'Friedrich', 'Gauss'];

			for (var i = 0; i < 3; i++) {
				introductions[i] = function(soAndSo) {
					return 'Hello, ' + soAndSo + ' my name is ' + names[i]; 
				}
			}
			var test = introductions[1]('David');
			expect(test).to.equal('Hello, David my name is undefined');
		});

		it('should show names[1] as Friedrich', function() {
			var introductions = [],
				names = ['Karl', 'Friedrich', 'Gauss'];

			for (var i = 0; i < 3; i++) {
				(function(i) {
					introductions[i] = function(soAndSo) {
						return 'Hello, ' + soAndSo + ' my name is ' + names[i]; 
					}
				})(i);
			}
			var test = introductions[1]('David');
			expect(test).to.equal('Hello, David my name is Friedrich');
		});
	});
});


describe('rebinding and recursion', function() {
	describe('once', function() {
		it('should return a function that can only be called once', function() {
			var add = function(a, b) {return a + b;};

			var addOnce = F.once(add);
			var two = addOnce(1,1);
			expect(two).to.equal(2);
			var three = addOnce(1,2);
			expect(three).to.be.undefined;
		});
	});
	
	describe('flip', function() {
		var divide = function(a, b) {return a/b;};
		var flippedDivide = F.flip(divide);
		it('should return a function that accepts arguments in reverse order', function() {
			var two = flippedDivide(1,2);
			expect(two).to.equal(2);
		});

		it('should return a curried function that accepts arguments in reverse order', function() {
			var minutesToHours = flippedDivide(60);
			var halfHour = minutesToHours(30);
			expect(halfHour).to.equal(0.5);
		});
	});

	describe('extend', function() {
		var fruits = {apples: 12, oranges: 12};
		it('should make a copy of an object', function() {
			var fruitsCopy = F.extend({}, fruits);
			expect(fruits === fruitsCopy).to.be.false;
			expect(fruitsCopy).to.eql(fruits);
		});

		it('should add items to an object from another object', function() {
			var fruitsCopy = F.extend({}, fruits);
			var newFruits = {bananas: 12, pears: 12};
			var newInventory = F.extend(fruitsCopy, newFruits);
			expect(newInventory).to.eql({apples: 12, oranges: 12, bananas: 12, pears: 12});
		});

		it('should override items in the original object if new object has them also', function() {
			var fruitsCopy = F.extend({}, fruits);
			var newFruits2 = {apples: 25, bananas: 12};
			var newInventory2 = F.extend(fruitsCopy, newFruits2);
			expect(newInventory2).to.eql({apples: 25, oranges: 12, bananas: 12});
		});
	});

});

describe('Encapsulating state with closures', function() {
	describe('stack', function() {
		var stack1 = F.StackMaker()
		it('should be an object', function() {
			expect(stack1).to.be.an('object');
		});

		it('should be empty', function() {
			var isEmpty = stack1.isEmpty();
			expect(isEmpty).to.be.true;
		});

		it('should allow something to be pushed onto it', function() {
			stack1.push('first item');
			expect(stack1.isEmpty()).to.be.false;
		});

		it('should allow something to be popped off it', function() {
		 	var result = stack1.pop();
		 	expect(result).to.equal('first item');
		 	expect(stack1.isEmpty()).to.be.true;
		});

		it('should allow us to make a new stack', function() {
			var stack2 = F.StackMaker();
			stack1.push('one');
			stack2.push('two');
			expect(stack1.pop()).to.equal('one');
			expect(stack2.pop()).to.equal('two');
		});

	});

	describe('QueueMaker', function() {
		var queue = F.QueueMaker();
		it('should allow pushing onto the tail of the queue', function() {
			queue.pushTail('first item');
			queue.pushTail('second item');
			queue.pushTail('third item');
		});

		it('should allow pulling from the head', function() {
			var x = queue.pullHead();
			expect(x).to.equal('first item');
			var y = queue.pullHead();
			expect(y).to.equal('second item');
			var z = queue.pullHead();
			expect(z).to.equal('third item');
		});
	});

	describe('Weirdness of extend', function() {
		var queue = F.QueueMaker();
		queue.pushTail('Hello');
		queue.pushTail('Javascript');
		var copyOfQueue = F.extend({}, queue);

		it('should not be identical to queue', function() {
			expect(queue !== copyOfQueue).to.be.true;
		});

		it('more weirdness', function() {
			copyOfQueue.array = [];
			for (var i = 0; i < queue.array.length; i++) {
				copyOfQueue.array[i] = queue.array[i];
			}

			var orig = queue.pullHead();
			expect(orig).to.equal('Hello');

			var copy = copyOfQueue.pullHead();
			expect(copy).to.equal('Javascript');
		});
	});

	describe('AmnesiacQueueMaker', function() {
		it('should work as separate queues', function() {
			var aQ1 = F.AmnesiacQueueMaker();

			aQ1.pushTail(aQ1, 'Hello');
			aQ1.pushTail(aQ1, 'Javascript');

			var aQ2 = F.AmnesiacQueueMaker()
			aQ2.pushTail(aQ2, 'Hello');
			aQ2.pushTail(aQ2, 'Javascript');
			
			var test1 = aQ1.pullHead(aQ1);
			expect(test1).to.equal('Hello');
			
			var test2 = aQ2.pullHead(aQ2);
			expect(test2).to.equal('Hello');
		});
	});

	describe('BanksQueueMaker', function() {
		it('should be able to extend it and have it work as separate queues', function() {
			var banksQueue = F.BanksQueueMaker();
			banksQueue.pushTail('Hello');
			banksQueue.pushTail('Javascript');

			var copyOfBanksQueue = F.extend({}, banksQueue);
			copyOfBanksQueue.array = [];
			for (var i=0; i<banksQueue.array.length; i++) {
				copyOfBanksQueue.array[i] = banksQueue.array[i];
			}
			var test1 = banksQueue.pullHead();
			expect(test1).to.equal('Hello');

			var test2 = copyOfBanksQueue.pullHead();
			expect(test2).to.equal('Hello');
		});
	});

	describe('What context applies when we call a function', function() {
		var someObject = {
			someFunction: function() {
				return this;
			}
		};
		var someFunction = someObject.someFunction;
		describe('it is all about the way the function is called', function() {

			it('should return someObject', function() {
				var whatIsThis = someObject.someFunction();
				expect(whatIsThis === someObject).to.be.true;
			});

			it('should be identical', function() {
				expect(someFunction === someObject.someFunction).to.be.true;
			});

			it('should not be identical', function() {
				expect(someFunction() === someObject).to.be.false;
			});
		});
	});

	describe('getWith', function() {
		var getOranges = F.getWith('oranges');
		it('should return a function that returns the attribute of an object', function() {
			var inventory = {
				apples: 0,
				oranges: 144,
				eggs: 36
			};

			var orangesCount = getOranges(inventory);
			expect(orangesCount).to.equal(144);
		});

		it('should play nicely with mapWith', function() {
			var inventories = [
				{apples: 0, oranges: 144, eggs: 36},
				{apples: 0, oranges: 23, eggs: 36},
				{apples: 0, oranges: 54, eggs: 36}
			];

			var orangeCounts = F.mapWith(getOranges)(inventories);
			expect(orangeCounts).to.eql([144,23,54]);
		});
	});

	describe('pluckWith', function() {
		var inventories = [
			{apples: 0, oranges: 144, eggs: 36},
			{apples: 0, oranges: 23, eggs: 36},
			{apples: 0, oranges: 54, eggs: 36}
		];
		it('should return a function that pulls an attribute out of an array of objects and returns an array of those values', function() {
			var getEggs = F.pluckWith('eggs');
			expect(getEggs).to.be.a('function');

			var eggsInventory = getEggs(inventories);
			expect(eggsInventory).to.eql([36,36,36]);

			function add(a, b) {return a + b};
			var totalEggsCount = eggsInventory.reduce(add, 0);
			expect(totalEggsCount).to.equal(108);
		});
	});

	describe('deepMapWith', function() {
		it('should work like mapWith on a nested array', function() {
			var report = 
			  [ [ { price: 1.99, id: 1 },
			    { price: 4.99, id: 2 },
			    { price: 7.99, id: 3 },
			    { price: 1.99, id: 4 },
			    { price: 2.99, id: 5 },
			    { price: 6.99, id: 6 } ],
			  [ { price: 5.99, id: 21 },
			    { price: 1.99, id: 22 },
			    { price: 1.99, id: 23 },
			    { price: 1.99, id: 24 },
			    { price: 5.99, id: 25 } ],
			  [ { price: 7.99, id: 221 },
			    { price: 4.99, id: 222 },
			    { price: 7.99, id: 223 },
			    { price: 10.99, id: 224 },
			    { price: 9.99, id: 225 },
			    { price: 9.99, id: 226 } ] ];

			var getPrices = F.getWith('price');
			var prices = F.deepMapWith(getPrices)(report);
			var expected = [[1.99, 4.99, 7.99, 1.99, 2.99, 6.99], [5.99, 1.99, 1.99, 1.99, 5.99], [7.99, 4.99, 7.99, 10.99, 9.99, 9.99]];
			expect(prices).to.eql(expected);
		});
	});
});

describe('Instances and Classes', function() {
	describe('testing', function() {
		var Ur = function() {};
		it('using the new keyword should return an object', function() {
			var test = new Ur();
			expect(test).to.be.an('object');
		});

		it('should return a unique object', function() {
			var test1 = new Ur();
			var test2 = new Ur();
			expect(test1 === test2).to.be.false;
		});
	});

	describe('prototype', function() {
		var Ur = function() {};
		var continent = new Ur();
		it('should be an object', function() {
			expect(Ur.prototype).to.be.an('object');
		});

		it('Every function is initialized with its own unique prototype', function() {
			var test = (function() {}).prototype === (function() {}).prototype;
			expect(test).to.be.false;
		});

		it('Testing with prototype', function() {
			Ur.prototype.language = 'Javascript';
			expect(continent.language).to.equal('Javascript');

			continent.language = 'CoffeeScript';
			expect(continent).to.eql({language: 'CoffeeScript'});

			expect(continent.language).to.equal('CoffeeScript');

			expect(Ur.prototype.language).to.equal('Javascript');

			var another = new Ur();
			expect(another.language).to.equal('Javascript');

			Ur.prototype.language = 'Sumerian';
			expect(another.language).to.equal('Sumerian');
		});

		it('should be a function', function() {
			expect(continent.constructor).to.be.a('function');
		});

		it('should be identical', function() {
			expect(continent.constructor === Ur).to.be.true;
		});

		it('testing constructor', function() {
			var test = {}.constructor;
			expect(test).to.be.a('function');

			var test2 = Ur.prototype.constructor;
			expect(test2).to.be.a('function');

			expect(Ur.prototype.constructor === Ur);
		});
	});

	describe('Queue2', function() {
		it('Creating new queues by using the new keyword', function() {
			var queue = new F.Queue2();
			queue.pushTail('Hello');
			queue.pushTail('Javascript');
			var anotherQueue = new F.Queue2();
			anotherQueue.pushTail('Hello');
			anotherQueue.pushTail('Javascript');

			expect(queue.pullHead()).to.equal('Hello');
			expect(anotherQueue.pullHead()).to.equal('Hello');

		});
	});

});

describe('Currying', function() {
	it('testing currying', function() {
		function add(verb, a, b) {
			return 'The ' + verb + ' of ' + a + ' and ' + b + ' is ' + (a + b);
		}

		var addFive = F.callLeft(add, 'sum', 5);
		expect(addFive(6)).to.equal('The sum of 5 and 6 is 11');

		var addSix = add.bind(null, 'total', 6);
		expect(addSix(5)).to.be.equal('The total of 6 and 5 is 11');


		function curryTwo(fn) {
			return function(x) {
				return F.callFirst(fn, x);
			};
		}

		var add2 = function(a, b) {return a + b;};
		var eleven = curryTwo(add2)(5)(6);
		expect(eleven).to.equal(11);

		function curryThree(fn) {
			return function(x) {
				return curryTwo(F.callFirst(fn, x));
			};
		}

		var test = curryThree(add)('sum')(5)(6);
		expect(test).to.equal('The sum of 5 and 6 is 11');

		function curryFour(fn) {
			return function(x) {
				return curryThree(F.callFirst(fn, x));
			};
		}

		var addFourArgs = function(a,b,c,d) {
			return a + b + c + d;
		};

		var test2 = curryFour(addFourArgs)(1)(2)(3)(4);
		expect(test2).to.equal(10);
	});
});

describe('Classes', function() {
	describe('Todo', function() {
		function Todo(name) {
			this.name = name || 'Untitled';
			this.done = false;
		}

		Todo.prototype.do = function() {
			this.done = true;
		};

		Todo.prototype.undo = function() {
			this.done = false;
		};
		var todo1 = new Todo('First todo');

		F.extend(Todo.prototype, {
			prioritize: function(priority) {
				this.priority = priority;
			}
		});

		it('should be able to create an instance of Todo', function() {
			expect(todo1.name).to.equal('First todo');
			expect(todo1.done).to.be.false;
			todo1.do();
			expect(todo1.done).to.be.true;
			todo1.undo();
			expect(todo1.done).to.be.false;

		});

		it('should be able to extend Todo', function() {
			expect(todo1.priority).to.be.undefined;
			todo1.prioritize(1);
			expect(todo1.priority).to.equal(1);
		});
	});

	describe('object methods', function() {
		var WidgetModel = function(id, attrs) {
			F.extend(this, attrs || {});
			this.id = function() {return id;};
		};

		F.extend(WidgetModel.prototype, {
			set: function(attr, value) {
				this[attr] = value;
				return this;
			},
			get: function(attr) {
				return this[attr];
			}
		});

		it('testing', function() {
			var wid1 = new WidgetModel(1, {name: 'David'});
			expect(wid1.id()).to.equal(1);

			expect(wid1.get('name')).to.equal('David');
		});
	});

});

describe('Instances and classes', function() {
	describe('curry', function() {
		var add = function(a, b) {return a + b;};
		var curriedAdd = F.curry(add);

		var addFourArgs = function(a,b,c,d) {return a + b + c + d;};
		var curriedAddFourArgs = F.curry(addFourArgs);

		it('should return a function', function() {
			expect(curriedAdd).to.be.a('function');
		});

		it('should curry a function', function() {
			var addTwo = curriedAdd(2);
			var four = addTwo(2);
			expect(four).to.equal(4);

			var ten = curriedAddFourArgs(3,2)(2,3);
			expect(ten).to.equal(10);
		});
	});

	describe('Bound', function() {
		function InventoryRecord(apples, oranges, eggs) {
			this.record = {
				apples: apples,
				oranges: oranges,
				eggs: eggs
			};
		}
		InventoryRecord.prototype.apples = function apples() {
			return this.record.apples;
		}
		InventoryRecord.prototype.oranges = function oranges() {
			return this.record.oranges;
		}
		InventoryRecord.prototype.eggs = function eggs() {
			return this.record.eggs;
		}
		var inventories = [
			new InventoryRecord(0, 144, 36),
			new InventoryRecord(240, 54, 12),
			new InventoryRecord(24, 12, 42)
		];

		// var results = F.mapWith(F.getWith('eggs'))(inventories).map(
		// 	function(unboundmethod) {
		// 		return unboundmethod();
		// 	}
		// );
		// console.log(results);
	});
});

describe('Compose and pipeline', function() {
	describe('		', function() {
		it('', function() {
			
		});
	});
});
