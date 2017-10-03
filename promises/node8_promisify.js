// https://hackernoon.com/node8s-util-promisify-is-so-freakin-awesome-1d90c184bf44
const util = require('util');

const wait = (delay, callback) => {
	const id = setInterval(() => {
		const rand = Math.random();

		if (rand > 0.95) {
			callback(null, 'Congratulations, you have finished waiting.');
			clearInterval(id);
		} else if (rand < 0.01) {
			callback('Could not wait any longer!', null);
			clearInterval(id);
		} else {
			console.log('Waiting...');
		}
	}, Number(delay));
}


/*
wait(1000, (err, data) => {
	if (err) throw new Error(err);

	console.log(data);
});
*/

const waitAsync = util.promisify(wait);

/*
waitAsync(1000)
	.then(data => console.log(data))
	.catch(err => console.error(`[Error]: ${err}`));
*/

(async () => {
	let result;
	try {
		result = await waitAsync(1000);
	} catch (err) {
		return console.error(err);
	}

	return console.log(result);
})();
