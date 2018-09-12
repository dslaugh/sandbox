const { createStore } = require('redux');

const ACTIONS = {
	ADD_NAME: 'ADD_NAME',
	REMOVE_NAME: 'REMOVE_NAME',
};

const reducer = (state, action) => {
	if (typeof state === 'undefined') {
		return {
			nextId: 0,
			people: [],
		};
	}

	switch (action.type) {
		case ACTIONS.ADD_NAME:
			return Object.assign({}, state, {
				nextId: state.nextId + 1,
				people: [
					...state.people,
					{ id: state.nextId, name: action.name }
				]
			});
		case ACTIONS.REMOVE_NAME:
			return Object.assign({}, state, {
				people: state.people.filter(person => person.id !== action.id),
			});
		default:
			return state;
	}
};

const ActionCreators = {
	addPerson: name => ({ type: ACTIONS.ADD_NAME, name }),
	removePerson: id => ({ type: ACTIONS.REMOVE_NAME, id: parseInt(id, 10) }),
};

const store = createStore(reducer);

store.dispatch(ActionCreators.addPerson('Dave'));
console.log(store.getState());
store.dispatch(ActionCreators.addPerson('Steve'));
console.log(store.getState());
store.dispatch(ActionCreators.addPerson('Dave'));
console.log(store.getState());
store.dispatch(ActionCreators.removePerson('2'));
console.log(store.getState());