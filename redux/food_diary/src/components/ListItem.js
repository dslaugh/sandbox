import React from 'react';

const ListItem = ({ item }) => {
	return (
		<li key={item.id}>{ item.text }</li>
	);
};

export default ListItem;
