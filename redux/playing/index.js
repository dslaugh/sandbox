const ACTIONS = {
	ADD_NAME: 'ADD_NAME',
	REMOVE_NAME: 'REMOVE_NAME',
};
const ActionCreators = {
	addPerson: name => ({ type: ACTIONS.ADD_NAME, name }),
	removePerson: id => ({ type: ACTIONS.REMOVE_NAME, id: parseInt(id, 10) }),
	testAsync,
	getRedditData,
};

function asyncFn(name) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(name)
		}, 1000);
	})
};

function testAsync(name) {
	return (dispatch, getStore) => {
		return asyncFn(name)
			.then((asyncName) => {
				dispatch(ActionCreators.addPerson(asyncName));
			});
	};
};

function getRedditData(subreddit) {
	return function fetchRedditData(dispatch, getStore) {
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
			.then(response => response.json())
			.then((data) => {
				data.data.children.forEach((child) => {
					dispatch(ActionCreators.addPerson(highlight('cpr', child.data.title)));
				});
			});
	};
}


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
// Monkey patch to accept thunks
// const next = store.dispatch;
// store.dispatch = (action) => {
// 	if (typeof action === 'function') {
// 		return action(store.dispatch, store.getState);
// 	}
// 	return next(action);
// };
// Monkey patch function
// function monkeyPatchDispatch(store) {
// 	const next = store.dispatch;
// 	store.dispatch = (action) => {
// 		if (typeof action === 'function') {
// 			return action(store.dispatch, store.getState);
// 		}
// 		return next(action);
// 	};
// }
// monkeyPatchDispatch(store);

// const thunk = (store) => {
// 	const next = store.dispatch;
//
// 	return (action) => {
// 		if (typeof action === 'function') {
// 			return action(store.dispatch, store.getState);
// 		}
// 		return next(action);
// 	};
// };
//
// const logger = (store) => {
// 	const next = store.dispatch;
//
// 	return (action) => {
// 		console.log('Dispatching:', action);
// 		return Promise.resolve(next(action));
// 		console.log('Next state:', store.getState());
//
// 	middlewares.forEach((middleware) => {
// 		store.dispatch = middleware(store);
// 	});
// }
// applyMiddlewareByMonkeypatching(store, [logger, thunk]);

// 	};
// };
//
// function applyMiddlewareByMonkeypatching(store, middlewares) {
// 	middlewares = middlewares.slice();
// 	middlewares.reverse();
const thunk = (store) => {
	return (next) => {
		return (action) => {
			if (typeof action === 'function') {
				return action(store.dispatch, store.getState);
			}
			return next(action);
		};
	};
};

const logger = (store) => {
	return (next) => {
		return (action) => {
			console.log('Dispatching:', action);
			return Promise.resolve(next(action));
			console.log('Next state:', store.getState());

		};
	};
};

function applyMiddleware(store, middlewares) {
	middlewares = middlewares.slice();
	middlewares.reverse();
	let dispatch = store.dispatch;
	middlewares.forEach((middleware) => {
		dispatch = middleware(store)(dispatch);
	});

	return Object.assign({}, store, { dispatch });
}
const myStore = applyMiddleware(store, [logger, thunk]);


const personForm = document.querySelector('#personform');
const input = document.querySelector('#person');
const list = document.querySelector('#people');

function highlight(pattern, title) {
	const re = new RegExp(pattern, 'i');

	function _doHighlight(re, title) {
		const x = title.match(re);
		if (!x) {
			return title;
		}

		const firstPart = title.substring(0, x.index);
		const highlightPart = `<span style="background-color:yellow;">${title.substring(x.index, x.index + pattern.length)}</span>`;
		const lastPart = title.substring(x.index + pattern.length);

		return [firstPart, highlightPart, lastPart].join('');
	}

	if (arguments.length === 2) {
		return _doHighlight(re, title);
	}
	return (t) => {
		return _doHighlight(re, t);
	}

}

personForm.onsubmit = (e) => {
	e.preventDefault();
	if (input.value.trim() === '') {
		return false;
	}

	myStore.dispatch(ActionCreators.getRedditData('gundeals'))
		.then(() => {
			list.innerHTML = render(myStore.getState().people);
			input.value = '';
			input.focus();
		});

	// myStore.dispatch(ActionCreators.getRedditData('gundeals'))
	// 	.then((data) => {
	// 		console.log(data);
	// 		data.children.data.forEach((child) => {
	// 			myStore.dispatch()
	// 		});
	// 		const titles = data.children.reduce((prev, child) => {
	// 			const highlightedTitle = highlight(child.data.title);
	// 			return `${prev}<li>${highlightedTitle}</li>`;
	// 		}, '');
	// 		list.innerHTML = titles;
	// 		input.value = '';
	// 		input.focus();
	// 	});

	// myStore.dispatch(ActionCreators.testAsync(input.value))
	// 	.then(() => {
	// 		list.innerHTML = render(myStore.getState().people);
	// 		input.value = '';
	// 		input.focus();
	// 	});
};

list.onclick = (e) => {
	const id = e.target.id;
	if (id) {
		store.dispatch(ActionCreators.removePerson(id));
		list.innerHTML = render(myStore.getState().people);
	}
};