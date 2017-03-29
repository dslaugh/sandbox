const expect = require('chai').expect;
const Account = require('../RefactoredAccount');
const AccountType = require('../RefactoredAccountType');

describe('refactored Account', function() {
	describe('#bankCharge', function() {
		it('should cacluate charge correctly when premium and overdraft is less than 7 days', function() {
			const accountType = new AccountType('premium');
			const account = new Account(accountType, 5);

			const charge = account.bankCharge();

			expect(charge).to.equal(14.5);
		});

		it('should calculate charge correctly when premium and overdraft is greater than 7 days', function() {
			const accountType = new AccountType('premium');
			const account = new Account(accountType, 8);

			const charge = account.bankCharge();

			expect(charge).to.equal(15.35);
		});

		it('should calculate charge correctly when not premium', function() {
			const accountType = new AccountType('regular');
			const account = new Account(accountType, 5);

			const charge = account.bankCharge();

			expect(charge).to.equal(13.25);
		});

	});
});