var expect = require('chai').expect;
var mostly = require('../mostly.js');

describe('Sanity check', function() {
	it('testing should work', function() {
		expect(true).to.be.true;
	});
});

describe('Chapter 4 exercises', function() {
	it('should split a sentence into words', function() {
		var testSentence = 'This is my good eye';
		var expected = ['This', 'is', 'my', 'good', 'eye'];
		var w = mostly.words(testSentence);
		expect(w).to.eql(expected);
	});

	it('should split an array of sentences into arrays of words', function() {
		var testSentences = [
			'Jingle bells batman smells',
			'Robin laid an egg'
		];
		var expected = [
			['Jingle', 'bells', 'batman', 'smells'],
			['Robin', 'laid', 'an', 'egg']
		];

		var s = mostly.sentences(testSentences);
		expect(s).to.eql(expected);
	});

	it('should filter words with a q in them', function() {
		var testArray = ['quick', 'camels', 'quarry', 'over', 'quails'];
		var expected = ['quick', 'quarry', 'quails'];
		var actual = mostly.filterQs(testArray);
		expect(actual).to.eql(expected);
	});

	it('should return the highest number from an array', function() {
		var testArray = [323,523,554,123,5234];
		var expected = 5234;
		var actual = mostly.max(testArray);
		expect(actual).to.equal(expected);
	});

	it('should be a functional, curried slice function', function() {
		var testArray = ['a', 'b', 'c'];
		var expected = ['b', 'c'];
		var actual = mostly.slice(1)(3)(testArray);
		expect(actual).to.eql(expected);
	});

	it('should take n elements', function() {
		var testArray = ['a', 'b', 'c'];
		var expected = ['a', 'b'];
		var actual = mostly.take(2)(testArray);
		expect(actual).to.eql(expected);
	});
});

describe('Chapter 5 exercises', function() {
	var CARS = [
	    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
	    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
	    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
	    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
	    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
	    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
	];

	it('should tell us if the last car in an array is in stock', function() {
		var actual = mostly.isLastInStock(CARS);
		expect(actual).to.be.false;
	});

	it('should return the name of the first car', function() {
		var actual = mostly.nameOfFirstCar(CARS);
		var expected = 'Ferrari FF';
		expect(actual).to.equal(expected);
	});

	it('return the average of the dollar values of all the cars', function() {
		var actual = mostly.averageDollarValue(CARS);
		var expected = 790700;
		expect(actual).to.equal(expected);
	});

	it('should convert names to lowercase and then join them with underscores', function() {
		var actual = mostly.sanitizeNames(CARS);
		var expected = ['ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra'];
		expect(actual).to.eql(expected);
	});

	it('Bonus 1', function() {
		var actual = mostly.availablePrices(CARS);
		var expected = '$700,000.00, $1,850,000.00';
		expect(actual).to.equal(expected);
	});

	it('Bonus 2', function() {
		var actual = mostly.fastestCar(CARS);
		console.log(actual);
		var expected = 'Aston Martin One-77 is the fastest';
		expect(actual).to.equal(expected);
	});
});

describe('Container', function() {
	it('Should give us a Container with a value in it.', function() {
		var container = mostly.Container.of('fart');
		expect(container.__value).to.equal('fart');
	});

	it('Should apply a function to the value in the container', function() {
		var actual = mostly.Container.of('david').map(upper);
		expect(actual.__value).to.equal('DAVID');

		function upper(value) {
			return value.toUpperCase();
		}
	});
});

describe('Maybe', function() {
	it('Should apply the function if the value is not undefined or null', function() {
		var actual = mostly.Maybe.of(null).map(add2);
		expect(actual.__value).to.be.null;

		var actual2 = mostly.Maybe.of(2).map(add2);
		expect(actual2.__value).to.equal(4);

		function add2(num) {
			return 2 + num;
		}
	});
});