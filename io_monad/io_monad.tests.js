// https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch8.html#old-mcdonald-had-effects
// https://glebbahmutov.com/blog/di-vs-io-monad-example/
const expect = require('chai').expect;

const compose = (f, g) => {
	return function(x) {
		return f(g(x));
	}
}

function IO(fn) {
	this.unsafePerformIO = fn;
}

IO.prototype.map = function(fn) {
	return new IO(compose(fn, this.unsafePerformIO));
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
