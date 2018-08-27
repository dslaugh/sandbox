import processTransactions from './processTransactions';

const raw_data = [
	{ amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544' },
	{ amount: 0.45, date: '01-12-2017T9:36', card_last_four: '4434' },
	{ amount: 95.99, date: '23-11-2017T14:34', card_last_four: '3011' },
	{ amount: 7774.32, date: '17-07-2017T03:34', card_last_four: '6051' },
	{ amount: 1345.98, date: '22-06-2017T10:33', card_last_four: '0059' },
	{ amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444' },
	{ amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110' },
	{ amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669' },
	{ amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488' },
	{ amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912' }
];

const processed_transactions = processTransactions(raw_data);

describe('processTransactions()', () => {
	it('should add a "formatted_date" and a "formatted_amount" to each transaction', () => {
		const all_have_added_properties = processed_transactions.every((transaction) => {
			return transaction.formatted_date && transaction.formatted_amount;
		});

		expect(all_have_added_properties).toBe(true);
	});

	it('formatted_date should have the format yyyy-mm-ddThh:ss', () => {
		expect(processed_transactions[0].formatted_date).toBe('2017-06-22T10:33');
	});

	it('should left pad hours with a zero if below 10', () => {
		expect(processed_transactions[3].formatted_date).toBe('2017-12-01T09:36');
	});

	it('formatted_amount should retain decimal places', () => {
		expect(processed_transactions[3].formatted_amount).toBe('0.45');
		expect(processed_transactions[6].formatted_amount).toBe('2850.70');
		expect(processed_transactions[8].formatted_amount).toBe('45.00');
	});

	it('should order transactions by date', () => {
		const is_earliest_to_latest = processed_transactions.reduce((prev, next) => {
			if (prev.formatted_date === false) {
				return false;
			}
			if (prev.formatted_date <= next.formatted_date) {
				return next;
			} else {
				return false;
			}
		}, { formatted_date: '0000-00-00T00:01' });

		expect(is_earliest_to_latest).toBeTruthy();
	});

});
