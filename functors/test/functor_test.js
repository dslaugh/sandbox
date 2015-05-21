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