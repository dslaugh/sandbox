var express = require('express');
var engines = require('consolidate');
var app = express();

app.engine('html', engines.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname+'/views')

app.get('/', function(req, res) {
	res.render('index', {name: 'David'});
});


app.listen(8000, function() {
	console.log('Server running on port 8000');
});
