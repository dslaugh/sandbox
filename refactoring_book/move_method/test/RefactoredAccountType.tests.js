const expect = require('chai').expect;
const AccountType = require('../RefactoredAccountType');

describe('refactored AccountType', function() {
	describe('#isPremium', function() {
		it('should return true if account type is premium', function() {
			const accountType = new AccountType('premium');
			expect(accountType.isPremium()).to.be.true;
		});

		it('should return false if account type is not premium', function() {
			const accountType = new AccountType('regulart');
			expect(accountType.isPremium()).to.be.false;
		});
	});
})