const expect = require('chai').expect;
const Statement = require('../refactored2').Statement;
const Order = require('../refactored2').Order;


describe('Refactored Statement', function() {
	describe('#printOwing', function() {
		it('should print the statement correctly', function() {
			const statement = new Statement('David');
			statement.addOrder(new Order(5.50));
			statement.addOrder(new Order(9.00));
			statement.addOrder(new Order(12.35));

			const previousAmount = 10.50;
			const printed = statement.printOwing(previousAmount);
			const expected = '*******************************\n******** Customer Owes ********\n*******************************\nname: David\namount: 39.45';
			expect(printed).to.equal(expected);
		});
	});
});