class Account {
	constructor(type, daysOverdrawn) {
		this.type = type;
		this.daysOverdrawn = daysOverdrawn;
	}

	/* 
	 *	Leaving overdraftCharge here is one way to refactor. It gets turned into a delegation function.
	 *	Removing it required changing the call in bankCharge()
	 */

	// overdraftCharge() {
	// 	return this.type.overdraftCharge(this.daysOverdrawn);
	// }

	bankCharge() {
		let result = 4.5;
		if (this.daysOverdrawn > 0) {
			// result += this.overdraftCharge();
			result += this.type.overdraftCharge(this.daysOverdrawn);
		}
		return result;
	}
}

module.exports = Account;
