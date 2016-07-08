var promise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		reject('rejected');
	}, 1000);
	resolve('resolved');
});

promise.then(function(z) {
	console.log('resolved', z);
}).catch(function(a) {
	console.log('rejected', a);
});
