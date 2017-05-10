const expect = require('chai').expect;

function IO(f) {
	this.unsafePerformIO = f;
}

const compose = (f, g) => {
	return function(x) {
		return f(g(x));
	}
}

IO.prototype.map = function(f) {
	const x = this.unsafePerformIO();
	return new IO(compose(f, this.unsafePerformIO));
}

describe('IO Monad', function() {
	it('should work', function() {
		const windowIO = new IO(() => {
			return window;
		});

		window = { id: 1, location: 'here' };

		const getLocation = windowIO.map((win) => {
			return win.location;
		});

		expect(getLocation.unsafePerformIO()).to.equal('here');
	});
});
