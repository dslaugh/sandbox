var Adding = {
	add: function(a, b) {
		return a + b;
	},
	multiply: function(a, b) {
		return a * b;
	},
	factorTens: function(num) {
		var remainder = num % 10;
		return [num - remainder, remainder];
	},
	randOneDigitNumber: function() {
		return Math.floor(Math.random() * 9) + 1;
	},
	randTwoDigitNumber: function() {
		return Math.floor(Math.random() * 99) + 1;
	},
	randThreeDigitNumber: function() {
		return Math.floor(Math.random() * 999) + 1;
	},
	multiplyOneDigitByTwoDigits: function() {
		var retVal = [];
		var randTwoDigitNumber = this.randTwoDigitNumber();
		var randOneDigitNumber = this.randOneDigitNumber();

		var twoDigitFactors = this.factorTens(randTwoDigitNumber);


		retVal.push(randTwoDigitNumber + " * " + randOneDigitNumber);
		retVal.push('(' + twoDigitFactors[0] + ' * ' + randOneDigitNumber + ') + (' + twoDigitFactors[1] + ' * ' + randOneDigitNumber + ')');
		retVal.push(randTwoDigitNumber * randOneDigitNumber);

		return retVal;
	}
};

module.exports = Adding;