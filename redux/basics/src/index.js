const React = require('react');
const { render } = require('react-dom');
const { Provider } = require('react-redux');
const { createStore } = require('redux');
const todoApp = require('./reducers');
const App = require('./components/App');
const store = createStore(todoApp);

render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);
