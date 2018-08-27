import types from "./types";
import standardLabels from "./standardLabels";

export default {
	ego: {
		...types.esfp,
		...standardLabels.ego,
	},
	subconscious: {
		...types.intj,
		firstLabel: types.intj.first.label,
		secondLabel: types.intj.second.label,
		thirdLabel: types.intj.third.label,
		fourthLabel: types.intj.fourth.label,
	},
	unconscious: {
		...types.entj,
		...standardLabels.unconscious,
	},
	superego: {
		...types.isfj,
		firstLabel: types.isfj.first.label,
		secondLabel: types.isfj.second.label,
		thirdLabel: types.isfj.third.label,
		fourthLabel: types.isfj.fourth.label,
	},
};
