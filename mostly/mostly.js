var mostly = (function() {
	var R = require('ramda');

	// Chapter 4
	var _keepHighest = function(x,y){ return x >= y ? x : y; };

	var words = R.split(' ');

	var sentences = R.map(words);

	var filterQs = R.filter(R.match(/q/i));

	var max = R.reduce(_keepHighest, 0);

	var slice = R.curry(function(start, end, xs) {
		return xs.slice(start, end);
	});

	var take = slice(0);



	// Chapter 5
	var _average = function(xs) { return R.reduce(R.add, 0, xs) / xs.length; };
	var _underscore = R.replace(/\W+/g, '_');
	var accounting = (function() {
		var numberWithCommas = function(num) {
		    num = num.toString();
		    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		};		
		function formatMoney(dollar_value) {
			dollar_value = numberWithCommas(dollar_value);
			return '$'+dollar_value+'.00';
		}

		return {
			formatMoney: formatMoney
		};
	})();

	var isLastInStock = R.compose(R.prop('in_stock'), R.last);

	var nameOfFirstCar = R.compose(R.prop('name'), R.head);

	var averageDollarValue = R.compose(_average, R.map(R.prop('dollar_value')));

	var sanitizeNames = R.map(R.compose(_underscore, R.toLower, R.prop('name')));

	var availablePrices = R.compose(R.join(', '), R.map(R.compose(accounting.formatMoney, R.compose(R.prop('dollar_value')))), R.filter(R.prop('in_stock')));

	var append = R.flip(R.concat);
	var fastestCar = R.compose(append(' is the fastest'), R.last, R.map(R.prop('name')), R.sortBy(R.prop('horsepower')));


	return {
		words: words,
		sentences: sentences,
		filterQs: filterQs,
		max: max,
		slice: slice,
		take: take,
		isLastInStock: isLastInStock,
		nameOfFirstCar: nameOfFirstCar,
		averageDollarValue: averageDollarValue,
		sanitizeNames: sanitizeNames,
		availablePrices: availablePrices,
		fastestCar: fastestCar
	};

})();

module.exports = mostly;