import types from './types';
import standardLabels from './standardLabels';

export default {
	ego: {
		...types.esfj,
		...standardLabels.ego,
	},
	subconscious: {
		...types.intp,
		firstLabel: types.intp.first.label,
		secondLabel: types.intp.second.label,
		thirdLabel: types.intp.third.label,
		fourthLabel: types.intp.fourth.label,
	},
	unconscious: {
		...types.isfp,
		...standardLabels.unconscious,
	},
	superego: {
		...types.entj,
		firstLabel: types.entj.first.label,
		secondLabel: types.entj.second.label,
		thirdLabel: types.entj.third.label,
		fourthLabel: types.entj.fourth.label,
	},
};
