const ACTIONS = {
	ADD_NAME: 'ADD_NAME',
	REMOVE_NAME: 'REMOVE_NAME',
};

const ActionCreators = {
	addPerson: name => ({ type: ACTIONS.ADD_NAME, name }),
	removePerson: id => ({ type: ACTIONS.REMOVE_NAME, id: parseInt(id, 10) }),
};

// const store = {
// 	state: {
// 		nextId: 0,
// 		people: [],
// 	},
// 	reducer: (state, action) => {
// 		switch (action.type) {
// 			case ACTIONS.ADD_NAME:
// 				return Object.assign({}, state, {
// 					nextId: state.nextId + 1,
// 					people: [
// 						...state.people,
// 						{ id: state.nextId, name: action.name }
// 					]
// 				});
// 			case ACTIONS.REMOVE_NAME:
// 				return Object.assign({}, state, {
// 					people: state.people.filter(person => person.id !== action.id),
// 				});
// 			default:
// 				return state;
// 		}
// 	},
// 	dispatch: (action) => {
// 		store.data = store.reducer(store.data, action);
// 	},
// 	getState: () => store.state,
// };

function createStore(reducer) {
	let state = {
		nextId: 0,
		people: [],
	};

	return {
		dispatch: (action) => {
			state = reducer(state, action);
		},
		getState: () => state,
	};
}

function rootReducer(state, action) {
	switch (action.type) {
		case ACTIONS.ADD_NAME:
			return Object.assign({}, state, {
				nextId: state.nextId + 1,
				people: [
					...state.people,
					{ id: state.nextId, name: action.name },
				],
			});
		case ACTIONS.REMOVE_NAME:
			return Object.assign({}, state, {
				people: state.people.filter(person => person.id !== action.id),
			});
		default:
			return state;
	}
}

const render = (people) => {
	return people.reduce((prev, curr) => {
		return `${prev}<li id="${curr.id}">${curr.name}</li>`;
	}, '');
};

const store = createStore(rootReducer);

const personForm = document.querySelector('#personform');
const input = document.querySelector('#person');
const list = document.querySelector('#people');

personForm.onsubmit = (e) => {
	e.preventDefault();
	if (input.value.trim() === '') {
		return false;
	}
	store.dispatch(ActionCreators.addPerson(input.value));
	list.innerHTML = render(store.getState().people);
	input.value = '';
	input.focus();
};

list.onclick = (e) => {
	const id = e.target.id;
	store.dispatch(ActionCreators.removePerson(id));
	list.innerHTML = render(store.getState().people);
};