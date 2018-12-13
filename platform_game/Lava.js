const Vec = require('./Vec');

class Lava {
	constructor(pos, speed, reset) {
		this.pos = pos;
		this.speed = speed;
		this.reset = reset;
	}

	get type() {
		return 'lava';
	}

	static create(pos, ch) {
		if (ch === '=') {
			return new Lava(pos, new Vec(2, 0));
		} else if (ch === '|') {
			return new Lava(pos, new Vec(0, 2));
		} else if (ch === 'v') {
			return new Lava(pos, new Vec(0, 3));
		} else {
			throw new Error('Lava character not recognized '+ch);
		}
	}
}
Lava.prototype.size = new Vec(1, 1);

module.exports = Lava;
