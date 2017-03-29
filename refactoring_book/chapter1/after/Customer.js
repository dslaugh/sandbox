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
		let result = `Rental Record for ${this.getName()}\n`;

		this.rentals.forEach((rental) => {
			result += `${rental.getMovie().getTitle()} ${rental.getCharge()}\n`;
		});
		
		result += `Amount owed is ${this.getTotalCharge()}\n`;
		result += `You earned ${this.getTotalFrequentRenterPoints()} frequent renter points`;

		return result;
	}

	htmlStatement() {
		let result = `<h1>Rentals for <em>${this.getName()}</em></h1><p>`;
		this.rentals.forEach((rental) => {
			result += `${rental.getMovie().getTitle()}: ${rental.getCharge()}<br>`;
		});

		result += `<p>You owe <em>${this.getTotalCharge()}</em><p>`;
		result += `On this rental you earned <em>${this.getTotalFrequentRenterPoints()}</em> frequent renter points<p>`;

		return result;
	}

	getTotalCharge() {
		let result = 0;
		this.rentals.forEach((rental) => {
			result += rental.getCharge();
		});
		return result;
	}

	getTotalFrequentRenterPoints() {
		let result = 0;
		this.rentals.forEach((rental) => {
			result += rental.getFrequentRenterPoints();
		});
		return result;
	}
}

module.exports = Customer;
