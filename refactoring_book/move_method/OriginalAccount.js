class Account {
	constructor(type, daysOverdrawn) {
		this.type = type;
		this.daysOverdrawn = daysOverdrawn;
	}

	overdraftCharge() {
		if (this.type.isPremium()) {
			let result = 10;
			if (this.daysOverdrawn > 7) {
				result += (this.daysOverdrawn - 7) * 0.85;
			}
			return result;
		}
		return this.daysOverdrawn * 1.75;
	}

	bankCharge() {
		let result = 4.5;
		if (this.daysOverdrawn > 0) {
			result += this.overdraftCharge();
		}
		return result;
	}
}

module.exports = Account;
