const express = require('express');
const exp_handlebars = require('express-handlebars');
const rootReducer = require('./reducers');
const { addItem, removeItem, addColor, removeColor } = require('./actions');

const PORT = 3000;
const app = express();

function createStore(reducer, state = {}) {
	return {
		dispatch: (action) => {
			state = reducer(state, action);
		},
		getState: () => state,
	};
}
const initialState = {
	listItems: {
		nextId: 0,
		items: [],
	},
	colors: {
		nextId: 0,
		items: [],
	},
};
const store = createStore(rootReducer, initialState);

app.engine('handlebars', exp_handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
	res.render('home', { items: store.getState().listItems.items });
});

app.get('/add/:item', (req, res) => {
	store.dispatch(addItem(req.params.item));
	res.status(200).send(store.getState());
});

app.get('/addColor/:color', (req, res) => {
	store.dispatch(addColor(req.params.color));
	res.status(200).send(store.getState());
});

app.get('/remove/:id', (req, res) => {
	store.dispatch(removeItem(req.params.id));
	res.status(200).send(store.getState());
});

app.get('/removeColor/:id', (req, res) => {
	store.dispatch(removeColor(req.params.id));
	res.status(200).send(store.getState());
});

app.listen(PORT, () => {
	console.log(`Server running at port: ${PORT}`);
});