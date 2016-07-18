// http://alistapart.com/article/prototypal-object-oriented-programming-using-javascript
var assert = require('chai').assert;

var genericAnimal;
describe('Prototype-based OO', function() {
	genericAnimal = Object.create(null);
	genericAnimal.name = 'Animal';
	genericAnimal.gender = 'female';
	genericAnimal.description = function() {
		return 'Gender: ' + this.gender + '; Name: ' + this.name;
	};

	describe('genericAnimal', function() {
		it('should be an object', function() {
			assert.isObject(genericAnimal);
		});

		it('should have the name "Animal"', function() {
			assert.equal(genericAnimal.name, 'Animal');
		});

		it('should have the gender "female"', function() {
			assert.equal(genericAnimal.gender, 'female');
		});

		it('description function should return a string with name and gender', function() {
			var desc = genericAnimal.description();
			assert.equal(desc, 'Gender: female; Name: Animal');
		});
	});

	describe('create a cat object from genericAnimal', function() {
		var cat = Object.create(genericAnimal);
		cat.purr = function() {
			return 'Purrrr!';
		};

		it('should have a new function that returns purring', function() {
			var purr = cat.purr();
			assert.equal(purr, 'Purrrr!');
		});

		describe('create new cats', function() {
			var colonel = Object.create(cat);
			colonel.name = 'Colonel Meow';

			var puffy = Object.create(cat);
			puffy.name = 'Puffy';

			it('create a new cat with a different name', function() {
				assert(colonel.name, 'Colonel Meow');
			});

			it('create another new cat', function() {
				assert(puffy.name, 'Puffy');
			});

			it('should still have methods from generalAnimal', function() {
				var puffyDesc = puffy.description();
				assert(puffyDesc, 'Gender: female; Name: Puffy');				
			});
		});

	});
});

describe('Use of the "new" keyword', function() {
	// This approach is considered problematic by many.
	// What is happening behind the scenes is prototypal OOP 
	// and it obfuscates the natural implementation of OOP.

	// From Douglas Crockford:
	// "JavaScript’s constructor pattern did not appeal to the classical crowd.
	//  It also obscured JavaScript’s true prototypal nature. 
	//  As a result, there are very few programmers who know how to use the language effectively."

	function Person(name) {
		this.name = name;
		this.sayName = function() {
			return 'Hi, I\'m ' + this.name;
		};
	}

	it('Creating a person and calling sayName', function() {
		var adam = new Person('Adam');
		var greeting = adam.sayName();
		assert.equal(greeting, 'Hi, I\'m Adam');
	});

	describe('Creating a ninja from Person', function() {
		function Ninja(name, weapon) {
			Person.call(this, name);
			this.weapon = weapon;
		}
		Ninja.prototype = Object.create(Person.prototype);
		Ninja.prototype.constructor = Ninja;
	});
});


// This is a polyfill for Object.create()
// This is to help understand what's going on under the hood.
//
// if (typeof Object.create !== 'function') {
// 	Object.create = function (o) {
// 		function F() {}
// 		F.prototype = o;
// 		return new F();
// 	};
// }

describe('Understanding delegation and implementation of prototypes', function() {
	var rodent = Object.create(genericAnimal);
	rodent.size = 'S';

	var capybara = Object.create(rodent);

	it('creates a object with the prototype set to null', function() {
		assert.equal(genericAnimal.prototype, null);
	});

	it('creating a rodent child points to the prototype of genericAnimal', function() {
		assert.equal(rodent.prototype, null);
		assert.equal(rodent.size, 'S');
	});

	it('capybara inherits the size property from rodent', function() {
		assert.equal(capybara.size, 'S');
	});
});

describe('Class-based OOP emulation can go wrong.', function() {
	// The problem here is that the offspring array is located on the Animal prototype
	// and each of the Cats use this same variable.
	describe('The wrong way', function() {
		function Animal() {
			this.offspring = [];
		}
		Animal.prototype.makeBaby = function() {
			var baby = new Animal();
			this.offspring.push(baby);
			return baby;
		};

		function Cat() {}
		Cat.prototype = new Animal();

		var puff = new Cat();
		puff.makeBaby();

		var colonel = new Cat();
		colonel.makeBaby();

		it('Each of the cats has both babies', function() {
			assert.equal(puff.offspring.length, 2);
			assert.equal(colonel.offspring.length, 2);
		});
	});

	describe('One way to solve this problem', function() {
		function Animal() {
			this.offspring = [];
		}

		// By checking to see if the object has it's own offspring property
		// and adding it if not, we push the baby onto the correct array.
		Animal.prototype.makeBaby = function() {
			var baby = new Animal();
			if (!this.hasOwnProperty('offspring')) {
				this.offspring = [];
			}
			this.offspring.push(baby);
			return baby;
		}

		function Cat() {}
		Cat.prototype = new Animal();

		var puff = new Cat();
		puff.makeBaby();

		var colonel = new Cat();
		colonel.makeBaby();

		it('Each of the cats only has its own baby', function() {
			assert.equal(puff.offspring.length, 1);
			assert.equal(colonel.offspring.length, 1);
		});
	});

});
	
