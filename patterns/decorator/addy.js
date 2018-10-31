// https://addyosmani.com/blog/decorator-pattern/

// Demonstrating subclassing...
const subclassExample = {
	Person: function(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = 'male';
	}
};

// const clark = new subclassExample.Person('Clark', 'Kent');
// console.log(clark);

subclassExample.Superhero = function(firstName, lastName, powers) {
	subclassExample.Person.call(this, firstName, lastName);
	this.powers = powers;
};

subclassExample.Superhero.prototype = subclassExample.Person;

// const superman = new subclassExample.Superhero('Clark', 'Kent', ['flight', 'heat-vision']);
// console.log(superman);

// Basic decoration of existing object constructors with new functionality
function vehicle(vehicleType) {
	this.vehicleType = vehicleType || 'car';
	this.model = 'default';
	this.license = '00000-000';
}

const testVehicle = new vehicle('car');
// console.log(testVehicle);

const truck = new vehicle('truck');
truck.setModel = function (modelName) {
	this.model = modelName;
};
truck.setColor = function (color) {
	this.color = color;
};

truck.setModel('CAT');
truck.setColor('blue');
// console.log(truck);

const secondInstance = new vehicle('car');
// console.log(secondInstance);

// Simply decorate objects with multiple decorators
// What we're going to decorate
function MacBook() {
	this.cost = function () { return 997; };
	this.screenSize = function () { return 13.3 };
}

//Decorator 1
function Memory(macbook) {
	const v = macbook.cost();
	macbook.cost = function() {
		return v + 75;
	}
}

//Decorator 2
function Engraving(macbook) {
	const v = macbook.cost();
	macbook.cost = function () {
		return v + 200;
	}
}

//Decorator 3
function Insurance(macbook) {
	const v = macbook.cost();
	macbook.cost = function () {
		return v + 250;
	}
}

const mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);
console.log(mb.cost());
console.log(mb.screenSize());