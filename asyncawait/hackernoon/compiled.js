'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//https://hackernoon.com/javascript-es7-async-await-bible-tutorial-example-32294f6133ab#.iuv835qaw

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	var asyncSleep = function () {
		var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(para) {
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return sleep(para);

						case 2:
							return _context.abrupt('return', _context.sent);

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function asyncSleep(_x) {
			return _ref2.apply(this, arguments);
		};
	}();

	var sleep, result1, result, resulta, resultb, resultc, result4, i, j;
	return _regenerator2.default.wrap(function _callee2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					sleep = function sleep(para) {
						return new Promise(function (resolve, reject) {
							setTimeout(function () {
								resolve(para * para);
							}, 1000);
						});
					};

					_context2.next = 3;
					return sleep(2);

				case 3:
					result1 = _context2.sent;

					console.log('one', result1);

					_context2.next = 7;
					return asyncSleep(2);

				case 7:
					result = _context2.sent;

					console.log('two', result);

					asyncSleep(3).then(function (result) {
						console.log('three', result);
					});

					// Sequentially
					_context2.next = 12;
					return sleep(2);

				case 12:
					resulta = _context2.sent;
					_context2.next = 15;
					return sleep(resulta);

				case 15:
					resultb = _context2.sent;
					_context2.next = 18;
					return sleep(resultb);

				case 18:
					resultc = _context2.sent;

					console.log('result a', resulta);
					console.log('result b', resultb);
					console.log('result c', resultc);

					// Parallel
					_context2.next = 24;
					return Promise.all([sleep(1), sleep(2)]);

				case 24:
					result4 = _context2.sent;

					console.log('result4', result4);

					// Nested
					i = 0;

				case 27:
					if (!(i < 3)) {
						_context2.next = 45;
						break;
					}

					_context2.next = 30;
					return sleep(i);

				case 30:
					result = _context2.sent;
					j = 0;

				case 32:
					if (!(j < result)) {
						_context2.next = 42;
						break;
					}

					_context2.t0 = console;
					_context2.t1 = ' i:' + i + ', j:' + j + ': ';
					_context2.next = 37;
					return sleep(j);

				case 37:
					_context2.t2 = _context2.sent;

					_context2.t0.log.call(_context2.t0, _context2.t1, _context2.t2);

				case 39:
					j++;
					_context2.next = 32;
					break;

				case 42:
					i++;
					_context2.next = 27;
					break;

				case 45:
				case 'end':
					return _context2.stop();
			}
		}
	}, _callee2, this);
}))();
