// This is my attempt at a maybe monad based on my understanding of it after watching MPJ's video on monads.
// I'm still not sure I understand it fully 

var expect = require('chai').expect;

function Maybe(val) {
	this.__value = val;
}

Maybe.of = function(val) {
	return new Maybe(val);
}

Maybe.prototype.isNothing = function(value) {
	return value === undefined || value === null;
}

Maybe.prototype.map = function(fn) {
	if (this.isNothing(this.__value)) {
		return Maybe.of(null);
	}
	return Maybe.of(fn(this.__value));
}

Maybe.prototype.flatMap = function(fn) {
	const value = this.__value.__value;
	if (this.isNothing(value)) {
		return Maybe.of(null);
	}
	return Maybe.of(fn(value));
}

Maybe.prototype.orElse = function(elseValue) {
	if (this.isNothing(this.__value)) {
		return Maybe.of(elseValue);
	}
	return this;
};

var queue = [];
function addToQueue(value) {
	if (!value) {
		throw new Error('Value must be provided');
	}
	queue.push(value);
}

function maybe(maybeVal) {
	const value = maybeVal;

	function isNothing(val) {
		return val === undefined || val === null;
	}

	function map(fn) {
		if (isNothing(value)) {
			return maybe(null);
		}
		return maybe(fn(value));
	}

	function getValue() {
		return value;
	}

	function flatMap(fn) {
		const val = value.getValue();
		if (isNothing(val)) {
			return maybe(null);
		}
		return maybe(fn(val));
	}

	function orElse(elseValue) {
		if (isNothing(value)) {
			return maybe(elseValue);
		}
		return maybe(value);
	}

	return { map, flatMap, getValue, orElse }
}

describe('My Maybe Monad', function() {
	beforeEach(function() {
		queue = [];
	});

	it('should update the value of queue if not null or undefined', function() {
		const unknownValue = 'Hello world';
		if (unknownValue !== undefined && unknownValue !== null) {
			addToQueue(unknownValue);
		}
		expect(queue).to.eql(['Hello world']);
	});

	it('should not update the value of queue if not null or undefined', function() {
		const unknownValue = null;
		if (unknownValue !== undefined && unknownValue !== null) {
			addToQueue(unknownValue);
		}
		expect(queue).to.eql([]);
	});

	it('should work the same with Maybe', function() {
		const unknownValue = 'Hello world';
		Maybe.of(unknownValue).map(addToQueue);
		expect(queue).to.eql(['Hello world']);
	});

	it('should not update the value of queue if not null or undefined', function() {
		const unknownValue = null;
		Maybe.of(unknownValue).map(addToQueue);
		expect(queue).to.eql([]);
	});

	it('should allow chaining of map', function() {
		const val1 = 'Hello world';
		Maybe.of(val1)
			.map(val => val.toUpperCase())
			.map(addToQueue);
		expect(queue).to.eql(['HELLO WORLD']);
	});

	it('should allow chaining of map', function() {
		const val1 = undefined;
		Maybe.of(val1)
			.map(val => val.toUpperCase())
			.map(addToQueue);
		expect(queue).to.eql([]);
	});

	it('flatMap should handle it if the value is another Maybe', function() {
		const maybeOfHello = Maybe.of('Hello');
		Maybe.of(maybeOfHello).flatMap(addToQueue);
		expect(queue).to.eql(['Hello']);
	});

	it('flatMap should handle it if the value is another Maybe', function() {
		const maybeOfHello = Maybe.of(null);
		Maybe.of(maybeOfHello).flatMap(addToQueue);
		expect(queue).to.eql([]);
	});

	it('orElse should supply a default value if undefined', function() {
		const value = undefined;
		Maybe.of(value).orElse('Your mom').map(addToQueue);
		expect(queue).to.eql(['Your mom']);
	});

	it('orElse should not use default value if defined', function() {
		const value = 'Hello world';
		Maybe.of(value).orElse('Your mom').map(addToQueue);
		expect(queue).to.eql(['Hello world']);
	});

	it('alternate maybe', function() {
		const val = 'hello';
		const maybeVal = maybe(val);
		maybeVal.map(addToQueue);
		expect(queue).to.eql(['hello']);
	});

	it('alternate maybe with null val', function() {
		const val = null;
		const maybeVal = maybe(val);
		maybeVal.map(addToQueue);
		expect(queue).to.eql([]);
	});

	it('alternate maybe flatMap', function() {
		const val = 'hello';
		const maybeVal = maybe(val);
		const maybeOfMaybeVal = maybe(maybeVal);
		maybeOfMaybeVal.flatMap(addToQueue);
		expect(queue).to.eql(['hello']);
	});

	it('alternate maybe orElse without value', function() {
		const val = null;
		maybe(val).orElse('Your mom').map(addToQueue);
		expect(queue).to.eql(['Your mom']);		
	});

	it('alternate maybe orElse with value', function() {
		const val = 'Hello world';
		maybe(val).orElse('Your mom').map(addToQueue);
		expect(queue).to.eql(['Hello world']);		
	});
});

