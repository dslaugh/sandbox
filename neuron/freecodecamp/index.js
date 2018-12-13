const matrixMultiplier = require('./matrix_multiplier');

let weights = [0.7, 0.2, -0.5];

const alpha = 0.1;

const streetlights = [
	[1, 0, 1],
	[0, 1, 1],
	[0, 0, 1],
	[1, 1, 1],
	[0, 1, 1],
	[1, 0, 1],
];

const walk_vs_stop = [0, 1, 0, 1, 1, 0];

const iterations = 60;
for (let i = 0; i < iterations; i++) {
	let error_for_all_lights = 0;
	let error;
	for (let r = 0; r < walk_vs_stop.length; r++) {
		let input = streetlights[r];
		let goal_prediction = walk_vs_stop[r];
		let prediction = multiplyVectors(weights, input);
		error = (prediction - goal_prediction) ** 2;
		error_for_all_lights += error;
		let delta = prediction - goal_prediction;
		weights = processWeights(weights, alpha, input, delta);
		console.log('prediction', prediction);
	}
	console.log('weights', weights);
	console.log('error', error);
}

function processWeights(weights, alpha, input, delta) {
	const result = [];
	for (let i=0; i<weights.length; i++) {
		const val = weights[i] - (alpha * (input[i] * delta));
		result.push(val)
	}
	return result;
}

function multiplyVectors(vector1, vector2) {
	let result = 0;
	for (let i=0; i<vector1.length; i++) {
		result += vector1[i] * vector2[i];
	}
	return result;
}

console.log('testing trained weights', multiplyVectors(weights, [0,1,0]));