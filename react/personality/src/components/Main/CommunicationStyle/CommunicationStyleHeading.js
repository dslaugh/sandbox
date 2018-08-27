import React from 'react';
import './CommunicationStyleHeading.css';

export default class CommunicationStyleHeading extends React.Component {
	render() {
		return (
			<div className="communication-style-heading">
				<div className="communication-style-name">{ this.props.name }</div>
				<div className="communication-style-aspect">{ this.props.aspect1 }</div>
				<div className="communication-style-aspect">{ this.props.aspect2 }</div>
				<div className="communication-style-aspect">{ this.props.aspect3 }</div>
			</div>
		);
	}
}