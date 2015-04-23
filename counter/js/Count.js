var Count = function() {
	var counts = [];
	var events = CustomEvents();

	function zeroPad(num) {
		return num < 10 ? '0' + num : num;
	}

	function dateFormat(date) {
		var dateParts = [
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds()
		];
		var padded = dateParts.map(zeroPad);
		return padded[0] + '-' + padded[1] + '-' + padded[2] + ' ' + padded[3] + ':' + padded[4] + ':' + padded[5];
	}
	
	return {
		set: function(countsArray) {
			counts = countsArray;
			events.emit('countsSet', counts);
		},
		get: function() {
			return counts;
		},
		add: function() {
			var count = dateFormat(new Date());
			counts.push(count);
			events.emit('countAdded', count);
		},
		on: function(topic, fn) {
			events.on(topic, fn);
		}
	};
};

if (typeof exports !== 'undefined') {
	exports = Count;
}