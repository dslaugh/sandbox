
var Numbers = (function() {
	return {
		test: function() {return true;},
		sumOfFirstXNumbers: function(x) {
			var sum = (x * (x + 1)) / 2;
			return sum;
		},
		sumOfFirstXEvenNumbers: function(x) {
			var sum = x * (x + 1);
			return sum;
		},
		sumOfFirstXOddNumbers: function(x) {
			var sum = x * x;
			return sum;
		},
		squareOf: function(numToSquare, distance) {
			var x = numToSquare + distance;
			var y = numToSquare - distance;
			var z = distance * distance;
			return (x * y) + z;
		},
		multiplyNumbersCloseTo100: function(num1, num2) {
			var dist1 = num1 - 100;
			var dist2 = num2 - 100;
			var firstPart = num1 + dist2;
			var secondPart = dist1 * dist2;
			var numberString = firstPart.toString() + secondPart.toString();
			return parseInt(numberString, 10);
		}
	};
})();


module.exports = Numbers;