http://www.2ality.com/2012/01/js-inheritance-by-example.html

var assert = require('chai').assert;

describe('Creating objects directly', function() {
	var point = {
		x: 5,
		y: 2,
		dist: function() {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		},
		toString: function() {
			return '(' + this.x + ', ' + this.y + ')';
		}	
	};

	it('point.x should be 5', function() {
		assert.equal(point.x, 5);
	});

	it('calling dist() should return the distance', function() {
		assert.equal(point.dist(), 5.385164807134504);
	});

	it('calling toString should return a string representation', function() {
		assert.equal(point.toString(), '(5, 2)');
	});
});

describe('Constructors', function() {
	// If you want to create many points you need a factory for objects.
	// In javascript these are called constructors

	describe('First try at a constructor function', function() {
		function Point(x, y) {
			this.x = x;
			this.y = y;
			this.dist = function() {
				return Math.sqrt((this.x * this.x) + (this.y * this.y));
			};
			this.toString = function() {
				return '(' + this.x + ', ' + this.y + ')';
			};
		}

		it('should create an instance of Point', function() {
			var p = new Point(5,2);
			assert.instanceOf(p, Point);
		});

		it('should be able to access properties like creating objects directly', function() {
			var p = new Point(5, 2);
			assert.equal(p.x, 5);
			assert.equal(p.toString(), '(5, 2)');
		});

		it('should be able to create multiple points without overwriting properties', function() {
			var p1 = new Point(5, 2);
			var p2 = new Point(6, 9);
			assert.equal(p1.x, 5);
			assert.equal(p2.x, 6);
		});
	});

	// Methods shouldn’t be in each instance, they should be shared between instances to save memory. 
	// You can use a prototype for that purpose.
	describe('Putting methods on the prototype', function() {
		function Point(x, y) {
			this.x = x;
			this.y = y;
		}
		Point.prototype.dist = function() {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		};
		Point.prototype.toString = function() {
			return '(' + this.x + ', ' + this.y + ')';
		};

		it('should create an instance of Point', function() {
			var p = new Point(5,2);
			assert.instanceOf(p, Point);
		});

		it('should be able to access properties like creating objects directly', function() {
			var p = new Point(5, 2);
			assert.equal(p.x, 5);
			assert.equal(p.toString(), '(5, 2)');
		});

		it('should be able to create multiple points without overwriting properties', function() {
			var p1 = new Point(5, 2);
			var p2 = new Point(6, 9);
			assert.equal(p1.x, 5);
			assert.equal(p2.x, 6);
		});		
	});
});