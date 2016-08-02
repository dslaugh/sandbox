// Testing for permissions update for SilverVue
var assert = require('chai').assert;
var _ = require('underscore');

describe('Getting permissions check', function() {
	var rolePermissions = [
	    {
	        _id: 'viewFacility',
	        roles: [
	            {
	                name: 'superUser',
	                checks: [
	                    'isNotRestricted'
	                ]
	            },
	            {
	                name: 'user',
	                checks: [
	                    'isAssignedToFacility'
	                ]
	            },
	            {
	                name: 'hospitalAdmin',
	                checks: [
	                    'isAssignedToFacility'
	                ]
	            },
	            {
	                name: 'caseManager',
	                checks: [
	                    'isAssignedToFacility'
	                ]
	            }
	        ]
	    }
	];

	function consolidateRoleChecks(roles) {
		
	}

	it('Should consolidate checks and roles', function() {
		var expected = [
			{
				roles: ['superUser'], 
				checks: ['isNotRestricted']
			},
			{
				roles: ['user', 'hospitalAdmin', 'caseManager'],
				checks: ['isAssignedToFacility']
			}
		];

		var actual = [];

		assert.deepEqual(actual, expected);
	});


});