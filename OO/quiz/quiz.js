//http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/ 


function User(theName, theEmail) {
	this.name = theName;
	this.email = theEmail;
	this.quizScores = [];
	this.currentScore = 0;
}

User.prototype = {
	constructor: User,

	getName: function() {
		return this.name;
	},

	saveScore: function(theScoreToAdd) {
		this.quizScores.push(theScoreToAdd);
	},

	getQuizScores: function() {
		return this.quizScores;
	},

	showNameAndScores: function() {
		var scores = this.quizScores.length > 0 ? this.quizScores.join(',') : 'No Scores Yet';
		return this.name + ' Scores: ' + scores;
	},

	changeEmail: function(newEmail) {
		this.email = newEmail;
		return "New Email Saved: " + this.email;
	},

	getEmail: function() {
		return this.email;
	},

	getCurrentScore: function() {
		return this.currentScore;
	}

};

function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}

function Question(theQuestion, theChoices, theCorrectAnswer) {

}

module.exports = {
	User: User,
	inheritPrototype: inheritPrototype
};