import React from 'react';
import renderer from 'react-test-renderer';
import SearchInput from './SearchInput';

const mockOnKeyUp = jest.fn();

describe('<SearchInput />', () => {
	it('should render correctly', () => {
		const component = renderer.create(
			<SearchInput onKeyUp={ mockOnKeyUp }/>
		);
		let tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('should call the event handler', () => {
		const component = renderer.create(
			<SearchInput onKeyUp={ mockOnKeyUp }/>
		);
		let tree = component.toJSON();

		const e = { target: { value: '1.00' } };
		tree.props.onKeyUp(e);
		tree = component.toJSON();

		expect(mockOnKeyUp).toHaveBeenCalledWith({ target: { value: '1.00' } });
	});
});