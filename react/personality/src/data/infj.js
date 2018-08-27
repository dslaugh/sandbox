import types from './types';
import standardLabels from './standardLabels';

export default {
	ego: {
		...types.infj,
		...standardLabels.ego,
	},
	subconscious: {
		...types.estp,
		firstLabel: types.estp.first.label,
		secondLabel: types.estp.second.label,
		thirdLabel: types.estp.third.label,
		fourthLabel: types.estp.fourth.label,
	},
	unconscious: {
		...types.enfp,
		...standardLabels.unconscious,
	},
	superego: {
		...types.istj,
		firstLabel: types.istj.first.label,
		secondLabel: types.istj.second.label,
		thirdLabel: types.istj.third.label,
		fourthLabel: types.istj.fourth.label,
	},
};
