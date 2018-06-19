const express = require('express');
const exp_handlebars = require('express-handlebars');
const main = require('./js/main');

const app = express();
const PORT = 8000;

app.engine('handlebars', exp_handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	const points = main.getRandomPoints(100);
	const pointsWithTeam = main.addTeamColorToPoints(points);
	res.render('home', { points: pointsWithTeam });
});

app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});