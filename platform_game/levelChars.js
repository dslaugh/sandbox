const Player = require('./Player');
const Lava = require('./Lava');
const Coin = require('./Coin');

module.exports = {
	'.': 'empty',
	'#': 'wall',
	'+': 'lava',
	'@': Player,
	'o': Coin,
	'=': Lava,
	'|': Lava,
	'v': Lava,
};
