const _ = require('underscore');
const Either = require('ramda-fantasy').Either
const Left = Either.Left;
const Right = Either.Right;
const R = require('ramda');

// Generic monad
class Monad {
	constructor(val) {
		this.__value = val;
	}

	static of(val) {
		return new Monad(val);
	}

	map(f) {
		return Monad.of(f(this.__value));
	}

	join() {
		return this.__value;
	}

	chain(f) {
		return this.map(f).join();
	}

	ap(someOtherMonad) {
		return someOtherMonad.map(this.__value);
	}
}

// imperative
// const tax = (tax, price) => {
// 	if (!_.isNumber(price)) {
// 		return new Error('Price must be numeric');
// 	}

// 	return price + (tax * price);
// };

// const discount = (dis, price) => {
// 	if (!_.isNumber(price)) {
// 		return new Error('Price must be numeric');
// 	}

// 	if (price < 10) {
// 		return new Error('discount cant be applied for items priced below 10');
// 	}

// 	return price - (price * dis);
// }

// const isError = (e) => e && e.name == 'Error';
// const getItemPrice = (item) => item.price;

// const showTotalPrice = (item, taxPerc, dis) => {
// 	let price = getItemPrice(item);
// 	let result = tax(taxPerc, price);

// 	if (isError(result)) {
// 		return console.log('Error: ' + result.message);
// 	}

// 	result = discount(dis, result);

// 	if (isError(result)) {
// 		return console.log('Error: ' + result.message);
// 	}

// 	console.log('Total Price: ' + result);
// }

let tShirt = { name: 't-shirt', price: 11 };
let pant = { name: 'pant', price: '10 dollars' };
let chips = { name: 'chips', price: 4 };

// showTotalPrice(tShirt, 0, 0);
// showTotalPrice(pant, 0, 0);
// showTotalPrice(chips, 0, 0);

// Functional
const tax = R.curry((tax, price) => {
	if (!_.isNumber(price)) {
		return Left(new Error('Price must be numeric'));
	}

	return Right(price + (tax * price));
});

const discount = R.curry((dis, price) => {
	if (!_.isNumber(price)) {
		return Left(new Error('Price must be numeric'));
	}

	if (price < 10) {
		return Left(new Error('discount cant be applied for items priced below 10'));
	}
	return Right(price - (price * dis));
});

const addCaliTax = (tax(0.1));

const apply25PercDisc = (discount(0.25));

const getItemPrice = (item) => Right(item.price);

const displayTotal = (total) => {
	console.log(`Total Price: ${total}`);
};

const logError = (error) => {
	console.log(`Error: ${error.message}`);
}

const eitherLogOrShow = Either.either(logError, displayTotal);

const showTotalPrice = (item) => {
	eitherLogOrShow(getItemPrice(item).chain(apply25PercDisc).chain(addCaliTax));
}

showTotalPrice(tShirt);
showTotalPrice(pant);
showTotalPrice(chips);
