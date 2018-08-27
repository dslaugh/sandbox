import types from './types';
import standardLabels from './standardLabels';

export default {
	ego: {
		...types.entj,
		...standardLabels.ego,
	},
	subconscious: {
		...types.isfp,
		firstLabel: types.esfj.first.label,
		secondLabel: types.esfj.second.label,
		thirdLabel: types.esfj.third.label,
		fourthLabel: types.esfj.fourth.label,
	},
	unconscious: {
		...types.intp,
		...standardLabels.unconscious,
	},
	superego: {
		...types.esfj,
		firstLabel: types.isfp.first.label,
		secondLabel: types.isfp.second.label,
		thirdLabel: types.isfp.third.label,
		fourthLabel: types.isfp.fourth.label,
	},
};
