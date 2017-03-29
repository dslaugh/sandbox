const expect = require('chai').expect;

describe('Customer', function() {
	const Movie = require('../Movie');
	const Rental = require('../Rental');
	const Customer = require('../Customer');

	const movie = new Movie('Pulp Fiction', 1);
	const rental = new Rental(movie, 5);

	const movie2 = new Movie('Jaws', 2);
	const rental2 = new Rental(movie2, 5);

	const movie3 = new Movie('Blazing Saddles', 0);
	const rental3 = new Rental(movie3, 5);

	const customer = new Customer('David');
	customer.addRental(rental);
	customer.addRental(rental2);
	customer.addRental(rental3);

	describe('#statement', function() {
		it('should return a text statement', function() {
			let expected = 'Rental Record for David\n';
			expected += 'Pulp Fiction 15\n';
			expected += 'Jaws 4.5\n';
			expected += 'Blazing Saddles 6.5\n';
			expected += 'Amount owed is 26\n';
			expected += 'You earned 4 frequent renter points';
			const statement = customer.statement();
			expect(statement).to.equal(expected);
		});
	});

	describe('#htmlStatement', function() {
		it('should return an html statement', function() {
			let expected = '<h1>Rentals for <em>David</em></h1><p>';
			expected += 'Pulp Fiction: 15<br>';
			expected += 'Jaws: 4.5<br>';
			expected += 'Blazing Saddles: 6.5<br>';
			expected += '<p>You owe <em>26</em><p>';
			expected += 'On this rental you earned <em>4</em> frequent renter points<p>';
			const htmlStatement = customer.htmlStatement();
			expect(htmlStatement).to.equal(expected);
		});
	});
});
