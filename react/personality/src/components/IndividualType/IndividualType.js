import React from 'react';
import './IndividualType.css';
import IndividualHeader from './IndividualHeader/IndividualHeader';
import IndividualMindParts from './IndividualMindParts/IndividualMindParts';

// export default class IndividualType extends React.Component {
// 	render() {
// 		return (
// 			<div className="individual-type-container">
// 				<IndividualHeader typeData={ this.props.typeData } />
// 				<IndividualMindParts typeData={ this.props.typeData } />
// 			</div>
// 		);
// 	}
// }

export default function IndividualType(props) {
	return (
		<div className="individual-type-container">
			<IndividualHeader typeData={ props.typeData } />
			<IndividualMindParts typeData={ props.typeData } />
		</div>
	);
}