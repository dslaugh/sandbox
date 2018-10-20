import React from 'react';
import ListItem from './ListItem';
import './List.css';

const List = ({ items, title } ) => {
	if (items && items.length > 0) {
		return (
			<div className="list">
				<h2>{ title }</h2>
				<ul>
					{ items.map(item => (<ListItem key={ item.id } item={item} />)) }
				</ul>
			</div>
		);
	}
	return (<div>No items found</div>);
};

export default List;
