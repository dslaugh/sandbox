// https://www.youtube.com/watch?v=W4brAobC2Hc

// 'for of' is for use with iterators.
// arrays have an iterator and that's why 'for of' knows how to handle it.
// Any object that has an iterator can be handled by 'for of'

// const dragons = [
// 	'cool dragon',
// 	'angry dragon',
// 	'nasty dragon',
// ];
//
// const iterator = dragons[Symbol.iterator]();
// console.log('iterator', iterator);
// console.log('iterator.next()', iterator.next());
// console.log('iterator.next()', iterator.next());
// console.log('iterator.next()', iterator.next());
// console.log('iterator.next()', iterator.next());
// console.log('iterator.next()', iterator.next());
//
// for (const char of dragons[0]) {
// 	console.log('char', char);
// }
//
// for (const dragon of dragons) {
// 	console.log('dragon:', dragon);
// }

const makeDragon = require('./make-dragon');
// console.log('makeDragon', makeDragon());

const dragonArmy = {
	[Symbol.iterator]: () => {
		return {
			next: () => {
				const enoughDragonsSpawned = Math.random() > 0.75;
				if (!enoughDragonsSpawned) {
					return {
						value: makeDragon(),
						done: false,
					};
				}

				return { done: true };
			}
		}
	}
};

for (const dragon of dragonArmy) {
	console.log('dragon from dragonArmy', dragon);
}