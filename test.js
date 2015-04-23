var x = (function() {
	return {
		test1: function() {return 'test1';},
		test2: function() {return 'test2';}
	};
})();

if (typeof exports !== 'undefined') {
	exports.x = x;
}