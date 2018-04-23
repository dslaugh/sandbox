// https://www.youtube.com/watch?v=QOnUcU8U_XE

// A generator is just syntactic sugar to easily create an iterator.
// Calling a generator function does not run it, it gives you an iterator

const makeDragon = require('../iterators/make-dragon');

function* someDragons () {
	yield 'fluffykins some dragon';
	yield 'mark the fine dragon';
	if (Math.random() > 0.5) {
		return undefined;
	}
	yield 'hardy the dog';
}

const iterator = someDragons();
console.log('iterator.next()', iterator.next());
console.log('iterator.next()', iterator.next());
console.log('iterator.next()', iterator.next());
console.log('iterator.next()', iterator.next());
console.log('iterator.next()', iterator.next());
console.log('iterator.next()', iterator.next());
console.log('iterator.next()', iterator.next());
console.log('iterator.next()', iterator.next());


// function* someDragons () {
// 	while(true) {
// 		const enoughDragonsSpawned = Math.random() > 0.75;
// 		if (enoughDragonsSpawned) {
// 			return;
// 		}
//
// 		yield makeDragon();
// 	}
// }
//
// const dragonArmy = {
// 	[Symbol.iterator]: someDragons,
// 	[Symbol.iterator]: () => {
// 		return {
// 			next: () => {
// 				const enoughDragonsSpawned = Math.random() > 0.75;
// 				if (!enoughDragonsSpawned) {
// 					return {
// 						value: makeDragon(),
// 						done: false,
// 					};
// 				}
//
// 				return { done: true };
// 			}
// 		}
// 	}
// };
//
//
// for (const dragon of dragonArmy) {
// 	console.log('dragon from dragonArmy', dragon);
// }