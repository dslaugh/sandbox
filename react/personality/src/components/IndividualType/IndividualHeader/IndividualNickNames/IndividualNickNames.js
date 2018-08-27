import React from 'react';
import './IndividualNickNames.css';

export default class IndividualNickNames extends React.Component {
	render() {
		return (
			<div className="individual-nicknames">
				<div className="individual-nickname">{ this.props.interactionDescription }</div>
				<div className="individual-nickname">{ this.props.temperament }</div>
			</div>
		);

	}
}