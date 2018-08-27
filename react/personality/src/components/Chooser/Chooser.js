import React from 'react';
import './Chooser.css';
import TypeLinks from '../TypeLinks/TypeLinks';
import IndividualType from '../IndividualType/IndividualType';


export default class Chooser extends React.Component {
	constructor(props) {
		super(props);
		console.log('Chooser constructor', this.props.typeData['intp']);

		const types = Object.keys(this.props.typeData);

		this.state = {
			displayedType: 'intp',
			displayedTypeData: this.props.typeData['intp'],
		};
	}

	handleClick(type) {
		this.setState({ displayedTypeData: this.props.typeData[type] });
		console.log('type', type);
	}

	render() {
		const types = Object.keys(this.props.typeData);
		console.log('types', types);
		return (
			<div className="chooser-container">
				<TypeLinks types={ types } onClick={ (type) => this.handleClick(type) }/>
				<IndividualType typeData={ this.state.displayedTypeData }/>
			</div>
		)
	}
}