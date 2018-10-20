import locStore from './helpers/locStore';
import { formattedDate } from './helpers/index';

export const ACTIONS = {
	ADD_ITEM: 'ADD_ITEM',
	SAVE_LIST: 'SAVE_LIST',
	REQUEST_STATE: 'REQUEST_STATE',
	FETCH_STATE: 'FETCH_STATE',
	RECEIVE_STATE: 'RECEIVE_STATE',
};

export function addEntry(text) {
	return (dispatch, getState) => {
		dispatch(addItem(text));
		dispatch(saveList());
	}
}

export function addItem(text) {
	return {
		type: ACTIONS.ADD_ITEM,
		addedAt: formattedDate(Date.now()),
		text
	};
}

export function saveList() {
	return (dispatch, getState) => {
		const key = getState().localStorageKey;
		locStore.set(key, getState());
	};
}

export function requestState(key='food_diary') {
	return { type: ACTIONS.REQUEST_STATE, key };
}

export function fetchState(key='food_diary') {
	const state = locStore.get(key);
	return (dispatch, getState) => {
		dispatch(receiveState(state));
	}
}

export function receiveState(state) {
	return { type: ACTIONS.RECEIVE_STATE, state };
}
