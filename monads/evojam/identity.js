function Identity(value) {
	this.value = value;
}

Identity.of = function(value) {
	return new Identity(value);
};

Identity.prototype.map = function(fn) {
	return Identity.of(fn(this.value));
};

Identity.prototype.get = function() {
	return this.value;
}

const monadWith3 = Identity.of(3);
const monadWith5 = monadWith3.map(value => value + 2);
console.log('monadWith5', monadWith5);

function getPercentRatio(wrongCount, correctCount) {
	return Identity.of(wrongCount)
		.map(wrongCount => wrongCount + correctCount)
		.map(totalCount => correctCount / totalCount)
		.map(ratio => Math.round(100 * ratio))
		.map(percentRatio => `${percentRatio}%`)
		.get();
}

const percentRatio = getPercentRatio(3, 10);
console.log(percentRatio);