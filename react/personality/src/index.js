import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main/Main';
// import IndividualType from './components/IndividualType/IndividualType';
// import Chooser from './components/Chooser/Chooser';

import data from './data/data';

ReactDOM.render(
	<Main typeData={ data } />,
	document.getElementById('root')
);