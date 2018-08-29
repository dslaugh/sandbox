const React = require('react');
const Footer = require('./Footer');
const AddTodo = require('../containers/AddTodo');
const VisibleTodoList = require('../containers/VisibleTodoList');

const App = () => (
	<div>
		<AddTodo/>
		<VisibleTodoList/>
		<Footer/>
	</div>
);

module.exports = App;
