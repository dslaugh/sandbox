if (require) {
	var XMLHttpRequest = require('xhr2');
}

var ajax = (function() {
	function create() {
		return new XMLHttpRequest;
	}

	function get(url, options) {
		if (typeof url !== 'string') {
			throw new TypeError('URL should be a string');
		}

		options = options || {};
		var transport = this.create();

		transport.open('GET', url, true);

		transport.onreadystatechange = function() {
			if (typeof options.success === 'function') {
				if (transport.readyState === 4) {
					requestComplete(transport, options);
				}
			}
		};

		transport.send();
	}

	function requestComplete(transport, options) {
		if (transport.status === 200) {
			options.success(transport);
		}
	}

	return {
		create: create,
		get: get
	};
})();

if (module && module.exports) {
	module.exports = ajax;
}