import React from 'react';
import './IndividualInteractionNames.css';

export default class IndividualInteractionNames extends React.Component {
	render() {
		return (
			<div className="individual-interaction-names">
				<div>{ this.props.interactionStyle[0] }</div>
				<div>{ this.props.interactionStyle[1] }</div>
				<div>{ this.props.interactionStyle[2] }</div>
			</div>
		);
	}
}