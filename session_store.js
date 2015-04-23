var sessionStore = (function() {
	function set(name, data) {
		window.sessionStorage.setItem(name, JSON.stringify(data)); 
	}
	function get(name) {
		return JSON.parse(window.sessionStorage.getItem(name));
		
	}
	function remove(name) {
		window.sessionStorage.removeItem(name);
	}
	return {
		set: set,
		get: get,
		remove: remove
	};
})();