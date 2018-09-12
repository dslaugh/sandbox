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
				{ this.createTypeBlock(this.props.typeData.ESTJ.ego) }
				{ this.createTypeBlock(this.props.typeData.ESTP.ego) }
				{ this.createTypeBlock(this.props.typeData.ENTJ.ego) }
				{ this.createTypeBlock(this.props.typeData.ENFJ.ego) }
				<CommunicationStyleHeading name="Starter" aspect1="Informative" aspect2="Initiating" aspect3="Movement" />
				{ this.createTypeBlock(this.props.typeData.ESFJ.ego) }
				{ this.createTypeBlock(this.props.typeData.ESFP.ego) }
				{ this.createTypeBlock(this.props.typeData.ENTP.ego) }
				{ this.createTypeBlock(this.props.typeData.ENFP.ego) }
				<CommunicationStyleHeading name="See it through" aspect1="Direct" aspect2="Responding" aspect3="Movement" />
				{ this.createTypeBlock(this.props.typeData.ISTJ.ego) }
				{ this.createTypeBlock(this.props.typeData.ISTP.ego) }
				{ this.createTypeBlock(this.props.typeData.INTJ.ego) }
				{ this.createTypeBlock(this.props.typeData.INFJ.ego) }
				<CommunicationStyleHeading name="Behind the scenes" aspect1="Informative" aspect2="Responding" aspect3="Control" />
				{ this.createTypeBlock(this.props.typeData.ISFJ.ego) }
				{ this.createTypeBlock(this.props.typeData.ISFP.ego) }
				{ this.createTypeBlock(this.props.typeData.INTP.ego) }
				{ this.createTypeBlock(this.props.typeData.INFP.ego) }
			</div>
		);
	}
}