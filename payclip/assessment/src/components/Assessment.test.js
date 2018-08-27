import React from "react";
import renderer from 'react-test-renderer';
import Assessment from './Assessment';

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

const props = {
	transactions: processed_transactions,
};

describe('Assessment', () => {
	let assessment;
	beforeEach(() => {
		assessment = new Assessment(props);
	});

	it('should render correctly', () => {
		const component = renderer.create(
			<Assessment transactions={ processed_transactions } />
		);
		let tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	describe('#searchAlgorithm', () => {
		it('should return true if the searched for value is in the formatted_amount property', () => {
			const search_value = '45';
			const is_found = assessment.searchAlgorithm(props.transactions[0], search_value);

			expect(is_found).toBe(true);
		});

		it('should return true if the searched for value is in the formatted_date property', () => {
			const search_value = '2017';
			const is_found = assessment.searchAlgorithm(props.transactions[0], search_value);

			expect(is_found).toBe(true);
		});

		it('should return true if the searched for value is in the card_last_four property', () => {
			const search_value = '59';
			const is_found = assessment.searchAlgorithm(props.transactions[0], search_value);

			expect(is_found).toBe(true);
		});

		it('should return false if the searched for value is not in any of the three properties', () => {
			const search_value = 'ZZ';
			const is_found = assessment.searchAlgorithm(props.transactions[0], search_value);

			expect(is_found).toBe(false);
		});

		it('should handle . : - where they appear in search_value', () => {
			const search_value_1 = '45.9';
			const is_found_1 = assessment.searchAlgorithm(props.transactions[0], search_value_1);

			expect(is_found_1).toBe(true);

			const search_value_2 = '06-22T10:33';
			const is_found_2 = assessment.searchAlgorithm(props.transactions[0], search_value_2);

			expect(is_found_2).toBe(true);
		});

		it('should escape regex special characters and not throw an error', () => {
			const search_value = '-()[]{}+?*.$^|,:#<!';
			const testFn = () => {
				assessment.searchAlgorithm(props.transactions[0], search_value);
			};

			expect(testFn).not.toThrow();
		});
	});

	describe('#filterTransactions', () => {
		it('should return all transactions if the search value is blank', () => {
			const expected_transactions = processed_transactions;
			const search_value = '';

			const filtered_transactions = assessment.filterTransactions(props.transactions, search_value);

			expect(filtered_transactions).toEqual(expected_transactions);
		});

		it('should return only the transactions that match search_value', () => {
			const expected_transactions = [
				{ amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912', formatted_date: '2018-01-15T21:34', formatted_amount: '1111.11' },
				{ amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544', formatted_date: '2018-01-27T12:34', formatted_amount: '112.98' },
				{ amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444', formatted_date: '2018-01-27T12:34', formatted_amount: '2850.70' },
				{ amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488', formatted_date: '2018-02-01T02:34', formatted_amount: '4.69' },
				{ amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110', formatted_date: '2018-02-10T02:34', formatted_amount: '45.00' },
				{ amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669', formatted_date: '2018-02-17T18:34', formatted_amount: '1.00' }
			];
			const search_value = '2018';

			const filtered_transactions = assessment.filterTransactions(props.transactions, search_value);

			expect(filtered_transactions).toEqual(expected_transactions);
		});

		it('should return an empty array if there are no search results', () => {
			const expected_transactions = [];
			const search_value = 'XYZ';

			const filtered_transactions = assessment.filterTransactions(props.transactions, search_value);

			expect(filtered_transactions).toEqual(expected_transactions);
		});
	});
});
