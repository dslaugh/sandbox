class Rental {
	constructor(movie, daysRented) {
		this.movie = movie;
		this.daysRented = daysRented;
	}

	getDaysRented() {
		return this.daysRented;
	}

	getMovie() {
		return this.movie;
	}

	getCharge() {
		return this.movie.getCharge(this.daysRented);
	}

	getFrequentRenterPoints() {
		return this.movie.getFrequentRenterPoints(this.daysRented);
	}
}

module.exports = Rental;
