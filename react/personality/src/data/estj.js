import types from './types';
import standardLabels from './standardLabels';

export default {
	ego: {
		...types.estj,
		...standardLabels.ego,
	},
	subconscious: {
		...types.infp,
		firstLabel: types.infp.first.label,
		secondLabel: types.infp.second.label,
		thirdLabel: types.infp.third.label,
		fourthLabel: types.infp.fourth.label,
	},
	unconscious: {
		...types.istp,
		...standardLabels.unconscious,
	},
	superego: {
		...types.enfj,
		firstLabel: types.enfj.first.label,
		secondLabel: types.enfj.second.label,
		thirdLabel: types.enfj.third.label,
		fourthLabel: types.enfj.fourth.label,
	},
};
