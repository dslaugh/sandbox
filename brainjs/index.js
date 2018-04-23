const express = require('express');
const exp_handlebars = require('express-handlebars');
const brain = require('brain.js');
// const bodyParser = require('body-parser');
// const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });

const PORT = 8000;
const app = express();

app.engine('handlebars', exp_handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('js'));

const net = new brain.NeuralNetwork();
// const trainingData = [
// 	{ input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
// 	{ input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
// 	{ input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
// 	{ input: { r: 1, g: 0.4, b: 0 }, output: { white: 1 } },
// 	{ input: { r: 0.3, g: 0.01, b: 0.3 }, output: { white: 1 } },
// 	{ input: { r: 0.9, g: 0.9, b: 0.1 }, output: { black: 1 } },
// 	{ input: { r: 0.8, g: 0.8, b: 0.8 }, output: { black: 1 } },
// 	{ input: { r: 0.584, g: 0.584, b: 0 }, output: { white: 1 } },
//
// ];
const trainingData = [
	{ input: { r: 0, g: 0, b: 0 }, output: { white: 1 } },
	{ input: { r: 1, g: 1, b: 1 }, output: { black: 1 } },
	{ input: { r: 0.24, g: 0.4, b: 1 }, output: { white: 1 } },
	{ input: { r: 0.20, g: 0.77, b: 1 }, output: { black: 1 } },
	{ input: { r: 0.5, g: 0.5, b: .5 }, output: { white: 1 } },
];
net.train(trainingData);


app.get('/', (req, res) => {
	const bgColor = { r: 0.01, g: 0.8, b: 0.8 };
	const output = net.run(bgColor);
	// console.log('output', output);
	const fgColor = output.black > output.white ? 'black': 'white';

	res.render('home');
});

app.get('/getcolor/:r/:g/:b', (req, res) => {
	const data = {
		r: req.params.r / 255,
		g: req.params.g / 255,
		b: req.params.b / 255,
	};
	// console.log('getcolor route data', data);
	const pred = net.run(data);
	const fgColor = pred.black > pred.white ? 'black' : 'white';
	const retData = Object.assign({}, req.params, { fgColor });
	res.status(200).send(retData);
});

app.get('/newtest', (req, res) => {
	const newnet = new brain.NeuralNetwork();
	const trainData = [
		{ input: {width: 200, height: 100 }, output: {width: 0.5, height: 0.5 }},
		{ input: {width: 200, height: 200 }, output: {width: 1, height: 1 }},
	];
	newnet.train(trainData);

	const innerPred = newnet.run({ width: 400, height: 300 });
	console.log('innerPred', innerPred);
	newnet.train(trainData);

	const outerWidth = 500;
	const outerHeight = 100;

	const innerWidth = outerWidth * innerPred.width;
	const innerHeight = outerHeight * innerPred.height;

	res.render('newtest', { outerWidth, outerHeight, innerWidth, innerHeight });
});


// const trainingData = [
// 	{ input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
// 	{ input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
// 	{ input: { r: 0.5, g: 0.5, b: 1.0 }, output: { black: 1 } },
// ];



// net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
// 	{input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
// 	{input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);






app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});