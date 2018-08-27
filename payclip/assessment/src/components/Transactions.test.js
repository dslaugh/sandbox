import React from 'react';
import renderer from 'react-test-renderer';
import Transactions from './Transactions';

const processed_transactions = [
	{ amount: 1345.98, date: '22-06-2017T10:33', card_last_four: '0059', formatted_date: '2017-06-22T10:33', formatted_amount: '1345.98' },
	{ amount: 7774.32, date: '17-07-2017T03:34', card_last_four: '6051', formatted_date: '2017-07-17T03:34', formatted_amount: '7774.32' },
	{ amount: 95.99, date: '23-11-2017T14:34', card_last_four: '3011', formatted_date: '2017-11-23T14:34', formatted_amount: '95.99' },
	{ amount: 0.45, date: '01-12-2017T9:36', card_last_four: '4434', formatted_date: '2017-12-01T09:36', formatted_amount: '0.45' },
	{ amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912', formatted_date: '2018-01-15T21:34', formatted_amount: '1111.11' },
	{ amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544', formatted_date: '2018-01-27T12:34', formatted_amount: '112.98' },
	{ amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444', formatted_date: '2018-01-27T12:34', formatted_amount: '2850.70' },
	{ amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488', formatted_date: '2018-02-01T02:34', formatted_amount: '4.69' },
	{ amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110', formatted_date: '2018-02-10T02:34', formatted_amount: '45.00' },
	{ amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669', formatted_date: '2018-02-17T18:34', formatted_amount: '1.00' }
];

describe('<Transactions />', () => {
	it('should render correctly', () => {
		const component = renderer.create(
			<Transactions transactions={ processed_transactions } />
		);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});