import data from './data/data';
import { SET_TYPE, PersonalityTypes } from "./actions";

const initialState = {
	typeSelected: PersonalityTypes.INTP,
	typeData: data,
};

export default function rootReducer(state, action) {
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case SET_TYPE:
			return Object.assign({}, state, {
				typeSelected: PersonalityTypes[action.personalityType]
			});
		default:
			return state;
	}
}