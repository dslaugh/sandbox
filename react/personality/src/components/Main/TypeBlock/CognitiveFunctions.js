import React from 'react';
import './CognitiveFunctions.css';

export default class CognitiveFunctions extends React.Component {

	createInitialBlock(initial, position) {
		let blockClass = 'cognitive-function-block ';

		if (position === 1) {
			blockClass += 'hero-block';
		} else if (position === 2) {
			blockClass += 'parent-block';
		} else if (position === 3) {
			blockClass += 'child-block';
		} else if (position === 4) {
			blockClass += 'inferior-block';
		}

		return <div key={ initial + position } className={ blockClass }>{ initial }</div>;
	}

	render() {
		const block = this.props.cognitiveFunctions.map((i, p) => this.createInitialBlock(i, p + 1));

		return (<div className="cognitive-functions">{ block }</div>);
	}
}