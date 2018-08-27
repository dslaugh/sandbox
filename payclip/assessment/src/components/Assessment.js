import React from "react";
import SearchInput from './SearchInput';
import Transactions from './Transactions';

export default class Assessment extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: this.props.transactions,
			filtered_transactions: this.props.transactions,
		};
	}

	resetFilteredTransactions() {
		this.setState({ filtered_transactions: this.state.transactions });
	}

	searchAlgorithm(transaction, search_value) {
		const escaped_search_value = search_value.replace(/([-()[\]{}+?*.$^|,:#<!\\])/ig, '\\$1');
		const re = new RegExp(escaped_search_value, 'ig');
		const amount_test = re.test(transaction.formatted_amount);
		const date_test = re.test(transaction.formatted_date);
		const card_last_four_test = re.test(transaction.card_last_four);

		return amount_test || date_test || card_last_four_test;
	}

	filterTransactions(transactions, search_value) {
		return transactions.filter(transaction => this.searchAlgorithm(transaction, search_value)) || [];
	}

	handleKeyUp(e) {
		const search_value = e.target.value.trim();

		if (search_value !== '') {
			const filtered_transactions = this.filterTransactions(this.state.transactions, search_value);
			this.setState({ filtered_transactions });
		} else {
			this.resetFilteredTransactions();
		}
	}

	render() {
		return (
			<div className="transactions">
				<h2>Transactions</h2>
				<SearchInput onKeyUp={ (e) => this.handleKeyUp(e) } />
				<Transactions transactions={ this.state.filtered_transactions } />
			</div>
		);
	}
}