//https://hackernoon.com/javascript-es7-async-await-bible-tutorial-example-32294f6133ab#.iuv835qaw

(async function() {
	var sleep = function(para) {
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve(para * para);
			}, 1000);
		});
	}

	async function asyncSleep(para) {
		return await sleep(para);
	}

	var result1 = await sleep(2);
	console.log('one', result1);

	var result = await asyncSleep(2);
	console.log('two', result);

	asyncSleep(3).then(function(result) {
		console.log('three', result);
	});

	// Sequentially
	var resulta = await sleep(2);
	var resultb = await sleep(resulta);
	var resultc = await sleep(resultb);
	console.log('result a', resulta);
	console.log('result b', resultb);
	console.log('result c', resultc);

	// Parallel
	var result4 = await Promise.all([sleep(1), sleep(2)]);
	console.log('result4', result4);
	
	// Nested
	for (var i=0; i<3; i++) {
		var result = await sleep(i);
		for (var j=0; j<result; j++) {
			console.log(' i:'+i+', j:'+j+': ', await sleep(j));
		}
	}
})();

