const express = require('express');
const passport = require('passport');


const port = process.env.PORT || 30000;
const app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/api/user', (req, res) => {
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
