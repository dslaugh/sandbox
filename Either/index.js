const expect = require('chai').expect;

function Left(val) {
	this._value = val;
}

Left.of = function(val) {
	return new Left(val);
}

Left.prototype.map = function(fn) {
	return this;
}

function Right(val) {
	this._value = val;
}

Right.of = function(val) {
	return new Right(val);
}

Right.prototype.map = function(fn) {
	return new Right(fn(this._value));
}

function convertToUpper(x) {
	if (typeof x === 'string') {
		return Right.of(x.toUpperCase());
	} else {
		return Left.of('String required. You passed a ' + typeof x);
	}
}

describe('Either', function() {
	describe('Left', function() {
		it('should return itself', function() {
			const myLeft = Left.of('my');
			expect(myLeft).to.be.an.instanceof(Left);
			expect(myLeft._value).to.equal('my');
		});

		it('should return itself even when mapped', function() {
			const myLeft = Left.of('my').map((x) => {
				return x.toUpperCase();
			});
			expect(myLeft).to.be.an.instanceof(Left);
			expect(myLeft._value).to.equal('my');
		});
	});

	describe('Right', function() {
		it('should return an instance of Right', function() {
			const myRight = Right.of('my');
			expect(myRight).to.be.an.instanceof(Right);
		});

		it('should allow mapping of a function to its value', function() {
			const myRight = Right.of('my').map((x) => {
				return x.toUpperCase();
			});
			expect(myRight).to.be.an.instanceof(Right);
			expect(myRight._value).to.equal('MY');
		})
	});

	describe('convertToUpper', function() {
		it('should return a Right with an uppercase string when a string is passed', function() {
			const actual = convertToUpper('dave');
			const expected = Right.of('DAVE');
			expect(actual).to.eql(actual);
		});

		it('should return a Left of an error message about the wrong type passed', function() {
			const actual = convertToUpper(42);
			const expected = Left.of('String required. You passed a number');
			expect(actual).to.eql(expected);
		});
	});
});