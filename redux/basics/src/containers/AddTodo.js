const React = require('react');
const { connect } = require('react-redux');
const { addTodo } = require('../actions');

let AddTodo = ({ dispatch }) => {
	let input;

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault();
					if (!input.value.trim()) {
						return;
					}
					dispatch(addTodo(input.value));
					input.value = '';
				}}
			>
				<input
					ref={node => {
						input = node;
					}}
				/>
				<button	type="submit">
					Add Todo
				</button>
			</form>
		</div>
	);
};

AddTodo = connect()(AddTodo);

module.exports = AddTodo;
