function stubFn(returnValue) {
	var fn = function() {
		fn.called = true;
		fn.args = Array.prototype.slice.call(arguments);
		return returnValue;
	};

	fn.called = false;

	return fn;
}
if (module && module.exports) {
	module.exports = stubFn;
}