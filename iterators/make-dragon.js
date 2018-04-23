const randomItem = require('./random-item');

const makeDragon = () => {
	const dragonSizes = ['big', 'medium', 'tiny'];
	const dragonAbilities = ['fire', 'ice', 'lightning'];
	return randomItem(dragonSizes) + ' ' +
		randomItem(dragonAbilities) + ' ' +
		'dragon';
};

module.exports = makeDragon;