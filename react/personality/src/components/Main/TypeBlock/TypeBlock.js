import React from 'react';
import './TypeBlock.css';
import CognitiveFunctions from './CognitiveFunctions';

export default class TypeBlock extends React.Component {
	render() {
		return (
			<div className="type-block">
				<div className="type-initials">{ this.props.initials }</div>
				<div className="type-name">{ this.props.name }</div>
				<CognitiveFunctions cognitiveFunctions={ this.props.cognitiveFunctions }/>
			</div>

		);
	}
}