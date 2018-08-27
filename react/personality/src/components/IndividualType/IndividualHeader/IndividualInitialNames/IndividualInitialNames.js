import React from 'react';
import './IndividualInitialNames.css';

export default class IndividualInitialNames extends React.Component {
	renderInitialNames(initials) {
		const names = {
			'E': 'Extraverted',
			'I': 'Introverted',
			'N': 'Intuitive',
			'S': 'Sensing',
			'T': 'Thinking',
			'F': 'Feeling',
			'J': 'Judging',
			'P': 'Perceiving',
		};

		return this.props.initials.split('').map((i) => {
			const initial = i.toUpperCase();
			return <div key={ initial } className="initial-name">{ names[initial] }</div>
		});
	}

	render() {
		return (
			<div className="individual-initial-names-container">{ this.renderInitialNames() }</div>
		);
	}
}