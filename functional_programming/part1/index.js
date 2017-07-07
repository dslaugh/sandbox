const R = require('ramda');
const RF = require('ramda-fantasy');
const prop = R.prop;
const path = R.path;
const Maybe = RF.Maybe;

const fakeWindow = (arg) => {
	console.log('I got ' + arg);
};

let joeUser = {
	name: 'joe',
	email: 'joe@example.com',
	prefs: {
		languages: {
			primary: 'sp',
			secondary: 'en',
		},
	},
};

let indexURLs = {
	'en': 'http://mysite.com/en',
	'sp': 'http://mysite.com/sp',
	'jp': 'http://mystite.com/.jp',
};

const showIndexPage = (url) => { fakeWindow(url) };

const getUrlForUserImperative = (user) => {
	if (user == null) {
		return indexURLs['en'];
	}

	if (user.prefs.languages.primary && user.prefs.languages.primary != 'undefined') {
		if (indexURLs[user.prefs.languages.primary]) {
			return indexURLs[user.prefs.languages.primary];
		} else {
			return indexURLs['en'];
		}
	}
};

const getUrlForUserFunctional = (user) => {
	return Maybe(user)
		.map(path('prefs.languages.primary'))
		.chain(maybeGetUrl);
}

const maybeGetUrl = R.curry(function(allUrls, language) {
	return Maybe(allUrls[language]);
})(indexURLs);

function boot(user, defaultURL) {
	showIndexPage(getUrlForUserFunctional(user).getOrElse(defaultURL));
}

showIndexPage(getUrlForUserImperative(joeUser));

boot(joeUser, 'http://site.com/en');
