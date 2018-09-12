const express = require('express');
const exp_handlebars = require('express-handlebars');
const rootReducer = require('./reducers');
const { addItem, removeItem } = require('./actions');

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

const store = createStore(rootReducer, { nextId: 0, listItems: [] });

app.engine('handlebars', exp_handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
	res.render('home', { items: store.getState().listItems });
});

app.get('/add/:item', (req, res) => {
	store.dispatch(addItem(req.params.item));
	res.status(200).send(store.getState());
});

app.get('/remove/:id', (req, res) => {
	store.dispatch(removeItem(req.params.id));
	res.status(200).send(store.getState());
});

app.listen(PORT, () => {
	console.log(`Server running at port: ${PORT}`);
});