const lexicon = [ 'can', 'you', 'feel', 'the', 'love' ];

const wordsearch = [
	['f', 'e', 'e', 'l', 'x'],
	['b', 'r', 'u', 'o', 'y'],
	['n', 'a', 'q', 'v', 'o'],
	['a', 'r', 'l', 'e', 'y'],
	['c', 'e', 'h', 't', 'z']
];

function searchRight(x, y, reverse=false) {
	const found_words = [];
	const row = reverse ? wordsearch[x].slice().reverse() : wordsearch[x].slice();
	let str = '';
	for (let i=y; i<row.length; i++) {
		str += row[i];
		if (lexicon.includes(str)) {
			found_words.push(str);
		}
	}
	return found_words;
}

function searchDown(x, y, reverse=false) {
	const found_words = [];
	let col = wordsearch.map(row => row[y]);
	if (reverse) {
		col = col.reverse();
	}
	let str = '';
	for (let i=x; i<col.length; i++) {
		str += col[i];
		if (lexicon.includes(str)) {
			found_words.push(str);
		}
	}
	return found_words;
}

function wordSearch() {
	let found_words = [];
	wordsearch.forEach((row, x) => {
		row.forEach((col, y) => {
			const rightResult = searchRight(x, y, false);
			const leftResult = searchRight(x, y, true);
			const downResult = searchDown(x, y, false);
			const upResult = searchDown(x, y, true);
			found_words = found_words.concat(rightResult, leftResult, downResult, upResult);
		});
	});
	return found_words;
}

// Alternative solution
function searchArray(row) {
	const found_words = [];
	const str = row.join('');
	lexicon.forEach((word) => {
		if (str.includes(word)) {
			found_words.push(word);
		}
	});
	return found_words;
}

// function wordSearch2() {
// 	let found_words = [];
// 	wordsearch.forEach((row) => {
// 		const right = searchArray(row);
// 		const left = searchArray(row.slice().reverse());
// 		found_words = found_words.concat(right, left);
// 	});
//
// 	let cols = [];
// 	for (let i=0; i<wordsearch.length; i++) {
// 		let col = [];
// 		for (let j=0; j<wordsearch[i].length; j++) {
// 			col.push(wordsearch[j][i]);
// 		}
// 		cols.push(col);
// 	}
//
// 	cols.forEach((col) => {
// 		const down = searchArray(col);
// 		const up = searchArray(col.reverse());
// 		found_words = found_words.concat(down, up);
// 	});
//
// 	return found_words;
// }

function wordSearch2() {
	let found_words = [];
	wordsearch.forEach((row) => {
		const right = searchArray(row);
		const left = searchArray(row.slice().reverse());
		found_words = found_words.concat(right, left);
	});

	let cols = [];
	for (let i=0; i<wordsearch.length; i++) {
		let col = [];
		for (let j=0; j<wordsearch[i].length; j++) {
			col.push(wordsearch[j][i]);
		}
		cols.push(col);
	}

	cols.forEach((col) => {
		const down = searchArray(col);
		const up = searchArray(col.reverse());
		found_words = found_words.concat(down, up);
	});

	return found_words;
}

// Another alternate solution
function search(y, row) {
	const found_words = [];
	let str = '';
	for (let i=y; i<row.length; i++) {
		str += row[i];
		if (lexicon.includes(str)) {
			found_words.push(str);
		}
	}
	return found_words;
}
// function getCol(x, arr) {
// 	return arr.map((row) => {
// 		return row[x];
// 	});
// }
const getCol = (x, arr) => arr.map(r => r[x]);

function wordSearch3() {
	let found_words = [];
	wordsearch.forEach((row, x) => {
		const rowCopy = Array.prototype.slice.call(row, 0);
		row.forEach((col, y) => {
			const rightResult = search(y, rowCopy);
			const leftResult = search(y, rowCopy.reverse());
			const downResult = search(x, getCol(y, wordsearch));
			const upResult = search(x, getCol(y, wordsearch).reverse());
			found_words = found_words.concat(rightResult, leftResult, downResult, upResult);
		});
	});
	return found_words;
}

const TIMES = 1000;
const PRINT_OUTPUT = false;
console.time('one');
for(let one=0; one < TIMES; one++) {
	const first = wordSearch();
	if (PRINT_OUTPUT) {
		console.log(first);
	}
}
console.timeEnd('one');

console.time('two');
for(let two=0; two < TIMES; two++) {
	const second = wordSearch2();
	if (PRINT_OUTPUT) {
		console.log(second);
	}
}
console.timeEnd('two');

console.time('three');
for(let three=0; three < TIMES; three++) {
	const third = wordSearch3();
	if (PRINT_OUTPUT) {
		console.log(third);
	}
}
console.timeEnd('three');
