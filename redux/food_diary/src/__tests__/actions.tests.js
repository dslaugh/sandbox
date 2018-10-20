import {
	ACTIONS,
	addItem,
} from '../actions';

describe('ACTIONS', () => {
	test('ACTIONS constant ADD_ITEM should be "ADD_ITEM"', () => {
		expect(ACTIONS.ADD_ITEM).toBe('ADD_ITEM');
	});
});

describe('Action creators', () => {
	describe('addItem', () => {
		test('It should return the correct action', () => {
			const actual = addItem('Pancakes');
			expect(actual).toEqual({ type: ACTIONS.ADD_ITEM, text: 'Pancakes' });
		});
	});
});