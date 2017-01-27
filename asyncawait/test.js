'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var yourMom = function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
		var x;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return getMoviesAsync();

					case 2:
						x = _context.sent;

						console.log('x', x);

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function yourMom() {
		return _ref.apply(this, arguments);
	};
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMovieAsync() {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			return 'hey';
		}, 1000);
	});
}

yourMom();
