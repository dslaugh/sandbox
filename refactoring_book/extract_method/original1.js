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
	}

	addOrder(order) {
		this.orders.push(order);
	}

	printOwing() {
		let outstanding = 0;

		let message = '*******************************\n';
		message += '******** Customer Owes ********\n';
		message += '*******************************\n';

		this.orders.forEach((order) => {
			outstanding += order.getAmount();
		});

		message += `name: ${this.name}\n`;
		message += `amount: ${outstanding}`;

		return message;
	}
}

module.exports = {
	Order,
	Statement,
};
