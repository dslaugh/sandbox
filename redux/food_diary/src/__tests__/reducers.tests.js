import { rootReducer } from '../reducers';
import { addItem } from '../actions';

describe('Reducers', () => {
	const initialState = {
		lastId: 0,
		items: [],
	};

	describe('rootReducer', () => {
		test('It should return the initial state if state is not provided', () => {
			const actual = rootReducer(undefined, { type: 'fake' });
			expect(actual).toEqual(initialState);
		});

		test('It should return the same state if the action type is not found', () => {
			const actual = rootReducer({ items: [ { id: 1, text: 'Pancakes' } ] }, { type: 'UNKNOWN' });
			expect(actual).toEqual({ items: [{ id: 1, text: 'Pancakes' } ] });
		});

		test('ADD_ITEM', () => {
			const mockState = {
				lastId: 1,
				items: [
					{ id: 1, text: 'Pancakes' },
				],
			};
			const expected = {
				lastId: 2,
				items: [
					{ id: 1, text: 'Pancakes' },
					{ id: 2, text: 'Bacon' },
				],
			};
			const actual = rootReducer(mockState, addItem('Bacon'));
			expect(actual).toEqual(expected);
		});
	})
});