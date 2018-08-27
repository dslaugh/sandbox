import types from "./types";
import standardLabels from "./standardLabels";

export default {
	ego: {
		...types.entp,
		...standardLabels.ego,
	},
	subconscious: {
		...types.isfj,
		firstLabel: types.isfj.first.label,
		secondLabel: types.isfj.second.label,
		thirdLabel: types.isfj.third.label,
		fourthLabel: types.isfj.fourth.label,
	},
	unconscious: {
		...types.intj,
		...standardLabels.unconscious,
	},
	superego: {
		...types.esfp,
		firstLabel: types.esfp.first.label,
		secondLabel: types.esfp.second.label,
		thirdLabel: types.esfp.third.label,
		fourthLabel: types.esfp.fourth.label,
	},
};
