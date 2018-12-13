// The root node is at the top
// Leaf nodes are nodes at the end of a tree that don't have any children.
// In a binary search tree, each node can only have two branches.
// Binary search trees are ordered. Each subtree is equal to or less than the parent node.
// Each right tree is greater than or equal to the parent node

class Node {
	constructor(data, left=null, right=null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class BST {
	constructor() {
		this.root = null;
	}

	add(data) {
		const node = this.root;
		if (node === null) {
			this.root = new Node(data);
			return;
		} else {
			const searchTree = function(node) {
				if (data < node.data) {
					if (node.left === null) {
						node.left = new Node(data);
						return;
					} else if (node.left !== null) {
						return searchTree(node.left);
					}
				} else if (data > node.data) {
					if (node.right === null) {
						node.right = new Node(data);
					} else if (node.right !== null) {
						return searchTree(node.right)
					}
				} else {
					return null;
				}
			};
			return searchTree(node);
		}
	}

	// The smallest value will always be the left most leaf
	findMin() {
		let current = this.root;
		while(current.left !== null) {
			current = current.left;
		}
		return current.data;
	}

	// The largest value will always be the right most leaf
	findMax() {
		let current = this.root;
		while(current.right !== null) {
			current = current.right;
		}
		return current.data;
	}

	// The algorithm is basically:
	// Check to see if the search value is equal to, less than or greater than the root node's data property.
	// If it's less than, go left.
	// If it's greater than, go right.
	// If it's equal, you found it, return the node.
	find(data) {
		let current = this.root;

		while(current.data !== data) {
			if (data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
			if (current === null) {
				return null;
			}
		}
		return current;
	}

	isPresent(data) {
		let current = this.root;

		while(current) {
			if (data === current.data) {
				return true;
			}
			if (data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return false;
	}

	remove(data) {
		const removeNode = function(node, data) {
			if (node === null) {
				return null;
			}
			if (data === node.data) {
				// Node has no children
				if (node.left === null && node.right === null) {
					return null;
				}
				// Node has no left child
				if (node.left === null) {
					return node.right;
				}
				// Node has no right child
				if (node.right === null) {
					return node.left;
				}
				// Node has two children
				// Algorithm: Go one to the right then all the way to the leaf to the left
				// This will be the node you'll need to replace with.
				let tempNode = node.right;
				while(tempNode.left !== null) {
					tempNode = tempNode.left;
				}
				node.data = tempNode.data;
				node.right = removeNode(node.right, tempNode.data);
				return node;
			} else if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else {
				node.right = removeNode(node.right, data);
				return node;
			}
		};

		this.root = removeNode(this.root, data);
	}

	isBalanced() {
		return this.findMinHeight() >= this.findMaxHeight() - 1;
	}

	findMinHeight(node = this.root) {
		if (node === null) {
			return -1;
		}
		let left = this.findMinHeight(node.left);
		let right = this.findMinHeight(node.right);
		if (left < right) {
			return left + 1;
		} else {
			return right + 1;
		}
	}

	findMaxHeight(node = this.root) {
		if (node === null) {
			return -1;
		}
		let left = this.findMaxHeight(node.left);
		let right = this.findMaxHeight(node.right);
		if (left > right) {
			return left + 1;
		} else {
			return right + 1;
		}
	}

	// Traverses the tree in order from lowest to highest
	inOrder() {
		// check to see if this.root is null and return null if so.
		if (this.root === null) {
			return null;
		} else {
			// otherwise,
			// create a variable "result", of type array, initialized as an empty array
			const result = [];
			// create a recursive function "traverseInOrder" with one parameter "node"
			function traverseInOrder(node) {
				// check to see if node.left is not null.
				if (node.left !== null) {
					// if so, recurse with node.left
					traverseInOrder(node.left);
				}
				// push node.data onto result array
				result.push(node.data);
				// check to see if node.right is not null
				if (node.right !== null) {
					// if so, recurse with node.right
					traverseInOrder(node.right);
				}
			}
			// call the recursive function passing this.root to it.
			traverseInOrder(this.root);
			// return the result array
			return result;
		}
	}

	// Explores the root nodes before the leaves
	preOrder() {
		// check to see if this.root is null and return null if so.
		if (this.root === null) {
			return null;
		}

		// otherwise,
		// create a variable "result", of type array, initialized as an empty array
		const result = [];
		// create a recursive function "traverseInOrder" with one parameter "node"
		function traverseInOrder(node) {
			// push node.data onto result array
			result.push(node.data);
			// check to see if node.left is not null (see if it exists)
			if (node.left) {
				// if so, recurse with node.left
				traverseInOrder(node.left);
			}
			// check to see if node.right is not null (see if it exists)
			if (node.right) {
				// if so, recurse with node.right
				traverseInOrder(node.right);
			}

		}
		// call the recursive function passing this.root to it.
		traverseInOrder(this.root);
		// return the result array
		return result;
	}

	// Explores the leaf nodes before the roots
	postOrder() {
		// check to see if this.root is null and return null if so.
		if (this.root === null) {
			return null;
		}
		// otherwise,
		// create a variable "result", of type array, initialized as an empty array
		const result = [];
		// create a recursive function "traverseInOrder" with one parameter "node"
		function traverseInOrder(node) {
			// check to see if node.left is not null (see if it exists)
			if (node.left) {
				// if so, recurse with node.left
				traverseInOrder(node.left);
			}
			// check to see if node.right is not null (see if it exists)
			if (node.right) {
				// if so, recurse with node.right
				traverseInOrder(node.right);
			}
			// push node.data onto result array
			result.push(node.data);
		}
		// call the recursive function passing this.root to it.
		traverseInOrder(this.root);
		// return the result array
		return result;
	}

	// Breadth first search. Explores by level
	levelOrder() {
		// If the root node is null, return null
		if (this.root === null) { return null; }
		// Otherwise, create variable "result" and initialize it as an empty array
		const result = [];
		// create variable "Q" and initialize it as an empty array
		const Q = [];
		// add the root node to the queue.
		Q.push(this.root);
		// create a loop with the condition that it runs until the queue is empty
		while (Q.length > 0) {
			// deque the first item and add it to the result array
			let node = Q.shift();
			result.push(node.data);
			// if node.left exists, add it to the queue
			if (node.left) {
				Q.push(node.left);
			}
			// if node.right exists, add it to the queue
			if (node.right) {
				Q.push(node.right);
			}
		}
		// return "result" array
		return result;
	}
	// This revolves around a queue.
	// You start out by putting the root node into the queue so that it isn't empty for our while loop.
	// You then create a while loop with a condition of (Q.length > 0). It will run until the queue is empty.
	// Inside the loop, you dequeue (Q.shift()) to get the first node in the queue.
	// You then put the data of the node into a "result" array.
	// You then check if the node has a 'left' and if so, you add it to the queue.
	// You then check if the node has a 'right' and if so, you add it to the queue.
	// The while loop runs, going through each item in the queue and adding 'lefts' and 'rights'
	// and putting the data into the results array until the queue is empty.

}

// const myBST = new BST();
// myBST.add(50);
// myBST.add(17);
// myBST.add(12);
// myBST.add(9);
// myBST.add(14);
// myBST.add(23);
// myBST.add(19);
// myBST.add(72);
// myBST.add(54);
// myBST.add(67);
// myBST.add(76);

// console.log(myBST.root.right.right);
// const num = 50;
// console.log(myBST.isPresent(num));
// myBST.remove(num);
// console.log(myBST.isPresent(num));


/*
 *  Traversal and Height
 */
// The height refers to the distance between the root node and any given leaf node.
// For the tree to be balanced, the min height and the max height should be a difference of no more than one.


const bst = new BST();
bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);

// console.log(bst.root.right.right);

// console.log(bst.findMinHeight());
// console.log(bst.findMaxHeight());
// console.log(bst.isBalanced());
bst.add(10);
// console.log(bst.findMinHeight());
// console.log(bst.findMaxHeight());
// console.log(bst.isBalanced());
console.log(bst.inOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.levelOrder());