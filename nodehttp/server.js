var http = require('http');
var fs = require('fs');

var test = {
	num: 0,
	intvl: undefined,
	run: function () {
		console.log('run function', this.intvl);
		test.intvl = setInterval(function() {
			console.log('interval tick', this.num);
			this.num += 1;
		}.bind(test), 1000);
	},
	stop: function () {
		console.log('stop funciton', this);
		clearInterval(this.intvl);
	}
};

var app = http.createServer(function(request, response) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if (err) {
			response.writeHead(500);
			return response.end('Error loading index.html');
		}
		response.writeHead(200);
		response.end(data);
	});


	if (request.method === 'GET') {
		var urlParts = request.url.split('?');
		var queryParams;
		if (urlParts[1]) {
			var queryParts;
			queryItems = urlParts[1].split('&');
			queryParams = queryItems.map(function(query) {
				var queryParts = query.split('=');
				var obj = {};
				obj[queryParts[0]] = queryParts[1];
				return obj;
			});
		}

		if (urlParts[0] === '/api/start') {
			test.run();
			response.end('your mom');
		}

		if (urlParts[0] === '/api/stop') {
			test.stop();
			response.end('stop');
		}

		if (urlParts[0] === '/api/getNum') {
			console.log('getting');
			response.end(test.num + ' seconds');
		}
		console.log('GET request', urlParts[0]);
	}
});

// var io = require('socket.io')(app);

app.listen(8000, function() {
	console.log('Server running on port 8000');
});

// function mytest(socket) {
// 	var i = 0;
// 	setInterval(function() {
// 		socket.emit('news', {hello: 'world', i: i});
// 		i += 1;
// 	}, 1000);
// }

// io.on('connection', mytest);
