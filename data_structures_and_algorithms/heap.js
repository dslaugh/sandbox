// A binary heap is a partially ordered binary tree which satisfies the 'heap' property
// It has some similarities to a binary search tree except the order is a little different
// Each node has at most two child nodes
// The heap property indicates a specific relationship between the parent and child nodes.
// A max heap is where all parent nodes are greater than or equal to the child nodes. (Big numbers on top, smaller numbers below)
// A min heap is where all child nodes are greater than or equal to the parent nodes. (Small numbers on top, bigger numbers below)

// left child: i * 2
// right child: 1 * 2 + 1
// parent: i/2

let MinHeap = function() {
	let heap = [null];
};

let MaxHeap = function() {

};