"use strict";

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var allonge2 = (function () {
	var compose = function compose() {
		for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
			fns[_key] = arguments[_key];
		}

		var rtl = fns.reverse();
		return function (x) {
			return rtl.reduce(function (prev, curr) {
				return curr(prev);
			}, x);
		};
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

	var map = curry(function (fn, arr) {
		return arr.map(fn);
	});

	var prop = curry(function (prop, obj) {
		return obj[prop];
	});

	var length = function length(_ref) {
		var _ref2 = _toArray(_ref);

		var first = _ref2[0];

		var rest = _ref2.slice(1);

		return first === undefined ? 0 : 1 + length(rest);
	};

	var flatten = function flatten(_ref3) {
		var _ref32 = _toArray(_ref3);

		var first = _ref32[0];

		var rest = _ref32.slice(1);

		if (first === undefined) {
			return [];
		} else if (!Array.isArray(first)) {
			return [first].concat(_toConsumableArray(flatten(rest)));
		} else {
			return [].concat(_toConsumableArray(flatten(first)), _toConsumableArray(flatten(rest)));
		}
	};

	var squareAll = function squareAll(_ref4) {
		var _ref42 = _toArray(_ref4);

		var first = _ref42[0];

		var rest = _ref42.slice(1);

		return first === undefined ? [] : [first * first].concat(_toConsumableArray(squareAll(rest)));
	};

	var mapWith = function mapWith(fn, _ref5) {
		var _ref52 = _toArray(_ref5);

		var first = _ref52[0];

		var rest = _ref52.slice(1);

		return first === undefined ? [] : [fn(first)].concat(_toConsumableArray(mapWith(fn, rest)));
	};

	var foldWith = function foldWith(fn, terminalValue, _ref6) {
		var _ref62 = _toArray(_ref6);

		var first = _ref62[0];

		var rest = _ref62.slice(1);

		return first === undefined ? terminalValue : fn(first, foldWith(fn, terminalValue, rest));
	};

	var mapWith2 = function mapWith2(fn, arr) {
		return foldWith(function (first, rest) {
			return [fn(first)].concat(_toConsumableArray(rest));
		}, [], arr);
	};

	var cons = function cons(a, d) {
		return [a, d];
	};
	var car = function car(_ref7) {
		var _ref72 = _slicedToArray(_ref7, 2);

		var a = _ref72[0];
		var d = _ref72[1];
		return a;
	};
	var cdr = function cdr(_ref8) {
		var _ref82 = _slicedToArray(_ref8, 2);

		var a = _ref82[0];
		var d = _ref82[1];
		return d;
	};

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
