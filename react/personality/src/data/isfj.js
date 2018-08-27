import types from './types';
import standardLabels from './standardLabels';

export default {
	ego: {
		...types.isfj,
		...standardLabels.ego,
	},
	subconscious: {
		...types.entp,
		firstLabel: types.entp.first.label,
		secondLabel: types.entp.second.label,
		thirdLabel: types.entp.third.label,
		fourthLabel: types.entp.fourth.label,
	},
	unconscious: {
		...types.esfp,
		...standardLabels.unconscious,
	},
	superego: {
		...types.intj,
		firstLabel: types.intj.first.label,
		secondLabel: types.intj.second.label,
		thirdLabel: types.intj.third.label,
		fourthLabel: types.intj.fourth.label,
	},
};
