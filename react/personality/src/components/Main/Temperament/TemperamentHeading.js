import React from 'react';
import './TemperamentHeading.css';

export default class TemperamentHeading extends React.Component {
	render() {
		return (
			<div className="temperament-heading">
				<div className="temperament-name">{ this.props.name }</div>
				<div className="temperament-initials">{ this.props.initials }</div>
			</div>
		);
	}
}