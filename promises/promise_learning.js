var promise = new Promise(function(resolve, reject) {
	resolve('hello');
});

promise.then(function(z) {
	console.log('one');
	return z;
})
.then(function(b) {
	console.log('two');
	throw new Error('dang it');
	return b+' world';
})
.then(function(c) {
	console.log('three');
	console.log('c', c);
})
.catch(function(a) {
	console.log('Error caught: ', a);
});
