var PubSub = function() {
	var subscribers = [];

	return {
		subscribe: function(fn) {
			subscribers.push(fn);
		},
		unsubscribe: function(fn) {
			subscribers.splice(subscribers.indexOf(fn), 1);
		},
		publish: function(data) {
			subscribers.forEach(function(fn) {
				fn(data);
			});
		}
	}
};

if (typeof exports !== 'undefined') {
	module.exports = PubSub;
}