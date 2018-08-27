import React from 'react';
import './IndividualHeader.css';
import IndividualInitialNames from './IndividualInitialNames/IndividualInitialNames';
import IndividualNickNames from './IndividualNickNames/IndividualNickNames';
import IndividualInteractionNames from './IndividualInteractionNames/IndividualInteractionNames';

export default class IndividualHeader extends React.Component {
	render() {
		return (
			<div className="individual-header">
				<h1 className="header-initials">{ this.props.typeData.ego.initials }</h1>
				<h2 className="header-name">{ this.props.typeData.ego.typeName }</h2>
				<IndividualInitialNames initials={ this.props.typeData.ego.initials }/>
				<IndividualNickNames
					interactionDescription={ this.props.typeData.ego.interactionStyle.description }
					temperament={ this.props.typeData.ego.temperament }
				/>
				<IndividualInteractionNames interactionStyle={ this.props.typeData.ego.interactionStyle.labels } />
			</div>
		);
	}
}