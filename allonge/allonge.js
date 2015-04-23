var allonge = (function() {
		function toArray(obj) {
			return Array.prototype.slice.call(obj, 0);
		}
		
		function compose(a, b) {
			return function(c) {
				return a(b(c));
			};
		}
		
		function not(fn) {
			return function(argument) {
				return !fn(argument);
			};
		}
		
		function mapWith(fn) {
			return function(list) {
				return Array.prototype.map.call(list, function(something) {
					return fn.call(this, something);
				});
			};
		}
		
		function callFirst(fn, larg) {
			var self = this;
			return function() {
				var args = self.toArray(arguments);
				return fn.apply(this, [larg].concat(args));
			};
		}
		
		function callLast(fn, rarg) {
			var self = this;
			return function() {
				var args = self.toArray(arguments);
				return fn.apply(this, args.concat([rarg]));
			}
		}
		
		function variadic(fn) {
			var _slice = Array.prototype.slice;
			var fnLength = fn.length;

			if (fnLength < 1) {
				return fn;
			} else if (fnLength === 1) {
				return function() {
					return fn.call(this, _slice.call(arguments, 0));
				};
			} else {

				return function() {
					var numberOfArgs = arguments.length,
						allButLastNamedArgs = _slice.call(arguments, 0, fnLength - 1),
						numberOfTrailingArgs = Math.max(numberOfArgs - allButLastNamedArgs.length, 0),
						variadicArgs = _slice.call(arguments, allButLastNamedArgs.length),
						newArgs = allButLastNamedArgs.concat([variadicArgs]);
					return fn.apply(this, newArgs);
				};
			}
		}

		var callLeft = variadic(function(fn, args) {
			return variadic(function(remainingArgs) {
				return fn.apply(this, args.concat(remainingArgs));
			});
		});

	
		var callRight = variadic(function(fn, args) {
			return variadic(function(preceedingArgs) {
				return fn.apply(this, preceedingArgs.concat(args));
			});
		});


		// basically turns a function into a function that only ever receives one argument
		function unary(fn) {
			if (fn.length === 1) {
				return fn;
			} else {
				return function(something) {
					return fn.call(this, something);
				};
			}
		}

		function tap(value, fn) {
			if (fn === void 0) {
				return curried;
			} else {
				return curried(fn);
			}
			function curried(fn) {
				if (typeof(fn) === 'function') {
					fn(value);
				}
				return value;
			}
		}
		
		function maybe(fn) {
			return function() {
				var i;
				if (arguments.length === 0) {
					return;
				} else {
					for(i=0; i<arguments.length; i++) {
						if (arguments[i] === null) {
							return;
						}
						return fn.apply(this, arguments);
					}
				}
			};
		}
		
		function once(fn) {
			var done = false;
			return function() {
				return done ? void 0 : ((done = true), fn.apply(this, arguments));
			}
		}
		
		function flip(fn) {
			return function(first, second) {
				if (arguments.length === 2) {
					return fn.call(this, second, first);
				} else {
					return function(second) {
						return fn.call(this, second, first);
					};
				}
			};
		}

		var extend = variadic(function(consumer, providers) {
			var key,
				i,
				provider;

			for (i=0; i < providers.length; i++) {
				provider = providers[i];
				for (key in provider) {
					if (provider.hasOwnProperty(key)) {
						consumer[key] = provider[key];
					}
				}
			}
			return consumer;
		});

		var StackMaker = function() {
			var	array = [],
				index = -1;
			return {
				push: function(value) {
					return array[index += 1] = value;
				},
				pop: function() {
					var value = array[index];
					array[index] = void 0;
					if (index >= 0) {
						index -= 1;
					}
					return value;
				},
				isEmpty: function() {
					return index < 0;
				}
			};
		};

		var QueueMaker = function() {
			var queue = {
				array: [],
				head: 0,
				tail: -1,
				pushTail: function(value) {
					return queue.array[queue.tail += 1] = value;
				},
				pullHead: function() {
					var value;
					if (queue.tail >= queue.head) {
						value = queue.array[queue.head];
						queue.array[queue.head] = void 0;
						queue.head += 1;
						return value;
					}
				},
				isEmpty: function() {
					return queue.tail < queue.head;
				}
			};
			return queue;
		};

		var AmnesiacQueueMaker = function() {
			return {
				array: [],
				head: 0,
				tail: -1,
				pushTail: function(myself, value) {
					return myself.array[myself.tail += 1] = value;
				},
				pullHead: function(myself) {
					var value;
					if (myself.tail >= myself.head) {
						value = myself.array[myself.head];
						myself.array[myself.head] = void 0;
						myself.head += 1;
						return value;
					}
				},
				isEmpty: function(myself) {
					return myself.tail < myself.head;
				}
			};
		};

		var BanksQueueMaker = function() {
			return {
				array: [],
				head: 0,
				tail: -1,
				pushTail: function(value) {
					return this.array[this.tail += 1] = value;
				},
				pullHead: function() {
					var value;
					if (this.tail >= this.head) {
						value = this.array[this.head];
						this.array[this.head] = void 0;
						this.head += 1;
						return value;
					}
				},
				isEmpty: function() {
					return this.tail < this.head;
				}
			};
		};

		function memoized(fn, keymaker) {
			var lookupTable = {},
				key;

			keymaker || (keymaker = function(args) {
				return JSON.stringify(args);
			});

			return function() {
				key = keymaker.call(this, arguments);

				return lookupTable[key] || (
					lookupTable[key] = fn.apply(this, arguments)
				)
			};

		}

		function getWith(attr) {
			return function(object) {
				return object[attr];
			};
		}

		var pluckWith = compose(mapWith, getWith);

		function deepMapWith(fn) {
			return function innerdeepMapWith(tree) {
				return Array.prototype.map.call(tree, function(element) {
					if (Array.isArray(element)) {
						return innerdeepMapWith(element);
					} else {
						return fn(element);
					}
				});
			}
		}

		var Queue2 = function() {
			extend(this, {
				array: [],
				head: 0,
				tail: -1
			})
		};

		extend(Queue2.prototype, {
			pushTail: function(value) {
				return this.array[this.tail += 1] = value;
			},
			pullHead: function() {
				var value;
				if (!this.isEmpty()) {
					value = this.array[this.head];
					this.array[this.head] = void 0;
					this.head += 1;
					return value;
				}
			},
			isEmpty: function() {
				return this.tail < this.head;
			}
		});

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


		return {
			toArray: toArray,
			compose: compose,
			not: not,
			mapWith: mapWith,
			callFirst: callFirst,
			callLast: callLast,
			variadic: variadic,
			callLeft: callLeft,
			callRight: callRight,
			unary: unary,
			tap: tap,
			maybe: maybe,
			once: once,
			flip: flip,
			extend: extend,
			StackMaker: StackMaker,
			QueueMaker: QueueMaker,
			AmnesiacQueueMaker: AmnesiacQueueMaker,
			BanksQueueMaker: BanksQueueMaker,
			memoized: memoized,
			getWith: getWith,
			pluckWith: pluckWith,
			deepMapWith: deepMapWith,
			Queue2: Queue2,
			curry: curry
		};
})();


if (typeof exports !== 'undefined') {
	exports.allonge = allonge;
}