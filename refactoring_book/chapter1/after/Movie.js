class Movie {
	constructor(name, priceCode) {
		this.title = name;
		this.price;
		this.setPriceCode(priceCode);
	}

	static get CHILDRENS() {
		return 2;
	}

	static get REGULAR() {
		return 0;
	}

	static get NEW_RELEASE() {
		return 1;
	}

	getPriceCode() {
		return this.price.getPriceCode();
	}

	setPriceCode(arg) {
		switch(arg) {
			case Movie.REGULAR:
				this.price = new RegularPrice();
				break;
			case Movie.CHILDRENS:
				this.price = new ChildrensPrice();
				break;
			case Movie.NEW_RELEASE:
				this.price = new NewReleasePrice();
				break;
			default:
				throw new Error('Unrecognized price code. Could not instantiate price.');
		}
	}

	getTitle() {
		return this.title;
	}

	getCharge(daysRented) {
		return this.price.getCharge(daysRented);
	}

	getFrequentRenterPoints(daysRented) {
		return this.price.getFrequentRenterPoints(daysRented);
	}
}

class Price {
	getFrequentRenterPoints(daysRented) {
		return 1;
	}
}

class ChildrensPrice extends Price {
	getPriceCode() {
		return Movie.getChildrens();
	}

	getCharge(daysRented) {
		let result = 1.5;
		if (daysRented > 3) {
			result += (daysRented - 3) * 1.5;
		}
		return result;
	}
}

class NewReleasePrice extends Price {
	getPriceCode() {
		return Movie.getNewRelease();
	}

	getCharge(daysRented) {
		return daysRented * 3;
	}

	getFrequentRenterPoints(daysRented) {
		return daysRented > 1 ? 2 : 1;
	}
}

class RegularPrice extends Price {
	getPriceCode() {
		return Movie.getRegular();
	}

	getCharge(daysRented) {
		let result = 2;
		if (daysRented > 2) {
			result += (daysRented - 2) * 1.5;
		}
		return result;
	}
}

module.exports = Movie;
