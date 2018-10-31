// https://www.youtube.com/watch?v=j40kRwSm4VE&t=131s

class PlainPizza {
	constructor() {
		// console.log('Plain Pizza constructor');
	}

	getDescription() {
		return 'Thin crust';
	}

	getCost() {
		return 4;
	}
}

class ToppingDecorator extends PlainPizza {
	constructor(pizza) {
		super();
		this.tempPizza = pizza;
	}

	getDescription() {
		return this.tempPizza.getDescription();
	}

	getCost() {
		return this.tempPizza.getCost();
	}

}

class Mozzarella extends ToppingDecorator {
	constructor(newPizza) {
		super(newPizza);
		console.log('Adding Mozzarella');
	}

	getDescription() {
		return this.tempPizza.getDescription() + ', mozzarella';
	}

	getCost() {
		return this.tempPizza.getCost() + 0.50;
	}
}

class TomatoSauce extends ToppingDecorator {
	constructor(newPizza) {
		super(newPizza);
		console.log('Adding crust');
		console.log('Adding Tomato Sauce');
	}

	getDescription() {
		return this.tempPizza.getDescription() + ', tomato sauce';
	}

	getCost() {
		return this.tempPizza.getCost() + 0.35;
	}
}

class Pepperoni extends ToppingDecorator {
	constructor(newPizza) {
		super(newPizza);
		console.log('Adding Pepperoni');
	}

	getDescription() {
		return this.tempPizza.getDescription() + ', pepperoni';
	}

	getCost() {
		return this.tempPizza.getCost() + 1.75;
	}
}

class CanadianBacon extends ToppingDecorator {
	constructor(newPizza) {
		super(newPizza);
		console.log('Adding Canadian Bacon');
	}

	getDescription() {
		return this.tempPizza.getDescription() + ', canadian bacon';
	}

	getCost() {
		return this.tempPizza.getCost() + 1.25;
	}
}

const myPizza = new CanadianBacon(new Pepperoni(new Mozzarella(new TomatoSauce(new PlainPizza()))));

console.log(`My pizza has ${myPizza.getDescription()} and it cost $${myPizza.getCost()}`);
