const randomNumber = require('random-number');

function randomItem(array) {
	const randomIndex = randomNumber({
		min: 0,
		max: array.length - 1,
		integer: true,
	});
	return array[randomIndex];
}

// console.log('randomItem', randomItem(['a', 'b', 'c']));
// console.log('randomItem', randomItem(['a', 'b', 'c']));
// console.log('randomItem', randomItem(['a', 'b', 'c']));
// console.log('randomItem', randomItem(['a', 'b', 'c']));

module.exports = randomItem;