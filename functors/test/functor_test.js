var expect = require('chai').expect;
var q = require('q');

describe('Sanity Check', function() {
	it('should be true', function() {
		expect(true).to.be.true;
	});
});

describe('Maybe Functor', function() {
	var myVar;
	beforeEach(function() {
		myVar = undefined;
	});
	
	function length(x) {
		return x.length;
	}

	function setVar(x) {
		return myVar = x;
	}

	function Maybe(x) {

		if (x instanceof Maybe) {
			return x;
		}

		if (this instanceof Maybe) {
			this.value = x;
		} else {
			return new Maybe(x);
		}
	}

	Maybe.prototype.map = function(fn) {
		if (this.value !== undefined && this.value !== null) {
			return new Maybe(fn(this.value));
		} else {
			return this;
		}
	}

	it('should equal 3', function() {
		Maybe('foo').map(length).map(setVar);
		expect(myVar).to.equal(3);
	});

	it('should be undefined', function() {
		Maybe().map(length).map(setVar);
		expect(myVar).to.be.undefined;
	});

	it('should', function() {
		console.log(Maybe('foo'));
		console.log(Maybe(Maybe('foo')));
		console.log(Maybe());
	});

	it('should', function() {
		q('test')
		.then(Maybe(length))
		.then(Maybe(console.log))
		.done();
	});
});

describe('Category Theory', function() {

	var typeOf = function(type) {
		return function(p) {
			if (typeof p !== type) {
				throw new TypeError('Expected a ' + type + '!');
			} else {
				return p;
			}
		};
	};

	var str = typeOf('string');
	var bool = typeOf('boolean');
	var obj = typeOf('object');
	var num = typeOf('number');
	var undef = typeOf('undefined');
	var arr = function(a) {
		if ({}.toString.call(a) !== '[object Array]') {
			throw new TypeError('Expected an array!');
		} else {
			return a;
		}
	};

	var arrOf = function(contract) {
		return function(a) {
			return arr(a).map(contract);
		};
	};

	var repeat = function(s) {
		s = str(s);
		return s + s;
	};

	var inc = function(x) {
		x = num(x);
		return num(x + 1);
	};

	it('should return hellohello', function() {
		expect(repeat('hello')).to.equal('hellohello');
	});

	it('should return 55', function() {
		expect(repeat('5')).to.equal('55');
	});

	it('should throw TypeError', function() {
		expect((function() {repeat()})).to.throw(TypeError);
	});

	it('should increment a number', function() {
		expect(inc(2)).to.equal(3);
	});	

	it('should throw a TypeError', function() {
		expect((function() {inc('2')}) ).to.throw(TypeError);
	});

	it('should test for an array', function() {
		var testArr = [1,2,3];
		expect(arr(testArr)).to.equal(testArr);
	});

	it('should throw a TypeError', function() {
		var test = (function() {arr('hello')});
		expect(test).to.throw(TypeError);
	});

	it('should return an array of numbers', function() {
		var testArr = [1,2,3];
		var arrOfNums = arrOf(num);
		expect(arrOfNums(testArr)).to.eql([1,2,3]);
	});

	it('should throw a TypeError', function() {
		var testArr = [1,'2',3];
		var arrOfNums = arrOf(num);

		expect((function(){arrOfNums(testArr)})).to.throw(TypeError);
	});

	it('should increment numbers in an array', function() {
		var test = arrOf(inc);
		var testArr = [1,2,3];
		var res = test(testArr);
		expect(res).to.eql([2,3,4]);
	});

	it('should throw a TypeError', function() {
		var test = arrOf(inc);
		var testArr = [1,2,'3'];
		expect((function() {test(testArr)})).to.throw(TypeError);
	});

	describe('Maybe functor', function() {
		var Maybe = function() {};
		var None = function() {};
		None.prototype = Object.create(Maybe.prototype);
		None.prototype.toString = function() {return 'None';};
		var none = new None();

		var Some = function(x) {
			this.x = x;
		};
		Some.prototype = Object.create(Maybe.prototype);
		Some.prototype.toString = function() {return 'Some('+this.x+')';};
		var some = function(x) {return new Some(x);};

		var maybe = function(contract) {
			return function(m) {
				if (m instanceof None) {
					return m;
				} else if (m instanceof Some) {
					return some(contract(m.x));
				} else {
					throw new TypeError('Expected None or Some(value)!');
				}
			};
		}

		it('should be an instance of None', function() {
			var test = maybe(repeat)(none);
			expect(test).to.be.an.instanceof(None);

		});

		it('should be an instance of Some', function() {
			var test2 = maybe(repeat)(some('joe'));
			expect(test2).to.be.an.instanceof(Some);
			expect(test2.x).to.equal('joejoe');
		});


	});

});