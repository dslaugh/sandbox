var expect = require('chai').expect;
var sinon = require('sinon');
var stubFn = require('../stub.js');
var ajax = require('../ajax.js');
var fakeXMLHttpRequest = require('../fake_xhr.js');

describe('TDD', function() {

	describe('Stubs and Mocs', function() {
		describe('Example of a stub', function() {

			var add = function(a, b) {
				return a + b;
			}

			var origAdd = add;


			add = function(a, b) {
				return 'this was called';
			}

			it('should show as being called', function() {
				expect(add(1,3)).to.equal('this was called');
			});


			it('should add two numbers again', function() {
				add = origAdd;
				expect(add(1,3)).to.equal(4);
			});


		});

		describe('stubFn', function() {
			it('stubFn should be a function', function() {
				expect(stubFn).to.be.a('function');
			});

			it('stubFn.called should be false if the function is not called', function() {
				var x = stubFn();
				expect(x.called).to.be.false;
			});

			it('stubFn.called should be true if the function is called', function() {
				var x = stubFn();
				x();
				expect(x.called).to.be.true;
			});
		});

		describe('ajax create test', function() {
			it('should return an XMLHttpRequest object', function() {
				var xhr = ajax.create();

				expect(xhr.readyState).to.be.a('number');
				expect(xhr.open).to.be.a('function');
				expect(xhr.send).to.be.a('function');
				expect(xhr.setRequestHeader).to.be.a('function');
			});
		});

		describe('Get request test', function() {
			beforeEach(function() {
				this.ajaxCreate = ajax.create;
				this.xhr = Object.create(fakeXMLHttpRequest);
				ajax.create = stubFn(this.xhr);
			});

			afterEach(function() {
				ajax.create = this.ajaxCreate;	
			});

			it('should define a get method', function() {
				expect(typeof ajax.get).to.equal('function');
			});

			it('should throw an error without a url', function() {
				expect(ajax.get).to.throw(TypeError);
			});

			it('should obtain an XMLHttpRequest object', function() {
				// var originalCreate = ajax.create;
				// ajax.create = function() {
				// 	ajax.create.called = true;
				// };
				ajax.get('/url');

				expect(ajax.create.called).to.be.true;

				// ajax.create = originalCreate;
			});

			it('should call open with method, url, and async flag', function() {
				// var openStub = stubFn();
				// ajax.create = stubFn({open: openStub});
				var url = '/url';
				ajax.get(url);

				expect(["GET", url, true]).to.eql(this.xhr.open.args);
			});	

			it('should add onreadystatechange handler', function() {
				ajax.get('/url');
				expect(this.xhr.onreadystatechange).to.be.a('function');
			});

			it('should call send', function() {
				ajax.get('/url');
				expect(this.xhr.send.called).to.be.true;
			});
		});

		describe('ReadyStateHandlerTest', function() {
			beforeEach(function() {
				this.ajaxCreate = ajax.create;
				this.xhr = Object.create(fakeXMLHttpRequest);
				ajax.create = stubFn(this.xhr);
			});

			afterEach(function() {
				ajax.create = this.ajaxCreate;	
			});

			it('should call success handler for status 200', function() {
				this.xhr.readyState = 4;
				this.xhr.status = 200;
				var success = stubFn();

				ajax.get('/url', {success: success});
				this.xhr.onreadystatechange();

				expect(success.called).to.be.true;
			});

			it('should not throw error without success handler', function() {
				this.xhr.readyState = 4;
				this.xhr.status = 200;

				ajax.get('/url');
				var result = function() {
					this.xhr.onreadystatechange();
				}.bind(this);
				expect(result).to.not.throw();
			});
		});
	});

	describe('Test Doubles', function() {
		describe('Dummy Object', function() {
			describe('Passing element.appendChild a stubFn() as a dummy object to get it to stop throwing an error', function() {
				var setView = function(element) {
					var childElement = {
						id: 1,
						name: 'dummy_child'
					};
					element.scrollTop = element.scrollHeight;
					element.appendChild(childElement);
				};

				it('should set the scrollTop property to the value of the scrollHeight property', function() {
					var elementWithDummyObject = {
						appendChild: stubFn(),
						scrollHeight: 1900
					};

					setView(elementWithDummyObject);

					var actual = elementWithDummyObject.scrollTop;
					expect(actual).to.equal(1900);
				});
			});
		});

		describe('Stubs', function() {
			describe('Stubbing to avoid inconvenient interfaces', function() {
				// Stubbing to avoid the DOM
				var setView = function(element) {
					var childElement = {
						id: 1,
						name: 'dummy_child'
					};
					element.scrollTop = element.scrollHeight;
					element.appendChild(childElement);
				};

				it('should scroll the element down', function() {
					var element = {
						appendChild: stubFn(),
						scrollHeight: 1900
					};

					setView(element);

					expect(element.scrollTop).to.equal(1900);
				});
			});

			describe('Stubbing to force certain code paths', function() {
				// Expecting success for local requests
				it('should call success handler for local requests', function() {
					var ajax = {
						isLocal: function() {return false;},
						xhr: {
							readyState: undefined,
							status: undefined,
							onreadystatechange: undefined
						},
						get: function(url, options) {
							this.xhr.onreadystatechange = function() {
								if (typeof options.success === 'function') {
									if (ajax.xhr.readyState === 4) {
										if (ajax.isLocal) {
											options.success();
										}
									}
								}
							};
						}
					};


					ajax.xhr.readyState = 4;
					ajax.xhr.status = 0;
					ajax.xhr.isLocal = stubFn(true);
					var success = stubFn();
					ajax.get('/url', {success: success});

					ajax.xhr.onreadystatechange();

					expect(success.called).to.be.true;
				});
			});
		});
	});

	describe('State Verification', function() {
		var setModel = function(model) {
			model.currentUser = 'test user';
		};

		describe('Inspecting the state of an object to verify test', function() {
			it('Should set model.currentUser', function() {
				var model = {};

				setModel(model);

				expect(model.currentUser).to.equal('test user');
			});
		});

		describe('Inspecting a functions behavior to verify test', function() {
			var model = {
				notify: stubFn()
			};
			var handleSubmit = function() {
				model.notify('message', {});
			};


			it('should publish a message', function() {
				handleSubmit();
				
				expect(model.notify.called).to.be.true;
				expect(model.notify.args[0]).to.equal('message');
				expect(model.notify.args[1]).to.be.an('object');
			});
		});
	});

	describe('Learning Sinon', function() {
		it('should exist', function() {
			expect(sinon).to.be.an('object');
			expect(sinon.stub).to.be.a('function');
		});

		it('should stub a function properly', function() {
			function test() {
				return 'hello world';
			};

			var origTest = test;

			test = sinon.stub();

			test();

			expect(test.called).to.be.true;
			test = origTest;
		});
	});

});