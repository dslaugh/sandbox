import fixDateFormat from "./fixDateFormat";

export default function processTransactions(unprocessed_transactions) {
	return unprocessed_transactions
		.map(transaction => ({
			amount: transaction.amount,
			date: transaction.date,
			card_last_four: transaction.card_last_four,
			formatted_date: fixDateFormat(transaction.date),
			formatted_amount: transaction.amount.toFixed(2),
		}))
		.sort((a, b) => a.formatted_date > b.formatted_date);
}
