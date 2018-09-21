const thunkMiddleware = require('redux-thunk').default;
const { createLogger } = require('redux-logger');
const { createStore, applyMiddleware } = require('redux');
const { selectSubreddit, fetchPostsIfNeeded } = require('./actions');
const rootReducer = require('./reducers');

const loggerMiddleware = createLogger();

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware
	)
);

const sr = 'gundeals';
store.dispatch(selectSubreddit(sr));
store.dispatch(fetchPostsIfNeeded(sr))
	.then(() => {
		const data = store.getState();
		const titles = data.postsBySubreddit[sr].items.map(s => s.title).filter(t => /\s/i.test(t));
		// const keys = Object.keys(data.postsBySubreddit[sr].items[0]);
		console.log(titles);
	});