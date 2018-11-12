// Hash tables are used to implement associative arrays or mappings of key, value pairs.
// Hash tables are a common way to implement the Map data structure or Objects.

// It takes a "key" input and runs it through a hash function.
// A hash function basically just maps strings to numbers.
// The numbers usually correspond to indexes in an array.
// A hash function needs to be consistent so when you run a key through it, it always gives the same number,
// and it should map different words to different numbers.

// Hash function
// Create a function, "hash" with two parameters: "string", "max". String is the key and max is the size of the hash table.
function hash(string, max) {
	// Create a variable "hash" and initalize it with 0;
	let hash = 0;
	// Create a loop to go through each letter of "string"
	for (let i=0; i<string.length; i++) {
		// In the loop get the charCode of each letter and add it to "hash"
		hash += string.charCodeAt(i);
	}
	// After the loop return the modulus of hash % max. This makes sure it's within the size of the hash table.
	return hash % max;
}

// Hash Table
// Create a factory function with no parameters
const HashTable = function() {
	// Create a variable, "storage" and initialize it as an empty array
	const storage = [];
	// Create a constant, "storageLimit" and initialize it with the size you want the hash table to be
	const storageLimit = 4;
	// Create a method, "this.print" that console.logs "storage"
	this.print = function() {
		console.log(storage);
	};
	// Create a function, "this.add" that has two parameters: (key, value)
	this.add = function(key, value) {
		// Create a variable "index" and initialize it with the result from the hash function, passing it (key, storageLimit)
		const index = hash(key, storageLimit);
		// Use "index" to see if "storage" doesn't have an entry yet.
		if (!storage[index]) {
			// If it doesn't have an entry,
			// create it and initialize it with [key, value]
			storage[index] = [[key, value]];
		} else {
			// If it does have an entry
			// Create a variable, "inserted" and initialize it as false.
			let inserted = false;
			// Loop through the elements at this index.
			for (let i=0; i<storage[index].length; i++) {
				// Check each element's first element to see if it's key matches the parameter, "key"
				if (storage[index][i][0] === key) {
					// If it finds a match
					// Assign the parameter "value" to the second element
					storage[index][i][1] = value;
					// Change "inserted" to true
					inserted = true;
				}
			}
			// Check to see if "inserted" equals false
			if (inserted === false) {
				// If so, push ["key", "value"] onto "storage" at "index"
				storage[index].push([key, value]);
			}
		}
	};

	this.remove = function(key) {
		// Create variable index and initialize it to the result of hash function
		const index = hash(key, storageLimit);
		// Check to see if the value at index only has one element
		if (storage[index].length === 1) {
			// If so, delete that element
			delete storage[index];
		} else {
			// If there is more than one, loop through the elements checking for the key.
			for(let i=0; i<storage[index].length; i++) {
				// If found, delete the element
				if (storage[index][i][0] === key) {
					delete storage[index][i];
				}
			}

		}
	};

	this.lookup = function(key) {
		// Create a variable "index" and initialize it to the result of hash function
		const index = hash(key, storageLimit);
		// Check to see if the index exists in storage.
		if (!storage[index]) {
			// If not, return undefined
			return undefined;
		}

		// Loop through elements in storage[index]
		for (let i=0; i<storage[index].length; i++) {
			// If the first element matches the key, return it.
			if (storage[index][i][0] === key) {
				return storage[index][i][1];
			}
		}

		// If still not found return undefined
		return undefined;
	};
};

const myHashTable = new HashTable();
myHashTable.add('id', 42);
myHashTable.add('fname', 'David');
myHashTable.add('lname', 'Slaugh');
// myHashTable.print();
console.log(myHashTable.lookup('id'));
console.log(myHashTable.lookup('fname'));
console.log(myHashTable.lookup('lname'));
myHashTable.remove('fname');
myHashTable.print();