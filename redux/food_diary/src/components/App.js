import React from 'react';
import { connect } from 'react-redux';
import InputForm from './InputForm';
import List from './List';
import { sortDesc } from '../helpers/index';

const App = ({ days }) => {
	return (
		<div style={{display: 'flex'}}>
			<InputForm />
			{
				Object.keys(days).sort(sortDesc).map((day) => {
					return (<List key={ day } title={ day } items={ days[day] } />);
				})
			}
		</div>
	);
};

function mapStateToProps(state) {
	const days = state.items.reduce((prev, curr) => {
		const addedDate = curr.addedAt;
		if (!prev[addedDate]) {
			prev[addedDate] = [];
		}
		prev[addedDate].push(curr);
		return prev;
	}, {});

	return { days };
}

export default connect(
	mapStateToProps
)(App);
