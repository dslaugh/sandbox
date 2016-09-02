var http = require('http');
var fs = require('fs');
var Router = require('./js/router');
var test = {
	num: 0,
	intvl: undefined,
	run: function () {
		console.log('run function');
		if (!this.intvl) {
			test.intvl = setInterval(function() {
				console.log('interval tick', this.num);
				this.num += 1;
			}.bind(test), 1000);
		}
	},
	stop: function () {
		console.log('stop function');
		clearInterval(this.intvl);
	}
};

Router.route('/', function(request, response) {
	var htmlfile = __dirname + '/index.html';
	var p = new Promise(function(resolve, reject) {
		fs.readFile(htmlfile, function(err, data) {
			console.log('reading file');
			if (err) {
				console.log('err');
				reject('Error loading index.html');
			} else {
				console.log('resolve');
				resolve(data);
			}
		});
	});

	p.then(function(data) {
		console.log('here');
		response.writeHead(200);
		response.end(data);
	})
	.catch(function(err) {
		response.writeHead(500);
		response.end(err);
	});
});
Router.route('/api/start', function(request, response) {
	test.run();
	response.end('Starting');
});
Router.route('/api/stop', function(request, response) {
	test.stop();
	response.end('Stopped');
});
Router.route('/api/getNum', function(request, response) {
	
	response.end(test.num + ' seconds');
});


var port = 8000;
var app = http.createServer(Router.runRoute);
app.listen(port, function() {
	console.log('Server running on port ' + port);
});

// var io = require('socket.io')(app);

// function mytest(socket) {
// 	socket.emit('news', {hello: 'world'});
// }

// io.on('connection', mytest);
