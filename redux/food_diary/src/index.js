import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import PouchDB from 'pouchdb';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { receiveState } from './actions';
import App from './components/App';
import logger from './helpers/logger_middleware';
import pouchDbMiddleware from './helpers/save_to_pouch_middleware';

const db = new PouchDB('food_diary');
window.dave = db;
const saveToPouch = pouchDbMiddleware(db);

const store = createStore(
	rootReducer,
	applyMiddleware(
		logger,
		thunk,
		saveToPouch
	),
);

db.get('food_diary_data')
	.then((doc) => {
		store.dispatch(receiveState(doc));
	})
	.catch((err) => {
		db.put({ _id: 'food_diary_data', items: [], lastId: 0 });
		console.log('There was an error hydrating the store', err);
	});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
