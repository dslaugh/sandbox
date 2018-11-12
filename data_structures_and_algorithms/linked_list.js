// Elements are stored in a node
// The node contains two key pieces of information: the info itself, and a reference to the next node.
// Every linked list has a head that points to the first node. It also has the size of the linked list.

function LinkedList() {
	let length = 0;
	let head = null;

	const Node = function(element) {
		this.element = element;
		this.next = null;
	};

	this.print = function() {
		let currentNode = head;
		let index = 0;
		while(currentNode) {
			console.log('Current Node','index', index , currentNode.element);
			currentNode = currentNode.next;
			index++;
		}
	};

	this.size = function() {
		return length;
	};

	this.head = function() {
		return head;
	};

	// Create a function 'add' with one parameter 'element'
	this.add = function(element) {
		// Create variable 'node', initialize it with the result of function Node(element)
		const node = new Node(element);
		// Check to see if the head is null
		if (head === null) {
			// If so set head to the newly created node.
			head = node;
		} else {
			// Otherwise create variable to store the currentNode and initialize it with the head.
			let currentNode = head;
			// Create a while loop with the condition that currentNode.next exists. This will give us the last node
			while(currentNode.next) {
				// Set currentNode to currentNode.next
				currentNode = currentNode.next;
			}
			// Set currentNode's next property to the element
			currentNode.next = node;
		}
		// Increment the length variable
		length++;
	};

	// Create a function 'remove' with one parameter 'element'
	this.remove = function(element) {
		// Check to see if the element is the head
		if (head.element === element) {
			// If so, set head.next = head and return
			head = head.next;
			// Decrement length
			length--;
			return;
		}

		// Create variable to store the currentNode for a while loop, initialize it with head
		let currentNode = head;
		// Create a variable to store the previousNode
		let previousNode;
		// Create a while loop with the condition that currentNode.element !== element
		while(currentNode.element !== element) {
			// In the loop, set previousNode to currentNode
			previousNode = currentNode;
			// Also set currentNode = currentNode.next
			currentNode = currentNode.next;
		}
		// After the loop we should have the correct node.
		// Set previousNode.next to currentNode.next;
		previousNode.next = currentNode.next;
		// Decrement length;
		length--;
	};

	this.isEmpty = function() {
		return length <= 0;
	};

	this.indexOf = function(element) {
		// Create a variable 'index' to act as a counter, initialized with -1
		let index = -1;
		// Create variable to hold currentNode initialize it to head
		let currentNode = head;
		// Create a while loop with the condition that currentNode exists
		while(currentNode) {
			// Increment 'index'
			index++;
			// Check to see if currentNode.element === element
			if (currentNode.element === element) {
				// We found it, return the index;
				return index;
			}
			// Set currentNode to currentNode.next
			currentNode = currentNode.next;
		}
		// If it wasn't in there, return -1
		return -1;
	};

	// Create function 'elementAt' with one parameter 'index'
	this.elementAt = function(index) {
		// Check to see if index is greater than length;
		if (index >= length) {
			return false;
		}
		// Create variable 'count', initialize it with zero
		let count = 0;
		// Create variable currentNode, initialized to head.
		let currentNode = head;
		// Create a while loop with the condition that count < index
		while(count < index) {
			// Set currentNode to currentNode.next
			currentNode = currentNode.next;
			// Increment count
			count++;
		}
		// Return the element
		return currentNode.element;
	};

	// Create function addAt with two parameters, 'index' and 'element'
	this.addAt = function(index, element) {
		// Check to see if index is greater than length and return false if so.
		if (index < 0 || index > length) {
			return false;
		}
		// Create a new node with element
		const newNode = new Node(element);
		// Create variable previousNode, initialized with undefined;
		let previousNode;
		// Create variable currentNode, initialized with head
		let currentNode = head;
		// Create variable currentIndex initialized with zero
		let currentIndex = 0;
		// Check to see if the index is zero
		if (index === 0) {
			// Set currentNode = newNode.next
			newNode.next = currentNode;
			// If so, set head to newNode
			head = newNode;
		} else {
			// Otherwise, create a while loop with the condition that currentIndex < index
			while(currentIndex < index) {
				// Set previousNode to currentNode
				previousNode = currentNode;
				// Set currentNode to currentNode.next
				currentNode = currentNode.next;
				// Increment currentIndex
				currentIndex++;
			}
			// Set newNode.next to currentNode
			newNode.next = currentNode;
			// Set previousNode.next = newNode;
			previousNode.next = newNode;
		}
		// Increment length
		length++;
	};

	this.removeAt = function(index) {
		// Create variable currentIndex, initialize it to zero
		let currentIndex = 0;
		// Create variable currentNode, initialize it to head
		let currentNode = head;
		// Create variable previousNode, don't initialize it.
		let previousNode;

		// Check to see if the index is greater than or equal to the length
		if (index < 0 || index >= length) {
			// If so, return false
			return false;
		}

		// Check to see if the index is zero
		if (index === 0) {
			// If so, set head = currentNode.next
			head = currentNode.next;
		} else {
			// Otherwise, create a while loop with the condition that the currentIndex < index
			while(currentIndex < index) {
				// Set previousNode = currentNode
				previousNode = currentNode;
				// Set currentNode = currentNode.next
				currentNode = currentNode.next;
				// Increment currentIndex
				currentIndex++;
			}
			// Set previousNode.next = currentNode.next
			previousNode.next = currentNode.next;
		}
		// Decrement length
		length--;
		return currentNode.element;
	};
}

// look at the functions again. Especially the last few. I think there might be some issues

const myLL = new LinkedList();
console.log(myLL.head() === null, 'When first initialized head should be null');
console.log(myLL.size() === 0, 'When first initialized size should be 0');

console.log('----- this.add() -----');
myLL.add('one');
console.log(myLL.size() === 1, 'After adding the first element, size should be 1');
console.log(myLL.head() !== null, 'After adding the first element, head should no longer be null');
console.log(myLL.head().element === 'one', 'The the element of head should be "one"');
console.log(myLL.head().next === null, 'The next of head should be null');
myLL.add('two');
console.log(myLL.size() === 2, 'After adding the second element, size should be 2');
console.log(myLL.head().next !== null, 'The next of head should not be null');
console.log(myLL.head().next.element === 'two', 'It should be "two"');

console.log('----- this.remove() -----');
myLL.remove('two');
console.log(myLL.size() === 1, 'After removing the second element, size should be 1');
console.log(myLL.head().next === null, 'Removing the element "two" should leave the next of head null');
myLL.add('two');
console.log(myLL.head().next.element === 'two', '"two" added back');
console.log(myLL.size() === 2, 'size should be 2');
myLL.remove('one');
console.log(myLL.head().element === 'two', 'After removing the first element, it should change the head to "two"');
console.log(myLL.size() === 1, 'size should be 1');

console.log('----- this.indexOf() -----');
myLL.add('three');
myLL.add('four');
console.log(myLL.indexOf('two') === 0, 'indexOf "two" should be 0');
console.log(myLL.indexOf('three') === 1, 'indexOf "three" should be 1');
console.log(myLL.indexOf('four') === 2, 'indexOf "four" should be 2');
console.log(myLL.indexOf('notinthere') === -1, 'indexOf an element not in the list should be -1');

console.log('----- this.elementAt() -----');
console.log(myLL.elementAt(0) === 'two', 'elementAt 0 should be "two"');
console.log(myLL.elementAt(1) === 'three', 'elementAt 1 should be "three"');
console.log(myLL.elementAt(2) === 'four', 'elementAt 2 should be "four"');
console.log(myLL.elementAt(3) === false, 'elementAt an index not in the list should be false');

console.log('----- this.addAt() -----');
myLL.addAt(0, 'one');
console.log(myLL.size() === 4, 'Size should be 4');
console.log(myLL.head().element === 'one', 'Adding an element to index 0 should put it at head');
console.log(myLL.head().next.element === 'two', 'It should put the old head as the next of head');
myLL.addAt(2, 'two and a half');
console.log(myLL.size() === 5, 'Size should be 5');
// console.log(myLL.elementAt(0) === 'one', 'elementAt 0 should be "one"');
// console.log(myLL.elementAt(1) === 'two', 'elementAt 0 should be "two"');
// console.log(myLL.elementAt(2) === 'two and a half', 'elementAt 0 should be "two and a half"');
// console.log(myLL.elementAt(3) === 'three', 'elementAt 1 should be "three"');
// console.log(myLL.elementAt(4) === 'four', 'elementAt 2 should be "four"');
// console.log(myLL.elementAt(5) === false, 'elementAt an index not in the list should be false');
console.log(myLL.head().next.next.element === 'two and a half', 'It should add an element in the correct place');
console.log(myLL.head().next.next.next.element === 'three', 	'It should push the remaining nodes down');
console.log(myLL.addAt(20, 'Twenty') === false, 'Trying to add an element beyond the end of the linked list should return false');
console.log(myLL.addAt(5, 'five') !== false, 'Trying to add an after the last element should not return false');
console.log(myLL.size() === 6, 'Size should be 6');
console.log(myLL.elementAt(5) === 'five', 'The new element at index 5 should be "five"');

console.log('----- this.removeAt() -----');
console.log(myLL.removeAt(6) === false, 'If the index is greater than the length - 1 it should return false');
console.log(myLL.removeAt(0) === 'one', 'It should return the removed element');
console.log(myLL.size() === 5, 'Size should be 5');
console.log(myLL.head().element === 'two', 'If the index is zero, it should set "two" to head');
console.log(myLL.removeAt(1) === 'two and a half', 'It should return the removed element');
console.log(myLL.size() === 4, 'Size should be 4');
console.log(myLL.indexOf('two and a half') === -1, 'indexOf "two and a half" should be -1');
console.log(myLL.elementAt(1) === 'three', 'The element at index 1 should be "three"');
