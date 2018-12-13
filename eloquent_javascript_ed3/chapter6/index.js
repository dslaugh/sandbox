// function speak(line) {
// 	return `The ${this.type} rabbit says '${line}'`;
// }
// let whiteRabbit = { type: 'white', speak };
// let hungryRabbit = { type: 'hungry', speak };
//
// whiteRabbit.speak('Hello'); //?
// hungryRabbit.speak('Goodbye'); //?
//
// speak.call(whiteRabbit, 'Hey'); //?
//
// function normalize() {
// 	return this.coords.map(n => n / this.length);
// }
//
// normalize.call({ coords: [0, 2, 3], length: 5 }); //?

// let protoRabbit = {
// 	speak(line) {
// 		return `The ${this.type} rabbit says '${line}'`;
// 	}
// };
//
// let killerRabbit = Object.create(protoRabbit);
// killerRabbit.type = 'killer';
// killerRabbit.speak('SKREEEEEEEE!'); //?
//
// function makeRabbit(type) {
// 	let rabbit = Object.create(protoRabbit);
// 	rabbit.type = type;
// 	return rabbit;
// }
//
// const smellyRabbit = makeRabbit('smelly');
// smellyRabbit.speak('pardon the smell'); //?

// function Rabbit(type) {
// 	this.type = type;
// }
// Rabbit.prototype.speak = function(line) {
// 	return `The ${this.type} rabbit says '${line}'`;
// };
//
// const weirdRabbit = new Rabbit('weird');
// weirdRabbit.speak(`You don't know who I are, have you`); //?
//
// class Rabbit {
// 	constructor(type) {
// 		this.type = type;
// 	}
//
// 	speak(line) {
// 		return `The ${this.type} rabbit says '${line}'`;
// 	}
// }
//
// const paranoidRabbit = new Rabbit('paranoid');
// paranoidRabbit.speak('Who is asking?'); //?
//
// let sym = Symbol('name');
// sym == Symbol('name'); //?
//
// Rabbit.prototype[sym] = 55;
// paranoidRabbit[sym]; //?
//
// const toStringSymbol = Symbol('toString');
// Array.prototype[toStringSymbol] = function() {
// 	return `${this.length} cm of blue yarn`;
// };
// [3, 4].toString(); //?
// [3, 4][toStringSymbol](); //?
//
// const okIterator = 'OK'[Symbol.iterator]();
// okIterator.next(); //?
// okIterator.next(); //?
// okIterator.next(); //?
//
class Matrix {
	constructor(width, height, element = (x, y) => undefined) {
		this.width = width;
		this.height = height;
		this.content = [];

		for (let y=0; y < height; y++) {
			for (let x=0; x < width; x++) {
				this.content[y * width + x] = element(x, y);
			}
		}
	}

	get(x, y) {
		return this.content[y * this.width + x];
	}

	set(x, y, value) {
		this.content[y * this.width + x] = value;
	}
}

class MatrixIterator {
	constructor(matrix) {
		this.x = 0;
		this.y = 0;
		this.matrix = matrix;
	}

	next() {
		if (this.y === this.matrix.height) {
			return { done: true };
		}

		let value = {
			x: this.x,
			y: this.y,
			value: this.matrix.get(this.x, this.y),
		};

		this.x++;

		if (this.x === this.matrix.width) {
			this.x = 0;
			this.y++;
		}

		return { value, done: false };
	}
}

Matrix.prototype[Symbol.iterator] = function() {
	return new MatrixIterator(this);
};

// let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
// for (let {x, y, value } of matrix) {
// 	console.log(x, y, value);
// }

// let varyingSize = {
// 	get size() {
// 		return Math.floor(Math.random() * 100);
// 	}
// };
// varyingSize.size; //?
// varyingSize.size; //?
// varyingSize.size; //?
//
// class Temperature {
// 	constructor(celcius) {
// 		this.celcius = celcius;
// 	}
//
// 	get fahrenheit() {
// 		return this.celcius * 1.8 + 32;
// 	}
//
// 	set fahrenheit(value) {
// 		this.celcius = (value - 32) / 1.8;
// 	}
//
// 	static fromFahrenheit(value) {
// 		return new Temperature((value - 32) / 1.8);
// 	}
// }
// let temp = new Temperature(0);
// temp.fahrenheit; //?
// temp.fahrenheit = 212;
// temp.celcius; //?
//
// Temperature.fromFahrenheit(212).celcius; //?

// class SymmetricMatrix extends Matrix {
// 	constructor(size, element = (x, y) => undefined) {
// 		super(size, size, (x, y) => {
// 			if (x < y) {
// 				return element(y, x);
// 			} else {
// 				return element(x, y);
// 			}
// 		});
// 	}
//
// 	set(x, y, value) {
// 		super.set(x, y, value);
// 		if (x != y) {
// 			super.set(y, x, value);
// 		}
// 	}
// }
//
// let symMatrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
// symMatrix.get(2, 3); //?

class Vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(vec) {
		const newX = this.x + vec.x;
		const newY = this.y + vec.y;
		return new Vec(newX, newY);
	}

	minus(vec) {
		const newX = this.x - vec.x;
		const newY = this.y - vec.y;
		return new Vec(newX, newY);
	}

	get length() {
		const x2 = this.x * this.x;
		const y2 = this.y * this.y;
		return Math.sqrt(x2 + y2);
	}
}

new Vec(1, 2).plus(new Vec(2, 3)); //?
new Vec(1, 2).minus(new Vec(2, 3)); //?
new Vec(3, 4).length; //?

// Implementation of Set
class Group {
	constructor() {
		this.members = [];
	}

	add(value) {
		if (!this.has(value)) {
			this.members.push(value);
		}
	}

	delete(value) {
		this.members = this.members.filter(m => m !== value);
	}

	has(value) {
		return this.members.includes(value);
	}

	static from(iterable) {
		let group = new Group();
		for (let value of iterable) {
			group.add(value);
		}
		return group;
	}

	[Symbol.iterator]() {
		return new GroupIterator(this);
	}
}
let group = Group.from([10, 20]);
group.has(10); //?
group.has(30); //?
group.add(10); //?
group.delete(10); //?
group.has(10); //?

class GroupIterator {
	constructor(group) {
		this.index = 0;
		this.group = group;
	}

	next() {
		if (this.index >= this.group.members.length) {
			return { done: true };
		}

		const result = this.group.members[this.index];

		this.index++;

		return { value: result, done: false };
	}
}

// Group.prototype[Symbol.iterator] = function() {
// 	return new GroupIterator(this);
// };

for (let value of Group.from(["a", "b", "c"])) {
	value; //?
}