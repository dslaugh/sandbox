const ACTION_TYPES = {
	ADD_ITEM: 'ADD_ITEM',
	REMOVE_ITEM: 'REMOVE_ITEM',
	ADD_COLOR: 'ADD_COLOR',
	REMOVE_COLOR: 'REMOVE_COLOR',
};

function addItem(name) {
	return { type: ACTION_TYPES.ADD_ITEM, name };
}

function removeItem(id) {
	return { type: ACTION_TYPES.REMOVE_ITEM, id: parseInt(id, 10) };
}

function addColor(color) {
	return { type: ACTION_TYPES.ADD_COLOR, color };
}

function removeColor(id) {
	return { type: ACTION_TYPES.REMOVE_COLOR, id: parseInt(id, 10) };
}

module.exports = {
	ACTION_TYPES,
	addItem,
	removeItem,
	addColor,
	removeColor,
};