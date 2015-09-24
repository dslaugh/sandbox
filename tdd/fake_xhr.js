var stubFn = require('./stub.js');
var fakeXMLHttpRequest = {
	open: stubFn(),
	send: stubFn()
};
module.exports = fakeXMLHttpRequest;