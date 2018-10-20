export default store => next => action => {
	console.log('Dispatching ', action );
	next(action);
	console.log('Dispatched new state', store.getState());
	return Promise.resolve();
};
