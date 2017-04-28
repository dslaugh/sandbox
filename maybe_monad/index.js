// http://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/

var user = {
	email: 'james@example.com',
	accountDetails: {
		address: {
			street: '123 Fake St',
			city: 'Exampleville',
			// province: 'NS',
			postcode: '1234'
		}
	},
	preferences: {}
};

// var user = {};

// var user = null;

// var user = {
// 	email: 'james@example.com',
// 	accountDetails: {}
// };

var banners = {
	'AB': '/assets/banners/alberta.jpg',
	'BC': '/assets/banners/british-columbia.jpg',
	'MB': '/assets/banners/manitoba.jpg',
	'NL': '/assets/banners/newfoundland-labrador.jpg',
	'NS': '/assets/banners/northwest-territories.jpg',
	'ON': '/assets/banners/ontario.jpg',
	'PE': '/assets/banners/prince-edward.jpg',
	'QC': '/assets/banners/quebec.jpg',
	'SE': '/assets/banners/saskatchewan.jpg',
	'YT': '/assets/banners/yukon.jpg'
};

// function getUserBanner(banners, user) {
// 	return banners[user.accountDetails.address.province];
// }

// function getUserBanner(banners, user) {
// 	if (user.accountDetails !== undefined) {
// 		return banners[user.accountDetails.address.province];
// 	}
// }

// function getUserBanner(banners, user) {
// 	if (user !== null) {
// 		if (user.accountDetails !== undefined) {
// 			return banners[user.accountDetails.address.province];
// 		}
// 	}
// }

// function getUserBanner(banners, user) {
// 	if (user !== null) {
// 		if (user.accountDetails !== undefined) {
// 			if (user.accountDetails.address !== undefined) {
// 				return banners[user.accountDetails.address.province];
// 			}
// 		}
// 	}
// }

var Maybe = function(val) {
	this.__value = val;
};
Maybe.of = function(val) {
	return new Maybe(val);
};
Maybe.prototype.isNothing = function() {
	return (this.__value === null || this.__value === undefined);
};
Maybe.prototype.map = function(f) {
	console.log('map', f, this);
	if (this.isNothing()) {
		console.log('map isNothing');
		return Maybe.of(null);
	}
	return Maybe.of(f(this.__value));
};
Maybe.prototype.join = function() {
	return this.__value;
};
Maybe.prototype.chain = function(f) {
	console.log('chain', f);
	return this.map(f).join();
};
Maybe.prototype.orElse = function(defaultVal) {
	if (this.isNothing()) {
		return Maybe.of(defaultVal);
	}
	return this;
};

function prop(prop, obj) {
	if (obj === undefined) {
		return function(obj) {
			return obj[prop];
		}
	} else {
		return obj[prop];
	}
}

function getProvinceBanner(province) {
	console.log('getProvinceBanner', province);
	return Maybe.of(banners[province]);
}

function getUserBanner(banners, user) {
	var x = Maybe.of(user)
		.map(prop('accountDetails'))
		.map(prop('address'))
		.map(prop('province'))
		.chain(getProvinceBanner)
		// .orElse('/assets/banners/default.jpg')

		// console.log('x', x);
		return x;
}

// function getUserBanner(banners, user) {
// 	return Maybe.of(user)
// 		.map(prop('accountDetails'))
// 		.map(prop('address'))
// 		.map(prop('province'))
// 		.chain(getProvinceBanner);
// }

var bannerSrc = getUserBanner(banners, user);
// console.log('bannerSrc', bannerSrc);

// Faking DOM
var document = {
	querySelector: function(selector) {
		return {class: selector, src: undefined}
	}
};

var el = document.querySelector('.banner');

el.src = bannerSrc;

console.log('el', el);








