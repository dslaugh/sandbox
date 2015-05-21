var R = require('ramda');

function getItem() {
	return 'item 1';
}

var item = getItem();

var print = function(x) {
	console.log(x);
	console.log(x.length);
};

function Maybe(x) {
	return {
		then: function(fn) {
			if (x !== undefined && x !== null) {
				return fn(x);
			}
		}
	};
}

Maybe(item).then(print);
Maybe('foo').then(print);


function isDefined(x) {
	return x !== undefined && x !== null;
}
function Conditional(condition, x) {
	return {
		then: function(fn) {
			if (condition(x)) {
				return fn(x);
			}
		}
	};
}

Conditional(isDefined, 'foo').then(print);
Conditional(isDefined, undefined).then(print); // Does nothing


function length(x) {
	return x.length;
}

console.log(length('foo'));


