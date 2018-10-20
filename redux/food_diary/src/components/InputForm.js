import React from 'react';
import { connect } from 'react-redux';
import {
	addEntry,
} from '../actions';

const InputForm = ({ handleSubmit }) => {
	const inputRef = React.createRef();

	return (
		<form onSubmit={ (e) => handleSubmit(e, inputRef) }>
			<div>
				<input type="text" ref={ inputRef } />
			</div>
			<div>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		handleSubmit: (e, inputRef) => {
			e.preventDefault();
			const itemText = inputRef.current.value.trim();

			if (itemText === '') {
				return;
			}

			dispatch(addEntry(itemText));
			inputRef.current.value = '';
			inputRef.current.focus();
		},
	};
};

export default connect(null, mapDispatchToProps)(InputForm);
