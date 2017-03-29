const Movie = require('./Movie');

class Customer {
	constructor(name) {
		this.name = name;
		this.rentals = [];
	}

	addRental(rental) {
		this.rentals.push(rental);
	}

	getName() {
		return this.name;
	}

	statement() {
		let totalAmount = 0;
		let frequentRenterPoints = 0;
		let result = `Rental Record for ${this.getName()}\n`;

		this.rentals.forEach((rental) => {
			let thisAmount = 0;
			const currentMovie = rental.getMovie();

			switch(currentMovie.getPriceCode()) {
				case Movie.REGULAR:
					thisAmount += 2;
					if (rental.getDaysRented() > 2) {
						thisAmount += (rental.getDaysRented() - 2) * 1.5;
					}
					break;
				case Movie.NEW_RELEASE:
					thisAmount += rental.getDaysRented() * 3;
					break;
				case Movie.CHILDRENS:
					thisAmount += 1.5;
					if (rental.getDaysRented() > 3) {
						thisAmount += (rental.getDaysRented() - 3) * 1.5;
					}
					break;
				default:
					console.log('unrecognized rental type');
			}

			frequentRenterPoints += 1;
			if (currentMovie.getPriceCode() === Movie.NEW_RELEASE && rental.getDaysRented() > 1) {
				frequentRenterPoints += 1;
			}

			result += `${currentMovie.getTitle()} ${thisAmount}\n`;
			totalAmount += thisAmount;
		});
		
		result += `Amount owed is ${totalAmount}\n`;
		result += `You earned ${frequentRenterPoints} frequent renter points`;

		return result;
	}
}

module.exports = Customer;
