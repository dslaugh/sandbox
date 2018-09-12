const ACTION_TYPES = {
	ADD_ITEM: 'ADD_ITEM',
	REMOVE_ITEM: 'REMOVE_ITEM',
};

function addItem(name) {
	return { type: ACTION_TYPES.ADD_ITEM, name };
}

function removeItem(id) {
	return { type: ACTION_TYPES.REMOVE_ITEM, id: parseInt(id, 10) };
}

module.exports = {
	ACTION_TYPES,
	addItem,
	removeItem,
};