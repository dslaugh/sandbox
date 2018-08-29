const React = require('react');
const PropTypes = require('prop-types');
const Todo = require('./Todo');

const TodoList = ( {todos, onTodoClick }) => (
	<ul>
		{todos.map((todo, index) => (
			<Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
		))}
	</ul>
);

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired,
		}).isRequired,
	).isRequired,
	onTodoClick: PropTypes.func.isRequired,
};

module.exports = TodoList;
