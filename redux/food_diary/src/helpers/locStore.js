function set(name, data) {
	window.localStorage.setItem(name, JSON.stringify(data));
}
function get(name) {
	return JSON.parse(window.localStorage.getItem(name));

}
function remove(name) {
	window.localStorage.removeItem(name);
}

export default {
	set: set,
	get: get,
	remove: remove,
};