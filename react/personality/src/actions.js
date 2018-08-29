export const SET_TYPE = 'SET_TYPE';
export const PersonalityTypes = {
	ESTJ: 'ESTJ',
	ESTP: 'ESTP',
	ENTJ: 'ENTJ',
	ENFJ: 'ENFJ',
	ESFJ: 'ESFJ',
	ESFP: 'ESFP',
	ENTP: 'ENTP',
	ENFP: 'ENFP',
	ISTJ: 'ISTJ',
	ISTP: 'ISTP',
	INTJ: 'INTJ',
	INFJ: 'INFJ',
	ISFJ: 'ISFJ',
	ISFP: 'ISFP',
	INTP: 'INTP',
	INFP: 'INFP',
};

export function setPersonalityType(personalityType = PersonalityTypes.INTP) {
	return { type: SET_TYPE, personalityType };
}
