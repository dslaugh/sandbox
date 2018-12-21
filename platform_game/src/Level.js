const Vec = require('./Vec');
const levelChars = require('./levelChars');

class Level {
	constructor(plan) {
		let rows = plan.trim().split('\n').map(l => [...l]);

		this.height = rows.length;
		this.width = rows[0].length;
		this.startActors = [];

		this.rows = rows.map((row, y) => {
			return row.map((ch, x) => {
				let type = levelChars[ch];
				if (typeof type === 'string') {
					return type;
				}
				const actor = type.create(new Vec(x, y), ch);
				this.startActors.push(actor);
				return 'empty';
			});
		});
	}
}
Level.prototype.touches = function(pos, size, type) {
	const xStart = Math.floor(pos.x);
	const xEnd = Math.ceil(pos.x + size.x);
	const yStart = Math.floor(pos.y);
	const yEnd = Math.ceil(pos.y + size.y);

	for (let y = yStart; y < yEnd; y++) {
		for (let x= xStart; x < xEnd; x++) {
			let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
			let here = isOutside ? 'wall' : this.rows[y][x];
			if (here === type) {
				return true;
			}
		}
	}
	return false;
};

module.exports = Level;
