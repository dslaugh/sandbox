import React from 'react';
import './TypeLinks.css';

export default class TypeLinks extends React.Component {
	createLink(type) {
		return (
			<div key={ type } className="type-link" onClick={ () => this.props.onClick(type) }>{ type.toUpperCase() }</div>
		);
	}

	render() {
		const typeLinks = Object.keys(this.props.types).map(this.createLink.bind(this));

		return (
			<div className="type-links-container">
				{ typeLinks }
			</div>
		);
	}
}