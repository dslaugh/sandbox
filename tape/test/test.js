var test = require('tape');

test('Seeing if this thing works', function(t) {
	t.plan(1);
	t.deepEqual([1,2], [1,2], 'It works');
});

test('Pythagorean Theorum', function(t) {
	t.plan(2);
	function p(a, b) {
		var a2 = Math.pow(a, 2);
		var b2 = Math.pow(b, 2);
		var c2 = a2 + b2;
		return Math.sqrt(c2);
	}

	var x = p(3,4);
	t.equal(x, 5);

	var y = p(5,12);
	t.equal(y, 13);
});

test('Stuff', function(t) {
	var octave = interval(2, 1);
	var fourth = interval(3, 2);
	var fifth = interval(4, 3);
	var majorThird = interval(5, 4);


	t.equal(octave(100), 200);
	t.equal(fourth(100), 150);
	t.equal(fifth(100), 133);
	t.equal(majorThird(100), 125);


	t.end();

	function interval(a, b) {
		return function(num) {
			return Math.floor(num * (a / b));
		};
	}


});