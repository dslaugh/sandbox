// A set cannot have duplicate items

function mySet() {
	// collection will hold the set
	const collection = [];

	// This method will check for the presence of an element and return true or false
	this.has = function(element) {
		return (collection.indexOf(element) !== -1);
	};

	// This method will return all the values in the set
	this.values = function() {
		return collection;
	};

	// This method will add an element to the set
	this.add = function(element) {
		if (!this.has(element)) {
			collection.push(element);
			return true;
		}
		return false;
	};

	// This method will remove an element from a set. (This is called "delete" in ES6)
	this.remove = function(element) {
		if (this.has(element)) {
			const index = collection.indexOf(element);
			collection.splice(index, 1);
			return true;
		}
		return false;
	};

	// This method will return the size of the collection. (This is a property, not a method in ES6)
	this.size = function() {
		return collection.length;
	};

	// This method will return the union of two sets
	this.union = function(otherSet) {
		const unionSet = new mySet();
		const firstSet = this.values();
		const secondSet = otherSet.values();
		firstSet.forEach(function(e) {
			unionSet.add(e);
		});
		secondSet.forEach(function(e) {
			unionSet.add(e);
		});
		return unionSet;
	};

	// This method will return the intersection of two sets as a new set
	this.intersection = function(otherSet) {
		const intersectionSet = new mySet();
		const firstSet = this.values();
		// const secondSet = otherSet.values();
		firstSet.forEach(function(e) {
			if (otherSet.has(e)) {
				intersectionSet.add(e);
			}
		});
		return intersectionSet;
	};

	// This method will return the difference of two sets as a new set
	this.difference = function(otherSet) {
		const differenceSet = new mySet();
		const firstSet = this.values();
		firstSet.forEach(function(e) {
			if (!otherSet.has(e)) {
				differenceSet.add(e);
			}
		});
		return differenceSet;
	};

	// This method will test if the set is a subset of a different set
	this.subset = function(otherSet) {
		const firstSet = this.values();
		return firstSet.every(function(e) {
			return otherSet.has(e);
		});
	}
}

const firstSet = new mySet();
firstSet.add(1);
firstSet.add(2);
firstSet.add(3);
const secondSet = new mySet();
secondSet.add(2);
secondSet.add(3);
console.log(firstSet.union(secondSet).values());
console.log(firstSet.intersection(secondSet).values());
console.log(firstSet.difference(secondSet).values());
console.log(secondSet.subset(firstSet));
