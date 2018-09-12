import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main/Main';
// import Chooser from './components/Chooser/Chooser';
import rootReducer from './reducers';
import { setPersonalityType } from './actions';
import data from './data/data';

const typeData = rootReducer(data, setPersonalityType());
console.log('data', data);
ReactDOM.render(
	<Main typeData={data} />,
	document.getElementById('root')
);