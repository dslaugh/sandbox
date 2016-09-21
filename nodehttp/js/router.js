var url = require('url');

var Router = (function() {
	var routes = {};

	function route(path, fn) {
		routes[path] = fn;
	}

	function runRoute(request, response) {
		var urlInfo = url.parse(request.url);
		// console.log('urlInfo', urlInfo);

		if (routes[urlInfo.pathname]) {
			routes[urlInfo.pathname](request, response);
		} else {
			response.writeHead(404);
			response.end('This page does not exist');
		}
	}

	return {
		route: route,
		runRoute: runRoute
	};
})();

module.exports = Router;