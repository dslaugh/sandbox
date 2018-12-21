const Vec = require('./Vec');
const State = require('./State');
const { coinWobbleSpeed, coinWobbleDist } = require('./constants');

class Coin {
	constructor(pos, basePos, wobble) {
		this.pos = pos;
		this.basePos = basePos;
		this.wobble = wobble;
	}

	get type() {
		return 'coin';
	}

	static create(pos) {
		let basePos = pos.plus(new Vec(0.2, 0.1));
		return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
	}
}
Coin.prototype.size = new Vec(0.6, 0.6);

Coin.prototype.collide = function(state) {
	let filtered = state.actors.filter(a => a !== this);
	let status = state.status;
	if (!filtered.some(a => a.type === 'coin')) {
		status = 'won';
	}
	return new State(state.level, filtered, status);
};

Coin.prototype.update = function(time) {
	let wobble = this.wobble + time * coinWobbleSpeed;
	let wobblePos = Math.sin(wobble) * coinWobbleDist;
	return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
};


module.exports = Coin;
