const Maybe = require('ramda-fantasy').Maybe;
const R = require('ramda');

const user = {
	name: 'Dave',
};

const discount = {
	code: 'yourmom',
};

const applyDiscountImperative = (user, discount) => {
	let userClone = Object.assign({}, user);
	userClone.discount = discount.code;
	return userClone;
}

const x = applyDiscountImperative(user, discount);
console.log('x', x);



const applyDiscount = R.curry((user, discount) => {
	user.discount = discount.code;
	return user;
});

const maybeUser = Maybe(user);
const maybeDiscount = Maybe(discount);

const maybeApplyDiscountFunc = maybeUser.map(applyDiscount);
const y = maybeApplyDiscountFunc.ap(maybeDiscount);

console.log('y', y);
