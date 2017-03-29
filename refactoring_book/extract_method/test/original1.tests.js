const expect = require('chai').expect;
const Statement = require('../original1').Statement;
const Order = require('../original1').Order;


describe('Statement', function() {
	describe('#printOwing', function() {
		it('should print the statement correctly', function() {
			const statement = new Statement('David');
			statement.addOrder(new Order(5.50));
			statement.addOrder(new Order(9.00));
			statement.addOrder(new Order(12.35));

			const printed = statement.printOwing();
			const expected = '*******************************\n******** Customer Owes ********\n*******************************\nname: David\namount: 26.85';
			expect(printed).to.equal(expected);
		});
	});
});