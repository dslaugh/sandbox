var compose = function() {
	var fns = Array.prototype.slice.call(arguments, 0).reverse();
	return function(initVal) {
		return fns.reduce(function(prevVal, currVal) {
			return currVal(prevVal);
		}, initVal);
	}
};

var curry = function(fn) {
	return given([]);

	function given(argsSoFar) {
		return function() {
			var updatedArgsSoFar = argsSoFar.concat(Array.prototype.slice.call(arguments, 0));
			if (updatedArgsSoFar.length >= fn.length) {
				return fn.apply(this, updatedArgsSoFar);
			} else {
				return given(updatedArgsSoFar);
			}
		};
	}
};


var split = curry(function(splitOn, str) {
	return str.split(splitOn);
});

function pop(arr) {
	return arr.pop();
};

function paramsToObj(params) {
	return params.reduce(function(obj, param) {
		var parts = param.split('=');
		obj[parts[0]] = parts[1];
		return obj;
	}, {});
}



var UrlParser = (function() {
	var urlParts = [],
		queryString = '';

	function parse(url) {
		var urlParts = url.split('?');
		return {
			url: urlParts[0],
			queryParams: urlParts[1] ? getQueryParams(urlParts[1]) : ''
		};
	}

	var getQueryParams = compose(paramsToObj, split('&'));

	return {
		parse: parse,
	};
})();

module.exports = UrlParser;