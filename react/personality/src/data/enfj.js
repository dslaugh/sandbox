import types from './types';
import standardLabels from './standardLabels';

export default {
	ego: {
		...types.enfj,
		...standardLabels.ego,
	},
	subconscious: {
		...types.istp,
		firstLabel: types.istp.first.label,
		secondLabel: types.istp.second.label,
		thirdLabel: types.istp.third.label,
		fourthLabel: types.istp.fourth.label,
	},
	unconscious: {
		...types.infp,
		...standardLabels.unconscious,
	},
	superego: {
		...types.estj,
		firstLabel: types.estj.first.label,
		secondLabel: types.estj.second.label,
		thirdLabel: types.estj.third.label,
		fourthLabel: types.estj.fourth.label,
	},
};
