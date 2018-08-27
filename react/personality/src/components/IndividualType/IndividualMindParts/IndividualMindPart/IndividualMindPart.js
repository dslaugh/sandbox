import React from 'react';
import './IndividualMindPart.css';

export default class IndividualMindPart extends React.Component {
	render() {
		const borderClass = `individual-mind-part ${ this.props.borderClass }`;
		return (
			<div className={ borderClass } >
				<div></div>
				<h3 className="individual-mind-part-name">{ this.props.partType } - { this.props.partData.initials } - { this.props.partData.typeName }</h3>
				<div className="individual-cognitive-function">
					<div className="individual-cognitive-function-label">{ this.props.partData.firstLabel }</div>
					<div className="individual-cognitive-function-initial">{ this.props.partData.first.initials }</div>
				</div>
				<div className="individual-cognitive-function">
					<div className="individual-cognitive-function-label">{ this.props.partData.secondLabel }</div>
					<div className="individual-cognitive-function-initial">{ this.props.partData.second.initials }</div>
				</div>
				<div className="individual-cognitive-function">
					<div className="individual-cognitive-function-label">{ this.props.partData.thirdLabel }</div>
					<div className="individual-cognitive-function-initial">{ this.props.partData.third.initials }</div>
				</div>
				<div className="individual-cognitive-function">
					<div className="individual-cognitive-function-label">{ this.props.partData.fourthLabel }</div>
					<div className="individual-cognitive-function-initial">{ this.props.partData.fourth.initials }</div>
				</div>
			</div>
		);
	}
}