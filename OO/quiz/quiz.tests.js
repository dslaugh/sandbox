var assert = require('chai').assert;
var User = require('./quiz.js').User;
var inheritPrototype = require('./quiz').inheritPrototype;

describe('User', function() {
	var daveUser;
	beforeEach(function() {
		daveUser = new User('Dave', 'dslaugh@gmail.com');
	});

	describe('Constructing a new User', function() {
		it('should create an instance of User', function() {
			assert.ok(daveUser instanceof User);
		});

		it('should set the name', function() {
			assert.equal(daveUser.getName(), 'Dave');
		});

		it('should set the email address', function() {
			assert.equal(daveUser.getEmail(), 'dslaugh@gmail.com');
		});

		it('quizScores should be an empty array', function() {
			assert.deepEqual(daveUser.getQuizScores(), []);
		});

		it('currentScore should be zero', function() {
			assert.equal(daveUser.getCurrentScore(), 0);
		});
	});

	describe('saveScore', function() {
		it('should save a score', function() {
			daveUser.saveScore(10);
			assert.deepEqual(daveUser.getQuizScores(), [10]);
		});

		it('should save mulitple scores', function() {
			daveUser.saveScore(20);
			daveUser.saveScore(30);
			assert.deepEqual(daveUser.getQuizScores(), [20, 30]);
		});
	});

	describe('showNameAndScores', function() {
		it('should return "No Scores Yet" when no scores have been saved', function() {
			var nameAndScores = daveUser.showNameAndScores();
			var expected = 'Dave Scores: No Scores Yet';
			assert.equal(nameAndScores, expected);
		});
		
		it('should return the name and scores', function() {
			daveUser.saveScore(20);
			daveUser.saveScore(30);
			var nameAndScores = daveUser.showNameAndScores();
			var expected = 'Dave Scores: 20,30';
			assert.equal(nameAndScores, expected);
		});
	});

	describe('changeEmail', function() {
		it('should change email', function() {
			daveUser.changeEmail('dslaugh@silvervue.com');
			assert.equal(daveUser.getEmail(), 'dslaugh@silvervue.com');
		});
	});
});