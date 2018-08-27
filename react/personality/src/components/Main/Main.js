import React from 'react';
import TemperamentHeading from './Temperament/TemperamentHeading';
import CommunicationStyleHeading from './CommunicationStyle/CommunicationStyleHeading';
import TypeBlock from './TypeBlock/TypeBlock';

import './Main.css';

export default class Main extends React.Component {
	createTypeBlock(data) {
		const cogFns = [
			data.first.initials,
			data.second.initials,
			data.third.initials,
			data.fourth.initials,
		];
		return <TypeBlock initials={ data.initials } name={ data.typeName } cognitiveFunctions={ cogFns } />;
	}

	render() {
		return (
			<div className="main-container">
				<div className="empty-block"></div>
				<TemperamentHeading name="Guardian" initials="SJ" />
				<TemperamentHeading name="Artisan" initials="SP" />
				<TemperamentHeading name="Intellectual" initials="NT" />
				<TemperamentHeading name="Idealist" initials="NF" />
				<CommunicationStyleHeading name="Structure/In charge" aspect1="Direct" aspect2="Initiating" aspect3="Control" />
				{ this.createTypeBlock(this.props.typeData.estj.ego) }
				{ this.createTypeBlock(this.props.typeData.estp.ego) }
				{ this.createTypeBlock(this.props.typeData.entj.ego) }
				{ this.createTypeBlock(this.props.typeData.enfj.ego) }
				<CommunicationStyleHeading name="Starter" aspect1="Informative" aspect2="Initiating" aspect3="Movement" />
				{ this.createTypeBlock(this.props.typeData.esfj.ego) }
				{ this.createTypeBlock(this.props.typeData.esfp.ego) }
				{ this.createTypeBlock(this.props.typeData.entp.ego) }
				{ this.createTypeBlock(this.props.typeData.enfp.ego) }
				<CommunicationStyleHeading name="See it through" aspect1="Direct" aspect2="Responding" aspect3="Movement" />
				{ this.createTypeBlock(this.props.typeData.istj.ego) }
				{ this.createTypeBlock(this.props.typeData.istp.ego) }
				{ this.createTypeBlock(this.props.typeData.intj.ego) }
				{ this.createTypeBlock(this.props.typeData.infj.ego) }
				<CommunicationStyleHeading name="Behind the scenes" aspect1="Informative" aspect2="Responding" aspect3="Control" />
				{ this.createTypeBlock(this.props.typeData.isfj.ego) }
				{ this.createTypeBlock(this.props.typeData.isfp.ego) }
				{ this.createTypeBlock(this.props.typeData.intp.ego) }
				{ this.createTypeBlock(this.props.typeData.infp.ego) }
			</div>
		);
	}
}