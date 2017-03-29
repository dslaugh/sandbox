class Order {
	constructor(amount) {
		this.amount = amount;
	}

	getAmount() {
		return this.amount;
	}
}


class Statement {
	constructor(name) {
		this.name = name;
		this.orders = [];
		this.message = '';
	}

	addOrder(order) {
		this.orders.push(order);
	}

	printOwing() {
		this.printBanner();

		const outstanding = this.getOutstanding();
		this.printDetails(outstanding);

		return this.message;
	}

	printBanner() {
		this.message = '*******************************\n';
		this.message += '******** Customer Owes ********\n';
		this.message += '*******************************\n';
	}

	printDetails(outstanding) {
		this.message += `name: ${this.name}\n`;
		this.message += `amount: ${outstanding}`;
	}

	getOutstanding() {
		let result = 0;		
		this.orders.forEach((order) => {
			result += order.getAmount();
		});
		return result;
	}
}

module.exports = {
	Order,
	Statement,
};
