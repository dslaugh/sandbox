// http://www.ibm.com/developerworks/library/wa-protoop/
var assert = require('chai').assert;

describe('Inheritance', function() {
	describe('points', function() {
		var point = {x: 0, y: 0};

		it('should have x and y coords that are set to 0', function() {
			assert.equal(point.x, 0);
			assert.equal(point.y, 0);
		});

		var point3d = Object.create(point);
		point3d.z = 0;

		it('should have and x, y, and z that are set to zero', function() {
			assert.equal(point3d.x, 0);
			assert.equal(point3d.y, 0);
			assert.equal(point3d.z, 0);
		});
	});

	describe('football players', function() {
		var footballPlayer = {
			name: '',
			team: '',
			run: function() {
				this.running = true;
			}
		};

		var runningBack = Object.create(footballPlayer);
		runningBack.offensiveTeam = true;

		var dave = Object.create(runningBack);
		dave.name = 'Dave';
		var steve = Object.create(runningBack);

		dave.run();

		it('should', function() {
			assert.ok(dave.running);
			assert.notOk(steve.running);

			assert.equal(dave.name, 'Dave');
			assert.equal(steve.name, '');
		});
	});	
});

describe('Functional inheritance pattern', function() {
	// This is what Douglas Crockford calls the functional inheritance pattern.
	// It is used to provide member privacy.

	var point = function(spec) {
		var that = {};

		that.getX = function() {
			return spec.x;
		};

		that.setX = function(val) {
			spec.x = val;
		};

		that.getY = function() {
			return spec.y;
		};

		that.setY = function(val) {
			spec.y = val;
		};

		return that;
	};

	var point3d = function(spec) {
		var that = point(spec);

		that.getZ = function() {
			return spec.z;
		}

		that.setZ = function(val) {
			spec.z = val;
		}

		return that;
	};

	var p1 = point({x: 1, y: 2});
	var p2 = point({x: 3, y: 4});
	var p3 = point3d({x: 5, y: 6, z: 7});

	it('p1 should have x and y set correctly', function() {
		assert.equal(p1.getX(), 1);
		assert.equal(p1.getY(), 2);
	});

	it('p2 should have x and y set correctly', function() {
		assert.equal(p2.getX(), 3);
		assert.equal(p2.getY(), 4);
	});

	it('p3 should have x, y and z set correctly', function() {
		assert.equal(p3.getX(), 5);
		assert.equal(p3.getY(), 6);
		assert.equal(p3.getZ(), 7);
	});
});
