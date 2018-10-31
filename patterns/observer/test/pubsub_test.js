var expect = require('chai').expect;
var PubSub = require('../pubsub.js');


describe('pubsub', function() {
	var logger = PubSub();
	it('should exist', function() {
		expect(logger).to.be.an('object');
	});

});
describe('', function() {
	var logger = PubSub();
	it('should work', function() {
		var add = function(a, b) {
			return a + b;
		};

		var loggerArray = [];
		var reportIt = function(it) {
			loggerArray.push(it);
		};

		logger.subscribe(reportIt);


		var Users = {
			users: [],
			add: function(user) {
				this.users.push(user);
				logger.publish(user);
			}
		};

		Users.add({id: 1, name: 'David'});
		expect(loggerArray).to.eql([{id: 1, name: 'David'}]);
		
	});
});