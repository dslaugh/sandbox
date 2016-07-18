var assert = require('chai').assert;

describe('test', function() {
	var testObj;
	beforeEach(function() {
		var testProto = {
			greeting: 'Hello',
			greet: function() {
				return this.greeting;
			}
		};

		testObj = Object.create(testProto);
	});

	it('Should return "hello"', function() {
		assert.equal(testObj.greet(), 'Hello');
	});

	it('Should return "Hola"', function() {
		testObj.greeting = 'Hola';
		assert.equal(testObj.greet(), 'Hola');
	});	
});