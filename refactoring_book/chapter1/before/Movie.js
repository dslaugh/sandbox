class Movie {
	constructor(title, priceCode) {
		this.title = title;
		this.priceCode = priceCode;
	}

	getPriceCode() {
		return this.priceCode;
	}

	setPriceCode(priceCode) {
		this.priceCode = priceCode;
	}

	getTitle() {
		return this.title;
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
}

module.exports = Movie;
