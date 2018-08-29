const {
	ADD_TODO,
	TOGGLE_TODO,
	SET_VISIBILITY_FILTER,
	VisibilityFilters,
	addTodo,
	toggleTodo,
	setVisibilityFilter,
} = require('./actions');

describe('actions', () => {
	test('constants', () => {
		expect(ADD_TODO).toBe('ADD_TODO');
		expect(TOGGLE_TODO).toBe('TOGGLE_TODO');
		expect(SET_VISIBILITY_FILTER).toBe('SET_VISIBILITY_FILTER');
		expect(VisibilityFilters.SHOW_ALL).toBe('SHOW_ALL');
		expect(VisibilityFilters.SHOW_COMPLETED).toBe('SHOW_COMPLETED');
		expect(VisibilityFilters.SHOW_ACTIVE).toBe('SHOW_ACTIVE');
	});

	test('addTodo', () => {
		const expected = {
			type: ADD_TODO,
			text: 'This is a test todo',
		};
		const actual = addTodo('This is a test todo');
		expect(actual).toEqual(expected);
	});

	test('toggleTodo', () => {
		const expected = {
			type: TOGGLE_TODO,
			index: 0
		};
		const actual = toggleTodo(0);
		expect(actual).toEqual(expected);
	});

	test('setVisibilityFilter', () => {
		const expected = {
			type: SET_VISIBILITY_FILTER,
			filter: VisibilityFilters.SHOW_COMPLETED,
		};
		const actual = setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
		expect(actual).toEqual(expected);
	});
});