var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var Utils = require('../sandbox.js').sandbox;


describe('Utils', function() {
	describe('Sanity test', function() {
		it('Should exist', function() {
			expect(Utils).to.exist;
		});
	});

	describe('getDomainFromUrl', function() {
		it('Should get only the domain from a url', function() {
			var url1 = 'http://www.safebee.com/home/8-innocent-seeming-habits-put-your-home-risk';
			var domain1 = Utils.getDomainFromUrl(url1);
			expect(domain1).to.equal('safebee.com');

			var url2 = 'www.safebee.com/home/8-innocent-seeming-habits-put-your-home-risk';
			var domain2 = Utils.getDomainFromUrl(url2);
			expect(domain2).to.equal('safebee.com');

			var url3 = 'safebee.com/home/8-innocent-seeming-habits-put-your-home-risk';
			var domain3 = Utils.getDomainFromUrl(url3);
			expect(domain3).to.equal('safebee.com');

			var url4 = 'https://www.safebee.com/home/8-innocent-seeming-habits-put-your-home-risk';
			var domain4 = Utils.getDomainFromUrl(url4);
			expect(domain4).to.equal('safebee.com');

			var url5 = 'http://www.safebee.com?test=test';
			var domain5 = Utils.getDomainFromUrl(url5);
			expect(domain5).to.equal('safebee.com');

			var url6 = 'http://www.safebee.com#test';
			var domain6 = Utils.getDomainFromUrl(url6);
			expect(domain6).to.equal('safebee.com');

			var url7 = 'http://www.safebee.com';
			var domain7 = Utils.getDomainFromUrl(url7);
			expect(domain7).to.equal('safebee.com');

			var url8 = 'safebee.com';
			var domain8 = Utils.getDomainFromUrl(url8);
			expect(domain8).to.equal('safebee.com');

			var url9 = 'http://safebee.com';
			var domain9 = Utils.getDomainFromUrl(url9);
			expect(domain9).to.equal('safebee.com');

		});
	});

	describe('speed', function() {
		it('should calculate speed', function() {
			var speed = Utils.speed(1, 20);
			expect(speed).to.equal(3);
		});

		it('should calculate speed', function() {
			var speed = Utils.speed(1, 30);
			expect(speed).to.equal(2);
		});
	});

	describe('distance', function() {
		it('should calculate distance', function() {
			var distance = Utils.distance(3, 20);
			expect(distance).to.equal(1);
		});
	});

	describe('minutes', function() {
		it('should calculate minutes', function() {
			var minutes = Utils.minutes(1, 3);
			expect(minutes).to.equal(20);
		});
	});

	describe('pluck', function() {
		var itemsData = [
			{id: 1,	name: 'test1'},
			{id: 2,	name: 'test2'},
			{id: 3,	name: 'test3'}
		];
		var pluckNames = Utils.pluck('name');

		it('should pluck the passed items out of an array of objects', function() {
			var names = Utils.pluck('name', itemsData);
			expect(names).to.eql(['test1', 'test2', 'test3']);

			var ids = Utils.pluck('id', itemsData);
			expect(ids).to.eql([1,2,3]);
		});

		it('should return a function if only one argument is passed', function() {
			expect(typeof pluckNames).to.equal('function');
		});

		it('curried function should work correctly', function() {
			var names = pluckNames(itemsData);
			expect(names).to.eql(['test1','test2','test3']);
		})
	});

	describe('isDirectionICanMove', function() {
		it('should return true for North, South, East, or West', function() {
			var test1 = Utils.isDirectionICanMove('North');
			expect(test1).to.be.true;
			var test2 = Utils.isDirectionICanMove('South');
			expect(test2).to.be.true;
			var test3 = Utils.isDirectionICanMove('East');
			expect(test3).to.be.true;
			var test4 = Utils.isDirectionICanMove('West');
			expect(test4).to.be.true;
		});

		it ('should return false for anything other than North, South, East, or West', function() {
			var test1 = Utils.isDirectionICanMove('NorthEast');
			expect(test1).to.be.false;
			var test2 = Utils.isDirectionICanMove('SouthWest');
			expect(test2).to.be.false;
			var test3 = Utils.isDirectionICanMove('SouthEast');
			expect(test3).to.be.false;
			var test4 = Utils.isDirectionICanMove('NorthWest');
			expect(test4).to.be.false;
		});
	});

	describe('inDirectionICanMove', function() {
		it('should return an empty array if it is passed an empty array', function() {
			var test = Utils.inDirectionICanMove([]);
			expect(test).to.eql([]);
		});

		it('should return North if it is passed an array with North in it', function() {
			var test = Utils.inDirectionICanMove(['North']);
			expect(test).to.eql(['North']);
		});

		it('should return an empty array if it is passed an array without North, South, East, or West in it', function() {
			var test = Utils.inDirectionICanMove(['NorthEast', 'NorthWest', 'SouthEast', 'SouthWest']);
			expect(test).to.eql([]);
		});

		it('should return an array with all of the directions I am able to move', function() {
			var test = Utils.inDirectionICanMove(['NorthEast', 'North', 'SouthEast', 'SouthWest', 'West']);
			expect(test).to.eql(['North', 'West']);
		});
	});

	describe('getLowestEnemyHealthDir', function() {
		it('should return false if it is passed an empty array', function() {
			var test = Utils.getLowestEnemyHealthDir([]);
			expect(test).to.be.false;
		});

		it('should return the direction of the lowest health enemy', function() {
			var test = Utils.getLowestEnemyHealthDir(['South']);
			expect(test).to.equal('South');
		});

		it('should return the direction of the lowest health enemy', function() {
			var test = Utils.getLowestEnemyHealthDir(['South','East']);
			expect(test).to.equal('East');
		});
	});

	describe('testPromise', function() {
		it('should return hello', function() {
			expect(Utils.testPromise()).to.eventually.equal('hello');
		});
	});

	describe('testKnex', function() {
		it('should return a user', function() {
			expect(Utils.testKnex()).to.eventually.equal('David');
		});
	});

	describe('toArray', function() {
		it('should convert an array like object into an real array', function() {
			var getArgs = function(a, b) {
				return arguments;
			};
			var args = getArgs('hello', 'world');
			var argsArray = Utils.toArray(args);
			expect(argsArray).to.be.an('array');
		});
	});

	describe('curry', function() {
		it('should return a function', function() {
			var add = function(a,b) { return a + b};
			var curriedAdd = Utils.curry(add);
			expect(curriedAdd).to.be.a('function');
		});

		it('a curried function should work properly', function() {
			var add = function(a,b) {return a + b;};
			var curriedAdd = Utils.curry(add);
			var add2 = curriedAdd(2);
			var six = add2(4);
			expect(six).to.equal(6);
		});

		it('returned function should work when all arguments are passed in', function() {
			var add = function(a, b) { return a + b;};
			var curriedAdd = Utils.curry(add);
			var six = curriedAdd(2, 4);
			expect(six).to.equal(6);
		});
	});

	describe('compose', function() {
		var add5 = function(a) {return 5 + a};
		var add10 = function(a) {return 10 + a};
		var add20 = function(a) {return 20 + a};
		it('should run passed in functions passing the return value from the function to the next function', function() {
			var add5Then10 = Utils.compose(add10, add5);
			var twenty = add5Then10(5);
			expect(twenty).to.equal(20);
		});

		it('should work with more than two functions passed in', function() {
			var add5Then10Then20 = Utils.compose(add20, add10, add5);
			var forty = add5Then10Then20(5);
			expect(forty).to.equal(40);
		});
	});

	describe('testing', function() {
		it('stuff', function() {
			var origArray = [1,2];
			var test = function(x) {
				z = x.slice();
				z.push(3);
				return z;
			};

			var result = test(origArray);
			expect(result).to.eql([1,2,3]);
			expect(origArray).to.eql([1,2]);
		});
	});

	describe('flip', function() {
		it('should return a function that accepts arguments in reverse order', function() {
			var divide = function(a,b) {return a/b;};
			var rDivide = Utils.flip(divide);
			var x = rDivide(1,2);
			expect(x).to.equal(2);
		});
	});

	describe('removeItemFromQueryString', function() {
		it('should return an empty string if it is passed an empty string', function() {
			var querystring = '';
			var result = Utils.removeItemFromQueryString(querystring, 'search_term');
			expect(result).to.equal('');
		});

		it('should return the same string if the item to replace is not found', function() {
			var querystring = '?test=test&test2=test2';
			var result = Utils.removeItemFromQueryString(querystring, 'search_term');
			expect(result).to.equal('?test=test&test2=test2');
		});

		it('should return an empty string if it is the only item in the querystring', function() {
			var querystring = '?search_term=javascript';
			var result = Utils.removeItemFromQueryString(querystring, 'search_term');
			expect(result).to.equal('');
		});

		it('should return a string with the item missing if it is not the first item but is not the only item', function() {
			var querystring = '?view=classic&search_term=javascript';
			var result = Utils.removeItemFromQueryString(querystring, 'search_term');
			expect(result).to.equal('?view=classic');
		});

		it('should return a string with item missing and the ? replaced if it is the first item but is not the only item', function() {
			var querystring = '?search_term=javascript&view=classic&test=test';
			var result = Utils.removeItemFromQueryString(querystring, 'search_term');
			expect(result).to.equal('?view=classic&test=test');
		});
	});


});