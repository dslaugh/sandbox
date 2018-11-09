// Last in, first out
// functions: push, pop, peek, length

const letters = []; // This is our stack

const word = 'racecar';

let rword = '';

// put letters of word onto stack
for (let i=0; i<word.length; i++) {
	letters.push(word[i]);
}

// pop off the stack in reverse order
for (let i=0; i<word.length; i++) {
	rword += letters.pop();
}

// if (rword === word) {
// 	console.log(word + ' is a palindrome');
// } else {
// 	console.log(word + ' is not a palindrome');
// }

// Creates a stack
const Stack = function() {
	this.count = 0;
	this.storage = [];

	// Adds a value onto the end of the stack
	this.push = function(value) {
		this.storage[this.count] = value;
		this.count++;
	};

	// Removes and returns the value at the end of the stack
	this.pop = function() {
		if (this.count === 0) {
			return undefined;
		}

		this.count--;
		const result = this.storage[this.count];
		delete 	this.storage[this.count];
		return result;
	};

	this.size = function() {
		return this.count;
	};

	this.peek = function() {
		return this.storage[this.count - 1];
	}
};

const myStack = new Stack();
myStack.push(1);
myStack.push(2);
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());
myStack.push('freeCodeCamp');
console.log(myStack.size());
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());
