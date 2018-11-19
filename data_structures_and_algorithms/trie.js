// A trie (pronounced "try") is a special kind of tree that is used to store associative data structures
// Sometimes called a prefix tree
// It saves data in steps.
// Each step is a node in the trie
// Often used to store words
// A dictionary is an example

let Node = function() {
	this.keys = new Map();
	this.end = false;
	this.setEnd = function() {
		this.end = true;
	};
	this.isEnd = function() {
		return this.end;
	}
};

let Trie = function() {
	this.root = new Node();

	this.add = function(input, node = this.root) {
		if (input.length === 0) {
			node.setEnd();
			return;
		} else if (!node.keys.has(input[0])) {
			node.keys.set(input[0], new Node());
			return this.add(input.substr(1), node.keys.get(input[0]));
		} else {
			return this.add(input.substr(1), node.keys.get(input[0]));
		}
	};

	this.isWord = function(word) {
		let node = this.root;

		while(word.length > 1) {
			if (!node.keys.has(word[0])) {
				return false;
			} else {
				node = node.keys.get(word[0]);
				word = word.substr(1);
			}
		}
		return (node.keys.has(word) && node.keys.get(word).isEnd());
	};

	this.print = function() {
		let words = new Array();
		let search = function(node = this.root, string) {
			if (node.keys.size !== 0) {
				for (let letter of node.keys.keys()) {
					search(node.keys.get(letter), string.concat(letter));
				}
				if (node.isEnd()) {
					words.push(string);
				}
			} else {
				string.length > 0 ? words.push(string) : undefined;
				return;
			}
		};
		search(this.root, new String());
		return words.length > 0 ? words : null;
	};
};

const myTrie = new Trie();
myTrie.add('ball');
myTrie.add('bat');
myTrie.add('doll');
myTrie.add('dork');
myTrie.add('do');
myTrie.add('dorm');
myTrie.add('send');
myTrie.add('sense');
console.log(myTrie.isWord('ball') === true, 'ball exists');
console.log(myTrie.isWord('bat') === true, 'bat exists');
console.log(myTrie.isWord('doll') === true, 'doll exists');
console.log(myTrie.isWord('dork') === true, 'dork exists');
console.log(myTrie.isWord('do') === true, 'do exists');
console.log(myTrie.isWord('dorm') === true, 'dorm exists');
console.log(myTrie.isWord('send') === true, 'send exists');
console.log(myTrie.isWord('sense') === true, 'sense exists');

console.log(myTrie.isWord('hello') === false, 'hello does not exist');
console.log(myTrie.isWord('balls') === false, 'balls does not exist');


