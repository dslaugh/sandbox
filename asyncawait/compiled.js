'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// https://code.tutsplus.com/tutorials/a-primer-on-es7-async-functions--cms-22367

//function getValues() {
//	return Promise.resolve([1,2,3,4]);
//}

var getValues = function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						return _context.abrupt('return', [1, 2, 3, 4]);

					case 1:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function getValues() {
		return _ref.apply(this, arguments);
	};
}();

//function asyncOperation(value) {
//	return Promise.resolve(value + 1);
//}

var asyncOperation = function () {
	var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(value) {
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						return _context2.abrupt('return', value + 1);

					case 1:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function asyncOperation(_x) {
		return _ref2.apply(this, arguments);
	};
}();

var foo4 = function () {
	var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
		var message;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return promisingOperation();

					case 3:
						message = _context3.sent;

						console.log(message);
						_context3.next = 10;
						break;

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3['catch'](0);

						console.log('We failed:', _context3.t0);

					case 10:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this, [[0, 7]]);
	}));

	return function foo4() {
		return _ref3.apply(this, arguments);
	};
}();

var foo5 = function () {
	var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
		var values, newValues;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;
						_context6.next = 3;
						return getValues();

					case 3:
						values = _context6.sent;
						newValues = values.map(function () {
							var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(value) {
								var newValue;
								return _regenerator2.default.wrap(function _callee5$(_context5) {
									while (1) {
										switch (_context5.prev = _context5.next) {
											case 0:
												_context5.next = 2;
												return asyncOperation(value);

											case 2:
												newValue = _context5.sent;

												console.log('dos', newValue);
												return _context5.abrupt('return', newValue);

											case 5:
											case 'end':
												return _context5.stop();
										}
									}
								}, _callee5, this);
							}));

							return function (_x2) {
								return _ref6.apply(this, arguments);
							};
						}());
						return _context6.abrupt('return', Promise.all(newValues));

					case 8:
						_context6.prev = 8;
						_context6.t0 = _context6['catch'](0);

						console.log('We had an ', _context6.t0);

					case 11:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, this, [[0, 8]]);
	}));

	return function foo5() {
		return _ref5.apply(this, arguments);
	};
}();

var foo6 = function () {
	var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
		var values, newValues;
		return _regenerator2.default.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.prev = 0;
						_context7.next = 3;
						return getValues();

					case 3:
						values = _context7.sent;
						_context7.next = 6;
						return Promise.all(values.map(asyncOperation));

					case 6:
						newValues = _context7.sent;


						newValues.forEach(function (value) {
							console.log('tres', value);
						});

						return _context7.abrupt('return', newValues);

					case 11:
						_context7.prev = 11;
						_context7.t0 = _context7['catch'](0);

						console.log('We had an ', _context7.t0);

					case 14:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, this, [[0, 11]]);
	}));

	return function foo6() {
		return _ref7.apply(this, arguments);
	};
}();

var foo7 = function () {
	var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
		var values;
		return _regenerator2.default.wrap(function _callee9$(_context9) {
			while (1) {
				switch (_context9.prev = _context9.next) {
					case 0:
						_context9.prev = 0;
						_context9.next = 3;
						return getValues();

					case 3:
						values = _context9.sent;
						_context9.next = 6;
						return values.reduce(function () {
							var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(values, value) {
								return _regenerator2.default.wrap(function _callee8$(_context8) {
									while (1) {
										switch (_context8.prev = _context8.next) {
											case 0:
												_context8.next = 2;
												return values;

											case 2:
												values = _context8.sent;
												_context8.next = 5;
												return asyncOperation(value);

											case 5:
												value = _context8.sent;

												console.log('quatro', value);
												values.push(value);
												return _context8.abrupt('return', values);

											case 9:
											case 'end':
												return _context8.stop();
										}
									}
								}, _callee8, this);
							}));

							return function (_x3, _x4) {
								return _ref9.apply(this, arguments);
							};
						}(), []);

					case 6:
						return _context9.abrupt('return', _context9.sent);

					case 9:
						_context9.prev = 9;
						_context9.t0 = _context9['catch'](0);

						console.log('We had an ', _context9.t0);

					case 12:
					case 'end':
						return _context9.stop();
				}
			}
		}, _callee9, this, [[0, 9]]);
	}));

	return function foo7() {
		return _ref8.apply(this, arguments);
	};
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

getValues().then(function (values) {
	console.log(values);
});

function foo() {
	return getValues().then(function (values) {
		var operations = values.map(function (value) {
			return asyncOperation(value).then(function (newValue) {
				console.log(newValue);
				return newValue;
			});
		});

		return Promise.all(operations);
	}).catch(function (err) {
		console.log('We had an ', err);
	});
}

function foo2() {
	return getValues().then(function (values) {
		var operations = values.map(asyncOperation);

		return Promise.all(operations).then(function (newValues) {
			newValues.forEach(function (newValue) {
				console.log(newValue);
			});

			return newValues;
		});
	}).catch(function (err) {
		console.log('We had an ', err);
	});
}

function foo3() {
	var newValues = [];
	return getValues().then(function (values) {
		return values.reduce(function (previousOperation, value) {
			return previousOperation.then(function () {
				return asyncOperation(value);
			}).then(function (newValue) {
				console.log(newValue);
				newValues.push(newValue);
			});
		}, Promise.resolve()).then(function () {
			return newValues;
		});
	}).catch(function (err) {
		console.log('We had an ', err);
	});
}

foo();
foo2();
foo3();

function promisingOperation() {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (Math.round(Math.random())) {
				resolve('Success!');
			} else {
				reject('Failure!');
			}
		}, 1000);
	});
}

foo4();

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
	return _regenerator2.default.wrap(function _callee4$(_context4) {
		while (1) {
			switch (_context4.prev = _context4.next) {
				case 0:
					_context4.t0 = console;
					_context4.next = 3;
					return getValues();

				case 3:
					_context4.t1 = _context4.sent;

					_context4.t0.log.call(_context4.t0, _context4.t1);

				case 5:
				case 'end':
					return _context4.stop();
			}
		}
	}, _callee4, this);
}))();

foo5();

foo6();

foo7();
