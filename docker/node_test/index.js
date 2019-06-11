const express = require('express');
const fart = require('./dave/dave');

const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
	const t = fart();
	res.send(t);
});

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
