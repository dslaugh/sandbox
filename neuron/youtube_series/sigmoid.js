function sigmoid(x) {
	const result = 1 / (1 + Math.exp(-x));
	return result;
};

module.exports = sigmoid;
