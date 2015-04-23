var expect = require('chai').expect;
var rt = require('../ramda_testing.js');

describe('Ramda Testing', function() {
	describe('Sanity test', function() {
		it('Should exist', function() {
			expect(rt).to.exist;
		});
	});

	describe('Getting a random number between 1 and a supplied argument', function() {
		it('Should be between 1 and 10', function() {
			var num = rt.getRandomNumber(10);
			expect(num).to.be.within(1,10);
		});
		it('Should be between 1 and 10', function() {
			var num = rt.getRandomNumber(10);
			expect(num).to.be.within(1,10);
		});
		it('Should be between 1 and 10', function() {
			var num = rt.getRandomNumber(10);
			expect(num).to.be.within(1,10);
		});
		it('Should be between 1 and 10', function() {
			var num = rt.getRandomNumber(10);
			expect(num).to.be.within(1,10);
		});
		it('Should be between 1 and 100', function() {
			var num = rt.getRandomNumber(100);
			expect(num).to.be.within(1,100);
		});
	});

	describe('Getting a random letter from a string', function() {
		it('Should return one letter from "David"', function() {
			var letter = rt.getRandomLetterFromString('David');
			expect('David').to.contain(letter);
		});
		it('Should return one letter from "David"', function() {
			var letter = rt.getRandomLetterFromString('David');
			expect('David').to.contain(letter);
		});
		it('Should return one letter from "David"', function() {
			var letter = rt.getRandomLetterFromString('David');
			expect('David').to.contain(letter);
		});
		it('Should return one letter from "David"', function() {
			var letter = rt.getRandomLetterFromString('David');
			expect('David').to.contain(letter);
		});
		it('Should return one letter from "David"', function() {
			var letter = rt.getRandomLetterFromString('David');
			expect('David').to.contain(letter);
		});
		it('Should return one letter from "David"', function() {
			var letter = rt.getRandomLetterFromString('David');
			expect('David').to.contain(letter);
		});
		it('Should return one letter from "David"', function() {
			var letter = rt.getRandomLetterFromString('David');
			expect('David').to.contain(letter);
		});
	});

	describe('Randomize a string', function() {
		it('Should return a randomized version of the string supplied', function() {
			var str = 'David';
			var randomizedString = rt.randomizeString(str);
			expect(randomizedString.split('')).to.have.members(str.split(''));
		});

		it('Should return a randomized version of the string supplied including a space', function() {
			var str = 'David Slaugh';
			var randomizedString = rt.randomizeString(str);
			expect(randomizedString.split('')).to.have.members(str.split(''));
		});
	});

	describe('Tags', function() {
		it('Should return an array of tags when passed and array of objects containing tag info', function() {
			var tagsData = [
				{
					id: 1,
					label: 'test1',
				},
				{
					id: 2,
					label: 'test2',
				},
				{
					id: 3,
					label: 'test3',
				}
			];
			var tags = rt.getTags(tagsData);
			expect(tags).to.eql(['test1', 'test2', 'test3']);
		});
	});
});