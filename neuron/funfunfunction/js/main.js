const R = require('ramda');

const rand = (high, low) => Math.random() * (high - low) + low;
const getTeam = point => point.x > point.y ? 'red' : 'blue';
const getRandomPoint = () => ({
	x: rand(5, 395),
	y: rand(5, 395)
});

const guess = (weights, point) => {

};

module.exports = {
	getRandomPoint,

	getRandomPoints: howMany => R.range(0, howMany).map(getRandomPoint),

	addTeamColorToPoints: (points) => {
		return points.map((pt) => {
			return { ...pt, teamColor: getTeam(pt) };
		});
	},

	getRandomWeights: () => {
		return {
			w1: rand(-1, 1),
			w2: rand(-1, 1),
		};
	}
};
