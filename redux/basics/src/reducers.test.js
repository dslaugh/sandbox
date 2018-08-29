const todoApp = require('./reducers');
const { VisibilityFilters } = require('./actions');

describe('todoApp', () => {
	const initialState = {
		visibilityFilter: VisibilityFilters.SHOW_ALL,
		todos: [],
	};

	test('When given an undefined state, it should return the initialState', () => {
		const testAction = {};
		const actualState = todoApp(undefined, testAction);
		expect(actualState).toEqual(initialState);
	});

	test('SET_VISIBILITY_FILTER', () => {
		const testAction = {
			type: 'SET_VISIBILITY_FILTER',
			filter: VisibilityFilters.SHOW_COMPLETED,
		};

		const expected = {
			visibilityFilter: 'SHOW_COMPLETED',
			todos: [],
		};

		const actual = todoApp(initialState, testAction);
		expect(actual).toEqual(expected);
	});

	test('ADD_TODO', () => {
		const testAction = {
			type: 'ADD_TODO',
			text: 'This is a test todo',
		};
		const expected = {
			visibilityFilter: VisibilityFilters.SHOW_ALL,
			todos: [
				{
					text: 'This is a test todo',
					completed: false,
				},
			],
		};
		const actual = todoApp(initialState, testAction);
		expect(actual).toEqual(expected);
	});

	test('TOGGLE_TODO', () => {
		const state = {
			visibilityFilter: VisibilityFilters.SHOW_ALL,
			todos: [
				{
					text: 'This is a test todo',
					completed: false,
				},
			],
		};
		const testAction = {
			type: 'TOGGLE_TODO',
			index: 0,
		};
		const expected = {
			visibilityFilter: VisibilityFilters.SHOW_ALL,
			todos: [
				{
					text: 'This is a test todo',
					completed: true,
				},
			],
		};

		const actual = todoApp(state, testAction);
		expect(actual).toEqual(expected);

		// Set it back to false;
		const actual2 = todoApp(actual, testAction);
		expect(actual2).toEqual(state);
	});
});
