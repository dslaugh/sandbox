var count = 1;
// The only way I could get this to work is to create the promise inside the root promise.
// If I created them outside the root, it just wouldn't work.

Promise.resolve()
.then(function() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			count = count + 1;
			resolve('p1 finished');
		}, 2000);
	});
	
})
.then(function() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			count = count * 2;
			resolve('p2 finished');
		}, 1000);
	});
})
.then(function() {
	console.log('count', count);
});


// NOT WORKING AS INTENDED
// var p1 = new Promise(function(resolve, reject) {
// 	setTimeout(function() {
// 		count = count + 1;
// 		resolve('p1 finished');
// 	}, 2000);
// });
// 
// var p2 = new Promise(function(resolve, reject) {
// 	setTimeout(function() {
// 		count = count * 2;
// 		resolve('p2 finished');
// 	}, 1000);
// });
// 
// Promise.resolve()
// .then(function() {
// 	console.log('hello 1', count);
// 	return p1.then(function(res) {
// 		console.log(res, count);
// 		return res;
// 	});
// })
// .then(function() {
// 	console.log('hello 2', count);
// 	return p2.then(function(res) {
// 		console.log(res, count);
// 		return res;
// 	});
// })
// .catch(function(err) {
// 	console.log('error', err);
// });


// ALSO NOT WORKING
// p1.then(function() {
// 	console.log('p1', count, text);
// 	p2.then(function() {
// 		console.log('p2', count, text);
// 	});
// });
