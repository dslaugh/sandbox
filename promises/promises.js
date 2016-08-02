// https://bitsofco.de/javascript-promises-101/?utm_source=javascriptweekly&utm_medium=email
var chai = require('chai');
var assert = chai.assert;

describe('Promises', function() {

	it('should resolve with "hello" asynchronously', function() {
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve('hello');
			}, 500);
		});
		
		return p.then(function(val) {
			assert.equal(val, 'hello');
		}).catch(function(err) {
			assert.equal(err.message, 'You have made a grievous error');
		});
	});

	it('should reject with "You have made a grievous error" asynchronously', function() {
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
				reject(new Error('You have made a grievous error'));
			}, 500);
		});
		
		return p.then(function(val) {
			assert.equal(val, 'hello');
		}).catch(function(err) {
			assert.equal(err.message, 'You have made a grievous error');
		});
	});
});