const React = require('react');
const PropTypes = require('prop-types');

const Link = ({ active, children, onClick }) => {
	if (active) {
		return <span>{ children }</span>
	}

	return (
		<a
			href=""
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
			{ children }
		</a>
	);
};

Link.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
};

module.exports = Link;
