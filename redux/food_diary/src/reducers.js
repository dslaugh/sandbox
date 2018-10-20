import { ACTIONS } from './actions';

const initialState = {
	localStorageKey: 'food_diary',
	lastId: 0,
	items: [],
};

export function rootReducer(state, action) {
	if (state === undefined) {
		return initialState;
	}

	switch (action.type) {
		case ACTIONS.ADD_ITEM:
			return Object.assign({}, state, {
				lastId: state.lastId += 1,
				items: [
					...state.items,
					{
						id: state.lastId,
						text: action.text,
						addedAt: action.addedAt,
					},
				],
			});
		case ACTIONS.RECEIVE_STATE:
			return action.state;
		default:
			return state;
	}
}
