class AccountType {
	constructor(type) {
		this.type = type;
	}

	isPremium() {
		return this.type === 'premium';
	}
}

module.exports = AccountType;