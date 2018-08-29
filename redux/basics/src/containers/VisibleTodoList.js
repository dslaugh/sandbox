const { connect } = require('react-redux');
const { toggleTodo } = require('../actions');
const TodoList = require('../components/TodoList');

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_COMPLETED':
			return todos.filter(todo => todo.completed);
		case 'SHOW_ACTIVE':
			return todos.filter(todo => !todo.completed);
		case 'SHOW_ALL':
		default:
			return todos;
	}
};

const mapStateToProps = state => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTodoClick: id => {
			dispatch(toggleTodo(id));
		},
	};
};

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);

module.exports = VisibleTodoList;
