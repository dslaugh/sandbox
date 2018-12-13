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

module.exports = Level;
