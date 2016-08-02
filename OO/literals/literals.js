// https://rainsoft.io/why-object-literals-in-javascript-are-cool/?utm_source=javascriptweekly&utm_medium=email
var assert = require('chai').assert;

describe('Object Literals', function() {

	describe('Basics', function() {
		// Before ECMAScript 2015 object literals (also named object initializers) in JavaScript were quite elementary. 
		// It was possible to define 2 types of properties:

		// Pairs of property names and related values { name1: value1 }
		// Getters { get name(){..} } and setters { set name(val){..} } for computed property values

		var myObject = {
			myString: 'value 1',

			get myNumber() {
				return this._myNumber;
			},

			set myNumber(value) {
				this._myNumber = value;
			} 
		};

		it('should have a property myString', function() {
			assert.equal(myObject.myString, 'value 1');
		});

		it('should be able to set and get myNumber', function() {
			myObject.myNumber = 42;
			assert.equal(myObject.myNumber, 42);
		});
	});

	describe('Setting up the prototype', function() {
		describe('Using Object.create() to set up the prototype', function() {
			var myProto = {
				propertyExists: function(name) {
					return name in this;
				}
			};

			var myNumbers = Object.create(myProto);
			myNumbers['array'] = [1, 6, 7];

			it('should have propertyExists functionality', function() {
				assert.ok(myNumbers.propertyExists('array'));
				assert.notOk(myNumbers.propertyExists('collection'));
			});
		});

		describe('__proto__ in ES2015', function() {
			var myObject = {
				name: 'Hello'
			};

			it('should have a __proto__', function() {
				assert.deepEqual(myObject.__proto__, {});
			});

			it('__proto__ should be a prototype of myObject', function() {
				assert.ok(myObject.__proto__.isPrototypeOf(myObject));
			});
		});

		describe('Using __proto__ for object creation', function() {
			var myProto = {
				propertyExists: function(name) {
					return name in this;
				}
			};

			var myNumbers = {
				__proto__: myProto,
				array: [1, 6, 7]
			};

			it('should still have propertyExists functionality', function() {
				assert.ok(myNumbers.propertyExists('array'));
				assert.notOk(myNumbers.propertyExists('collection'));
			});			

			// You can only use __proto_ once.
			// This throws an error:

			// var object = {
			// 	__proto__: {
			// 		toString: function() {
			// 			return '[object Numbers]'
			// 		}
			// 	},
			// 	numbers: [1, 5, 89],
			// 	__proto__: {
			// 		toString: function() {
			// 			return '[object ArrayOfNumbers]'
			// 		}
			// 	}
			// };

			// Also, you can only use objects or null for __proto__
			// These two will have the default prototype {} as anything other than an object or null will be ignored.

			// var objUndefined = {  
			//   __proto__: undefined
			// };
			// Object.getPrototypeOf(objUndefined); // => {}  
			// var objNumber = {  
			//   __proto__: 15
			// };
			// Object.getPrototypeOf(objNumber);			
		});
	});

	describe('Shorthand method definition', function() {
		var collection = {
			items: [],
			add(item) {
				this.items.push(item);
			},
			get(index) {
				return this.items[index];
			}
		};

		it('should work as expected', function() {
			collection.add(15);
			collection.add(3);
			assert.equal(collection.get(0), 15);
		});
	});

	describe('Make super calls', function() {
		var calc = {
			numbers: null,
			sumElements() {
				return this.numbers.reduce(function(a, b) {
					return a + b;
				});
			}
		};
		describe('using super in shorthand method definition', function() {

			var numbers = {
				__proto__: calc,
				numbers: [4, 6, 7],
				sumElements() {
					// verify if numbers not null or empty
					if (this.numbers == null || this.numbers.length == 0) {
						return 0;
					}
					return super.sumElements();
				}
			};

			it('should sum elements', function() {
				assert.equal(numbers.sumElements(), 17);
			});
		});

		// super can only be used in the shorthand method definition.
		// This throws an error:

		// var numbers = {  
		//   __proto__: calc,
		//   numbers: [4, 6, 7],
		//   sumElements: function() {
		//     // Verify if numbers is not null or empty
		//     if (this.numbers == null || this.numbers.length === 0) {
		//       return 0;
		//     } 
		//     return super.sumElements();
		//   }
		// };			
	});

	describe('Computed property names', function() {
		function prefix(prefStr, name) {
			return prefStr + '_' + name;
		}
		var object = {};
		object[prefix('number', 'pi')] = 3.14;
		object[prefix('bool', 'false')] = false;

		var object2 = {
			[prefix('number', 'pi')]: 3.14,
			[prefix('bool', 'false')]: false
		};

		it('should work with calculated properties', function() {
			assert.equal(object.number_pi, 3.14);
			assert.notOk(object.bool_false);

			assert.equal(object2.number_pi, 3.14);
			assert.notOk(object2.bool_false);
		});

	});

	describe('Symbol as property name', function() {
		var object = {
			number1: 14,
			number2: 15,
			string1: 'hello',
			string2: 'world',
			[Symbol.iterator]: function *() {
				var own = Object.getOwnPropertyNames(this),
					prop;
					
				while(prop = own.pop()) {
					yield prop;
				}		
			} 
		}

		assert.deepEqual([...object], ['string2', 'string1', 'number2', 'number1']);
	});
});














