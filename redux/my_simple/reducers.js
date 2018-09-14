const { ACTION_TYPES } = require('./actions');

// function rootReducer(state, action) {
// 	switch (action.type) {
// 		case ACTION_TYPES.ADD_ITEM:
// 			return Object.assign({}, state, {
// 				nextId: state.nextId + 1,
// 				listItems: [
// 					...state.listItems,
// 					{ id: state.nextId, name: action.name },
// 				],
// 			});
// 		case ACTION_TYPES.REMOVE_ITEM:
// 			return Object.assign({}, state, {
// 				listItems: state.listItems.filter(item => item.id !== action.id),
// 			});
// 		case ACTION_TYPES.ADD_COLOR:
// 			return Object.assign({}, state, {
// 				nextColorId: state.nextColorId + 1,
// 				colors: [
// 					...state.colors,
// 					{ id: state.nextColorId, color: action.color }
// 				]
// 			});
// 		case ACTION_TYPES.REMOVE_COLOR:
// 			return Object.assign({}, state, {
// 				colors: state.colors.filter(color => color.id !== action.id),
// 			});
// 		default:
// 			return state;
// 	}
// }

function listItems(state, action) {
	switch (action.type) {
		case ACTION_TYPES.ADD_ITEM:
			return Object.assign({}, state, {
				nextId: state.nextId + 1,
				items: [
					...state.items,
					{ id: state.nextId, name: action.name },
				],
			});
		case ACTION_TYPES.REMOVE_ITEM:
			return Object.assign({}, state, {
				items: state.items.filter(item => item.id !== action.id),
			});
		default:
			return state;
	}
}

function colors(state, action) {
	switch (action.type) {
		case ACTION_TYPES.ADD_COLOR:
			return Object.assign({}, state, {
				nextId: state.nextId + 1,
				items: [
					...state.items,
					{ id: state.nextId, color: action.color }
				]
			});
		case ACTION_TYPES.REMOVE_COLOR:
			return Object.assign({}, state, {
				items: state.items.filter(color => color.id !== action.id),
			});
		default:
			return state;
	}
}

function rootReducer(state, action) {
	return {
		listItems: listItems(state.listItems, action),
		colors: colors(state.colors, action),
	}
}

module.exports = rootReducer;