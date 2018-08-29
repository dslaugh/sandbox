import React from 'react';
import './Chooser.css';
import TypeLinks from '../TypeLinks/TypeLinks';
import IndividualType from '../IndividualType/IndividualType';
import { PersonalityTypes, setPersonalityType } from '../../actions';
import rootReducer from '../../reducers';


export default class Chooser extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.data;
	}

	handleClick(type) {
		this.setState(rootReducer(this.state, setPersonalityType(type)));
	}

	render() {
		return (
			<div className="chooser-container">
				<TypeLinks types={ PersonalityTypes } onClick={ (type) => this.handleClick(type) }/>
				<IndividualType typeData={ this.state[this.state.typeSelected] }/>
			</div>
		)
	}
}