function createStore(reducer, state = {}) {
	return {
		dispatch: (action) => {
			state = reducer(state, action);
		},
		getState: () => state,
	};
}

function rootReducer(state, action) {
	switch (action.type) {
		case 'TEST':
			return Object.assign({}, state, {
				name: action.name,
			});
		default:
			return state;
	}
}

const initState = {
	age: 47,
};

const store = createStore(rootReducer, initState);


const action = {type: 'TEST', name: 'Dave'};

// console.log('Dispatching', action);
// store.dispatch(action);
// console.log('Next state', store.getState());


// function dispatchAndLog(store, action) {
// 	console.log('Dispatching', action);
// 	store.dispatch(action);
// 	console.log('Next state', store.getState());
// }
//
// const action2 = { type: 'TEST2', occupation: 'Software Engineer' };
// dispatchAndLog(store, action2);

// const next = store.dispatch;
// store.dispatch = function dispatchAndLog(action) {
// 	console.log('Dispatching', action);
// 	let result = next(action);
// 	console.log('Next state', store.getState());
// 	return result;
// };
//
// store.dispatch(action);

// function patchStoreToAddLogging(store) {
// 	const next = store.dispatch;
// 	store.dispatch = function dispatchAndLog(action) {
// 		console.log('Dispatching', action);
// 		let result = next(action);
// 		console.log('Next state', store.getState());
// 		return result;
// 	}
// }
//
// const Raven = {
// 	captureException: (err, data) => {
// 		console.log('Raven', data);
// 	}
// };
//
// function patchStoreToAddCrashReporting(store) {
// 	const next = store.dispatch;
// 	store.dispatch = function dispatchAndReportErrors(action) {
// 		try {
// 			return next(action);
// 		} catch (err) {
// 			console.error('Caught an exception!', err);
// 			Raven.captureException(err, {
// 				extra: {
// 					action,
// 					state: store.getState(),
// 				},
// 			});
// 			throw err;
// 		}
// 	}
// }

// patchStoreToAddLogging(store);
// patchStoreToAddCrashReporting(store);
//
// store.dispatch(action);

// function logger(store) {
// 	const next = store.dispatch;
//
// 	return function dispatchAndLog(action) {
// 		console.log('Dispatching', action);
// 		let result = next(action);
// 		console.log('Next state', store.getState());
// 		return result;
// 	}
// }
//
// function logger2(store) {
// 	const next = store.dispatch;
//
// 	return function dispatchAndLog2(action) {
// 		console.log('Dispatching2', action);
// 		let result = next(action);
// 		console.log('Next state2', store.getState());
// 		return result;
// 	}
// }
//
// function applyMiddlewareByMonkeypatching(store, middlewares) {
// 	middlewares = middlewares.slice();
// 	middlewares.reverse();
//
// 	middlewares.forEach((middleware) => {
// 		store.dispatch = middleware(store);
// 	});
// }
//
// applyMiddlewareByMonkeypatching(store, [logger, logger2]);
// store.dispatch(action);


// function logger(store) {
// 	return function wrapDispatchToAddLogging(next) {
// 		return function dispatchAndLog(action) {
// 			console.log('Dispatching 1:', action);
// 			let result = next(action);
// 			console.log('Next state 1:', store.getState());
// 			return result;
// 		}
// 	}
// }
const logger = (store) => (next) => (action) => {
	console.log('Dispatching 1:', action);
	let result = next(action);
	console.log('Next state 1:', store.getState());
	return result;
};

// function logger2(store) {
// 	return function wrapDispatchToAddLogging2(next) {
// 		return function dispatchAndLog2(action) {
// 			console.log('Dispatching2:', action);
// 			let result = next(action);
// 			console.log('Next state2:', store.getState());
// 			return result;
// 		}
// 	}
// }
const logger2 = (store) => (next) => (action) => {
	console.log('Dispatching2:', action);
	let result = next(action);
	console.log('Next state2:', store.getState());
	return result;
};

// Warning! Naive implementation
// That's not Redux implementation
function applyMiddleware(store, middlewares) {
	middlewares = middlewares.slice();
	middlewares.reverse();

	let dispatch = store.dispatch;

	middlewares.forEach((middleware) => {
		dispatch = middleware(store)(dispatch);
	});

	return Object.assign({}, store, { dispatch });
}

const myStore = applyMiddleware(store, [logger, logger2]);
myStore.dispatch(action);