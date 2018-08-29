const { connect } = require('react-redux');
const { setVisibilityFilter } = require('../actions');
const Link = require('../components/Link');

const mapStateToProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter));
		},
	};
};

const FilterLink = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Link);

module.exports = FilterLink;
