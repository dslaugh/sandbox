var R = require('ramda');

var RamdaTesting = {
	test: function(num1, num2) {
		return R.add(num1,num2);
	},
	getRandomNumber: function(max) {
		if (!max) {
			return false;
		}
		return Math.floor((Math.random() * max) + 1);
	},
	getRandomLetterFromString: function(str) {
		var rand = this.getRandomNumber(str.length);
		return str[rand - 1];
	},
	randomizeString: function(str) {
		var randomizedString = '';
		var i = 0;
		var strLen = str.length;
		while(str.length > 0 || i > strLen) {
			i++;
			var randomLetter = this.getRandomLetterFromString(str);

			randomizedString += randomLetter;
			str = str.replace(randomLetter, '');
		}
		return randomizedString;
	},
	getTags: function(tagsData) {
		return R.pluck('label', tagsData);
	}
};

module.exports = RamdaTesting;