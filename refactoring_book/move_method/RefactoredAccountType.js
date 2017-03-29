class AccountType {
	constructor(type) {
		this.type = type;
	}

	isPremium() {
		return this.type === 'premium';
	}

	overdraftCharge(daysOverdrawn) {
		if (this.isPremium()) {
			let result = 10;
			if (daysOverdrawn > 7) {
				result += (daysOverdrawn - 7) * 0.85;
			}
			return result;
		}
		return daysOverdrawn * 1.75;
	}

}

module.exports = AccountType;