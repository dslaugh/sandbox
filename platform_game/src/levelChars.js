const Player = require('./Player');
const Lava = require('./Lava');
const Coin = require('./Coin');

const levelChars = {
	'.': 'empty',
	'#': 'wall',
	'+': 'lava',
	'@': Player,
	'o': Coin,
	'=': Lava,
	'|': Lava,
	'v': Lava,
};

module.exports = levelChars;
