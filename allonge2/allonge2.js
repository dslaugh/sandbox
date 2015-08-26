var allonge2 = (function() {
	var compose = (...fns) => {
		var rtl = fns.reverse();
		return (x) => {
			return rtl.reduce((prev, curr) => {
				return curr(prev);
			}, x);
		}
	};

	function curry(fn) {
		var arity = fn.length;
		return given([]);

		function given(argsSoFar) {
			return function helper() {
				var updatedArgsSoFar = argsSoFar.concat(Array.prototype.slice.call(arguments, 0));
				if (updatedArgsSoFar.length >= arity) {
					return fn.apply(this, updatedArgsSoFar);
				} else {
					return given(updatedArgsSoFar);
				}
			};
		}
	}

	var map = curry((fn, arr) => arr.map(fn));

	var prop = curry((prop, obj) => obj[prop]);	

	const length = ([first, ...rest]) => first === undefined ? 0 : 1 + length(rest);

	const flatten = ([first, ...rest]) => {
		if (first === undefined) {
			return [];
		} else if (!Array.isArray(first)) {
			return [first, ...flatten(rest)];
		} else {
			return [...flatten(first), ...flatten(rest)];
		}
	};

	const squareAll = ([first, ...rest]) => first === undefined ? [] : [first * first, ...squareAll(rest)];

	const mapWith = (fn, [first, ...rest]) => first === undefined ? [] : [fn(first), ...mapWith(fn, rest)];

	const foldWith = (fn, terminalValue, [first, ...rest]) => first === undefined ? terminalValue : fn(first, foldWith(fn, terminalValue, rest));

	const mapWith2 = (fn, arr) => foldWith((first, rest) => [fn(first), ...rest], [], arr);

	const cons = (a, d) => [a, d];
	const car = ([a, d]) => a;
	const cdr = ([a, d]) => d;

	return {
		compose: compose,
		curry: curry,
		map: map,
		prop: prop,
		length: length,
		flatten: flatten,
		squareAll: squareAll,
		mapWith: mapWith,
		foldWith: foldWith,
		mapWith2: mapWith2,
		cons: cons,
		car: car,
		cdr: cdr
	};
})();

if (typeof exports !== undefined) {
	exports.allonge2 = allonge2;
}