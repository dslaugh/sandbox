// First in, first out

function Queue() {
	const collection = [];
	this.print = function() {
		console.log(collection);
	};

	this.enqueue = function(element) {
		collection.push(element);
	};

	this.dequeue = function() {
		return collection.shift();
	};

	this.front = function() {
		return collection[0];
	};

	this.size = function() {
		return collection.length;
	};

	this.isEmpty = function() {
		return collection.length === 0;
	};
}

const myQueue = new Queue();
myQueue.enqueue('a');
myQueue.enqueue('b');
myQueue.enqueue('c');
myQueue.print();
myQueue.dequeue();
console.log(myQueue.front());
myQueue.print();

function PriorityQueue() {
	const collection = [];
	this.printCollection = function() {
		console.log(collection);
	};

	this.enqueue = function(element) {
		if (this.isEmpty()) {
			collection.push(element);
		} else {
			var added = false;
			for (let i=0; i<collection.length; i++) {
				if (element[1] < collection[i][1]) {
					collection.splice(i, 0, element);
					added = true;
					break;
				}
			}
			if (!added) {
				collection.push(element);
			}
		}
	};

	this.dequeue = function() {
		const value = collection.shift();
		return value[0];
	};

	this.front = function() {
		return collection[0];
	};

	this.size = function() {
		return collection.length;
	};

	this.isEmpty = function() {
		return collection.length === 0;
	};
}

const myPriorityQueue = new PriorityQueue();
myPriorityQueue.enqueue(['Beau Carnes', 2]);
myPriorityQueue.enqueue(['Quincy Larsen', 3]);
myPriorityQueue.enqueue(['David Slaugh', 1]);
myPriorityQueue.enqueue(['Bob Gnarly', 2]);
myPriorityQueue.printCollection();
myPriorityQueue.dequeue();
console.log(myPriorityQueue.front());
myPriorityQueue.printCollection();
