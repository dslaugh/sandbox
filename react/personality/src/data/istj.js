import types from './types';
import standardLabels from './standardLabels';

export default {
	ego: {
		...types.istj,
		...standardLabels.ego,
	},
	subconscious: {
		...types.enfp,
		firstLabel: types.enfp.first.label,
		secondLabel: types.enfp.second.label,
		thirdLabel: types.enfp.third.label,
		fourthLabel: types.enfp.fourth.label,
	},
	unconscious: {
		...types.estp,
		...standardLabels.unconscious,
	},
	superego: {
		...types.infj,
		firstLabel: types.infj.first.label,
		secondLabel: types.infj.second.label,
		thirdLabel: types.infj.third.label,
		fourthLabel: types.infj.fourth.label,
	},
};
