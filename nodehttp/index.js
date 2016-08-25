var http = require('http');
var fs = require('fs');

var app = http.createServer(function(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
});

var io = require('socket.io')(app);

app.listen(8000, function() {
	console.log('Server running on port 8000');
});

function mytest(socket) {
	var i = 0;
	setInterval(function() {
		socket.emit('news', {hello: 'world', i: i});
		i += 1;
	}, 1000);
}

io.on('connection', mytest);
