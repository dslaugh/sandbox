var expect = require('chai').expect;
var CustomEvents = require('../custom_events.js');

describe('Custom Events Sanity Check', function() {
	it('should work', function() {
		expect(true).to.be.true;
	});
});

describe('Custom Events', function() {
	it('should return an empty object', function() {
		var ce = CustomEvents();
		expect(ce.test()).to.eql({});
	});

	it('should allow adding an event', function() {
		var ce = CustomEvents();
		var la = [];
		var xa = [];
		var l = function(a) {la.push(a)};
		var x = function(a) {xa.push(a)};
		ce.on('testing', l);
		console.log(ce.test());
		ce.on('testing', x);
		console.log(ce.test());
		ce.on('new', l);
		console.log(ce.test());

		ce.off('new', l);
		console.log(ce.test());

		ce.emit('testing', 'test data');
		console.log(la);
		console.log(xa);
	});
});