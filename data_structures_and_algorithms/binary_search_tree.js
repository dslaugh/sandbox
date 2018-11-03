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

	findMin() {
		let current = this.root;
		while(current.left !== null) {
			current = current.left;
		}
		return current.data;
	}

	findMax() {
		let current = this.root;
		while(current.right !== null) {
			current = current.right;
		}
		return current.data;
	}

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
}

const myBST = new BST();
myBST.add(50);
myBST.add(17);
myBST.add(12);
myBST.add(9);
myBST.add(14);
myBST.add(23);
myBST.add(19);
myBST.add(72);
myBST.add(54);
myBST.add(67);
myBST.add(76);

const num = 12;
console.log(myBST.isPresent(num));
myBST.remove(num);
console.log(myBST.isPresent(num));