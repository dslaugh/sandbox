import React from 'react';
import './IndividualMindParts.css';
import IndividualMindPart from './IndividualMindPart/IndividualMindPart';

export default class IndividualMindParts extends React.Component {
	render() {
		return (
			<div className="individual-mind-parts">
				<IndividualMindPart
					borderClass="individual-mind-part-top-left"
					partData={ this.props.typeData.ego }
					partType="Ego"
				/>
				<IndividualMindPart
					borderClass="individual-mind-part-top-right"
					partData={ this.props.typeData.subconscious }
					partType="Subconscious"
				/>
				<IndividualMindPart
					borderClass="individual-mind-part-bottom-left"
					partData={ this.props.typeData.unconscious }
					partType="Unconscious"
				/>
				<IndividualMindPart
					borderClass="individual-mind-part-bottom-right"
					partData={ this.props.typeData.superego }
					partType="Superego"
				/>
			</div>
		);
	}
}