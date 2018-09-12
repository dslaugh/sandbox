const { ACTION_TYPES } = require('./actions');

function rootReducer(state, action) {
	switch (action.type) {
		case ACTION_TYPES.ADD_ITEM:
			return Object.assign({}, state, {
				nextId: state.nextId + 1,
				listItems: [
					...state.listItems,
					{ id: state.nextId, name: action.name },
				],
			});
		case ACTION_TYPES.REMOVE_ITEM:
			return Object.assign({}, state, {
				listItems: state.listItems.filter(item => item.id !== action.id),
			});
		default:
			return state;
	}
}

module.exports = rootReducer;