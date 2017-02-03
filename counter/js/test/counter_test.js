var expect = require('chai').expect;
var Count = require('../Count.js');

describe('Sanity Check', function() {
	it('should world', function() {
		expect(true).to.be.true;
	});
});

describe('Count', function() {
	it('Should create a new count object each time it is called', function() {
		var ct1 = Count();
		// console.log(ct1);
		ct1.add('hello');
		var test = ct1.get();
		expect(test).to.eql(['hello']);
		var ct2 = Count();
		ct2.add('world');
		var test2 = ct2.get();

		expect(test2).to.eql(['world']);
	});

	it('should be able to set an array', function() {
		var ct1 = Count();
		ct1.set(['hello', 'world']);
		var test = ct1.get();
		expect(test).to.eql(['hello', 'world']);
	});
});
