const React = require('react');
const FilterLink = require('../containers/FilterLink');
const { VisibilityFilters } = require('../actions');

const Footer = () => (
	<p>
		Show:
		{' '}
		<FilterLink filter={ VisibilityFilters.SHOW_ALL } >
			All
		</FilterLink>
		<FilterLink filter={ VisibilityFilters.SHOW_ACTIVE } >
			Active
		</FilterLink>
		<FilterLink filter={ VisibilityFilters.SHOW_COMPLETED } >
			Completed
		</FilterLink>
	</p>
);

module.exports = Footer;
